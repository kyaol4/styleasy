class Item < ApplicationRecord
  belongs_to :shop

  has_one_attached :photo

  validates :size, presence: true
  validates :price, presence: true
  validates :brand, presence: true
end
