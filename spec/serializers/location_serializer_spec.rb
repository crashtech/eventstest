require 'rails_helper'

RSpec.describe LocationSerializer do
  subject { described_class.new(record).as_json }
  let(:record) { create(:location) }
  let(:reference) do
    {
      id:       record.id,
      name:     record.name,
      verified: false,
    }
  end

  it { is_expected.to be_eql(reference) }
end
