require 'rails_helper'

RSpec.describe HasSlug do
  let!(:model) do
    MockArtist ||= Class.new(ApplicationRecord) do
      include HasSlug
      self.table_name = 'artists'
    end
  end

  let!(:record) { model.create(name: 'Sample', slug: 'sample') }

  describe '#find_by_slug' do
    it 'can find by id as number' do
      expect(model.find_by_slug(record.id)).to be_eql(record)
    end

    it 'can find by id as string' do
      expect(model.find_by_slug(record.id.to_s)).to be_eql(record)
    end

    it 'can find by slug value' do
      expect(model.find_by_slug(record.slug)).to be_eql(record)
    end
  end

  context 'validation' do
    it 'cannot have less than 3 characters' do
      record = model.new(slug: ('a' * 2))
      expect(record).not_to be_valid
      expect(record.errors.details).to have_key(:slug)
    end

    it 'cannot have more than 32 characters' do
      record = model.new(slug: ('a' * 33))
      expect(record).not_to be_valid
      expect(record.errors.details).to have_key(:slug)
    end

    it 'cannot have special characters' do
      record = model.new(slug: 'a a')
      expect(record).not_to be_valid
      expect(record.errors.details).to have_key(:slug)
    end
  end
end
