# == Schema Information
#
# Table name: music_genres
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
#  index_music_genres_on_name         (name)
#  index_music_genres_on_slug         (slug) UNIQUE WHERE (slug IS NOT NULL)
#  unique_verified_music_genres_name  (name) UNIQUE WHERE (verified_at IS NOT NULL)
#
class MusicGenreSerializer < ApplicationSerializer
  attributes :id, :name, :slug
  attribute :verified?, key: :verified
end
