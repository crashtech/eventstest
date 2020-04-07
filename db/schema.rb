# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_04_07_193912) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "fuzzystrmatch"
  enable_extension "plpgsql"

  # These are the common tables managed
  create_table "artists", force: :cascade do |t|
    t.string "name", null: false
    t.string "slug"
    t.datetime "verified_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_artists_on_name"
    t.index ["name"], name: "unique_verified_artists_name", unique: true, where: "(verified_at IS NOT NULL)"
    t.index ["slug"], name: "index_artists_on_slug", unique: true, where: "(slug IS NOT NULL)"
  end

  create_table "events", force: :cascade do |t|
    t.string "title", null: false
    t.string "kind", null: false
    t.date "date", null: false
    t.bigint "location_id", null: false
    t.bigint "artist_ids", null: false, array: true
    t.bigint "music_genre_ids", null: false, array: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["artist_ids"], name: "index_events_on_artist_ids", using: :gin
    t.index ["date"], name: "index_events_on_date"
    t.index ["location_id"], name: "index_events_on_location_id"
    t.index ["music_genre_ids"], name: "index_events_on_music_genre_ids", using: :gin
  end

  create_table "locations", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "verified_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_locations_on_name"
    t.index ["name"], name: "unique_verified_locations_name", unique: true, where: "(verified_at IS NOT NULL)"
  end

  create_table "music_genres", force: :cascade do |t|
    t.string "name", null: false
    t.string "slug"
    t.datetime "verified_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_music_genres_on_name"
    t.index ["name"], name: "unique_verified_music_genres_name", unique: true, where: "(verified_at IS NOT NULL)"
    t.index ["slug"], name: "index_music_genres_on_slug", unique: true, where: "(slug IS NOT NULL)"
  end

end
