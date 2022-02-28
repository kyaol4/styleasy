class CreateShops < ActiveRecord::Migration[6.1]
  def change
    create_table :shops do |t|
      t.string :shopify_domain
      t.string :shopify_token

      t.timestamps
    end
  end
end
