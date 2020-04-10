require 'rails_helper'

RSpec.describe EventConcertSerializer do
  subject { described_class.new(record).as_json }
  let(:record) { create(:event_concert) }
  let(:reference) do
    {
      id:           record.id,
      title:        record.title,
      date:         record.date,
      kind:         record.kind,
      artist:       record.artists.first.name,
      location:     { name: record.location.name },
      music_genres: record.music_genres.map { |g| { name: g.name, slug: g.slug } }
    }
  end

  it { is_expected.to be_eql(reference) }
end
