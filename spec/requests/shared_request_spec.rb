require 'rails_helper'

RSpec.describe 'Shareds', type: :request do
  let(:json) { JSON.parse(response.body) }

  describe '#music_genres' do
    before { create(:music_genre, :verified) }

    it 'returns the full list of music genres' do
      get('/api/shared/music_genres')

      expect(response).to be_ok
      expect(json).to be_an(Array)
      expect(json.size).to be_eql(1)
    end
  end
end
