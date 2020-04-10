require 'rails_helper'

RSpec.describe Event, type: :model do
  describe '.with_genre_slug' do
    let(:music_genre) { create(:music_genre, :verified) }
    let!(:record) { create(:event_concert, music_genres: [music_genre]) }
    let!(:another_record) { create(:event_concert) }

    it 'returns matching records' do
      records = described_class.with_genre_slug(music_genre.slug)
      expect(records).not_to include(another_record)
      expect(records).to include(record)
    end
  end

  describe '.without_genres' do
    let(:music_genre) { create(:music_genre, :verified) }
    let!(:record) { create(:event_concert, music_genres: [music_genre]) }
    let!(:another_record) { create(:event_concert) }

    it 'returns matching records' do
      records = described_class.without_genres(music_genre.id)
      expect(records).to include(another_record)
      expect(records).not_to include(record)
    end
  end

  describe '#check_future_date' do
    let(:record) { create(:event_concert) }

    it 'is true for persisted records' do
      record.date = 5.days.ago
      record.save(validate: false)
      expect(record.reload).to be_valid
    end

    it 'is true when date has not changed' do
      record.title = 'New Title'
      expect(record).to be_valid
    end

    it 'is true if the date becomes blank' do
      record.date = nil
      expect(record).not_to be_valid
      expect(record.errors.details[:date]).not_to include({ error: :invalid })
    end

    it 'is false if the new date is in the past' do
      record.date = 5.days.ago.to_date
      expect(record).not_to be_valid
      expect(record.errors.details[:date]).to include({ error: :invalid })
    end
  end
end
