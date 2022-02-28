class Item < ApplicationRecord
  belongs_to :shop

  validates :size, presence: true
  validates :price, presence: true
  validates :brand, presence: true
end
