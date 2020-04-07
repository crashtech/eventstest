class CreateArtists < ActiveRecord::Migration[5.2]
  def change
    create_table :artists do |t|
      t.string :name, null: false
      t.string :slug
      t.datetime :verified_at
      t.timestamps

      t.index :name
      t.index :name, name: 'unique_verified_artists_name', unique: true, where: 'verified_at IS NOT NULL'
      t.index :slug, unique: true, where: 'slug IS NOT NULL'
    end
  end
end
