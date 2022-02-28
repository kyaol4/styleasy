class Shop < ApplicationRecord
  has_many :items, dependent: :destroy
  validates :shopify_domain, presence: true
  validates :shopify_token, presence: true
end
