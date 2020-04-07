# == Schema Information
#
# Table name: artists
#
#  id          :bigint           not null, primary key
#  name        :string           not null
#  slug        :string
#  verified_at :datetime
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_artists_on_name         (name)
#  index_artists_on_slug         (slug) UNIQUE WHERE (slug IS NOT NULL)
#  unique_verified_artists_name  (name) UNIQUE WHERE (verified_at IS NOT NULL)
#
class Artist < ApplicationRecord
  include HasSlug
  include HasVerification

  ## Associations
  has_many :events, array: true

  ## Validations
  validates :name, presence: true
  validates_uniqueness_of :name, if: :verified?
end
