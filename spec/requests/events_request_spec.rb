require 'rails_helper'

RSpec.describe 'Events', type: :request do
  let(:json) { JSON.parse(response.body) }

  describe '#index' do
    before { create(:event_concert) }

    it 'returns the existing record' do
      get('/api/events')

      expect(response).to be_ok
      expect(json).to be_an(Array)
      expect(json.size).to be_eql(1)
    end
  end

  describe '#create' do
    let(:artist) { create(:artist, :verified) }
    let(:music_genre) { create(:music_genre, :verified) }
    let(:params) do
      {
        title:        'Sample Test',
        kind:         'EventFestival',
        date:         5.days.from_now.strftime('%Y-%m-%d'),
        location:     'A new location',
        artists:      [artist.id, 'A new artist'],
        music_genres: [music_genre.id, 'A new music genre'],
      }
    end

    it 'creates a event correctly' do
      post('/api/events', params: { event: params }.to_json, headers: SEND_JSON_HEADERS)

      expect(response).to be_created
      expect(json).to include(
        'title' => 'Sample Test',
        'location' => { 'name' => 'A new location' },
        'artists' => [artist.name, 'A new artist'],
        'music_genres' => [
          { 'name' => music_genre.name, 'slug' => music_genre.slug },
          { 'name' => 'A new music genre', 'slug' => nil },
        ]
      )
    end
  end
end
