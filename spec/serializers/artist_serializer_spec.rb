require 'rails_helper'

RSpec.describe ArtistSerializer do
  subject { described_class.new(record).as_json }
  let(:record) { create(:artist) }
  let(:reference) do
    {
      id:       record.id,
      name:     record.name,
      slug:     nil,
      verified: false,
    }
  end

  it { is_expected.to be_eql(reference) }
end
