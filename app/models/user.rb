class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :gender, presence: true
  validates :top_size, presence: true
  validates :bottom_size, presence: true
  validates :name, presence: true
end
