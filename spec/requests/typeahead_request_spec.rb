require 'rails_helper'

RSpec.describe 'Typeaheads', type: :request do
  let(:json) { JSON.parse(response.body) }

  describe '#artists' do
    before { create(:artist, :verified, name: 'Sample') }

    it 'returns the existing record when matching' do
      get('/api/typeahead/artists', params: { value: 'ampl' })

      expect(response).to be_ok
      expect(json).to be_an(Array)
      expect(json.size).to be_eql(1)
    end

    it 'returns empty when no matching records' do
      get('/api/typeahead/artists', params: { value: 'test' })

      expect(response).to be_ok
      expect(json).to be_an(Array)
      expect(json.size).to be_eql(0)
    end
  end

  describe '#locations' do
    before { create(:location, :verified, name: 'Sample') }

    it 'returns the existing record when matching' do
      get('/api/typeahead/locations', params: { value: 'ampl' })

      expect(response).to be_ok
      expect(json).to be_an(Array)
      expect(json.size).to be_eql(1)
    end

    it 'returns empty when no matching records' do
      get('/api/typeahead/locations', params: { value: 'test' })

      expect(response).to be_ok
      expect(json).to be_an(Array)
      expect(json.size).to be_eql(0)
    end
  end
end
