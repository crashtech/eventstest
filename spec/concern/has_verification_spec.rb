require 'rails_helper'

RSpec.describe HasVerification do
  let!(:model) do
    Class.new(ApplicationRecord) do
      self.table_name = 'artists'
      include HasVerification
    end
  end

  let!(:record) { model.create(name: 'Sample', verified_at: Time.current) }

  describe '.verified' do
    it 'search for verified records' do
      expect(model.verified.to_sql).to include('"artists"."verified_at" IS NOT NULL')
    end
  end

  describe '#verified?' do
    it 'returns true for filled value' do
      expect(record).to be_verified
    end

    it 'returns false for blank value' do
      expect(model.new).not_to be_verified
    end
  end

  describe '#verify!' do
    it 'changes only the verified_at value' do
      reference = record.verified_at
      record.verify!
      expect(record.verified_at).to be > reference
    end
  end
end
