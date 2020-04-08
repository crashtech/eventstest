# == Schema Information
#
# Table name: events
#
#  id              :bigint           not null, primary key
#  artist_ids      :bigint           not null, is an Array
#  date            :date             not null
#  kind            :string           not null
#  music_genre_ids :bigint           not null, is an Array
#  title           :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  location_id     :bigint           not null
#
# Indexes
#
#  index_events_on_artist_ids       (artist_ids) USING gin
#  index_events_on_date             (date)
#  index_events_on_location_id      (location_id)
#  index_events_on_music_genre_ids  (music_genre_ids) USING gin
#
class Event < ApplicationRecord
  ## Config
  easy_association_assign :location, :artists, :music_genres

  ## Associations
  belongs_to :location
  belongs_to_many :artists
  belongs_to_many :music_genres

  ## Scopes
  scope :default_sortted, -> { order(:date) }
  scope :future, -> { where(arel_attribute(:date).gteq(Date.current)) }

  scope :without_genres, ->(*values) do
    values = Arel.array(values, cast: :bigint)
    condition = arel_attribute(:music_genre_ids).overlaps(values)
    where(Arel::Nodes::Not.new(condition))
  end

  ## Validations
  validates :date, presence: true
  validates :kind, presence: true
  validates :title, presence: true
  validate :check_future_date

  private

    def check_future_date
      errors.add(:date, :invalid) unless date_changed? && date.present? && date.future?
    end
end
