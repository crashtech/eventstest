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
class EventFestival < Event
end
