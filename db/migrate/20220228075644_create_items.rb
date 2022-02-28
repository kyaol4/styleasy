class CreateItems < ActiveRecord::Migration[6.1]
  def change
    create_table :items do |t|
      t.string :size
      t.integer :price
      t.string :brand
      t.references :shop, null: false, foreign_key: true

      t.timestamps
    end
  end
end
