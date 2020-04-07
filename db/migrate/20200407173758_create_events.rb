class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.string     :title,           null: false
      t.string     :kind,            null: false
      t.date       :date,            null: false
      t.references :location,        null: false
      t.bigint     :artist_ids,      null: false, array: true
      t.bigint     :music_genre_ids, null: false, array: true
      t.timestamps

      t.index :date
      t.index :artist_ids, using: :gin
      t.index :music_genre_ids, using: :gin
    end
  end
end
