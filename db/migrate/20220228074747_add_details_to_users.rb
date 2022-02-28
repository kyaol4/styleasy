class AddDetailsToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :name, :string
    add_column :users, :gender, :string
    add_column :users, :top_size, :string
    add_column :users, :bottom_size, :string
  end
end
