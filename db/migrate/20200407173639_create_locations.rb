class CreateLocations < ActiveRecord::Migration[5.2]
  def change
    create_table :locations do |t|
      t.string :name, null: false
      t.datetime :verified_at
      t.timestamps

      t.index :name
      t.index :name, name: 'unique_verified_locations_name', unique: true, where: 'verified_at IS NOT NULL'
    end
  end
end
