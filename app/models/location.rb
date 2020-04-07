# == Schema Information
#
# Table name: locations
#
#  id          :bigint           not null, primary key
#  name        :string           not null
#  verified_at :datetime
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_locations_on_name         (name)
#  unique_verified_locations_name  (name) UNIQUE WHERE (verified_at IS NOT NULL)
#
class Location < ApplicationRecord
  include HasVerification

  ## Associations
  has_many :events

  ## Validations
  validates :name, presence: true
  validates_uniqueness_of :name, if: :verified?
end
