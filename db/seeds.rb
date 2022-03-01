# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Users
User.destroy_all
puts "Creating all the users......"
User.create!(
  email: "tobymanley1990@gmail.com",
  password: "password",
  name: "Toby",
  gender: "Male",
  top_size: "M",
  bottom_size: "M"
)
User.create!(
  email: "saorimita4@gmail.com",
  password: "password",
  name: "Saori",
  gender: "Female",
  top_size: "M",
  bottom_size: "M"
)
User.create!(
  email: "r.winstonc@gmail.com",
  password: "password",
  name: "Winston",
  gender: "Male",
  top_size: "M",
  bottom_size: "M"
)
User.create!(
  email: "kyaol4@gmail.com",
  password: "password",
  name: "Dongwook",
  gender: "Male",
  top_size: "M",
  bottom_size: "M"
)

puts "destroying shops"
Shop.destroy_all
puts "creating shops"

Shop.create!(
  shopify_domain: "bbb",
  shopify_token: "ccc"
)

puts "destroying items"
Item.destroy_all
puts "creating items"

item = Item.create!(
  size: ["S", "M", "L"].sample,
  price: rand(1000..10_000),
  brand: "aa",
  shop_id: Shop.first.id
)

item.photos.attach(io: File.open(Rails.root.join('app/assets/images/dress1.png')), filename: 'dress1.png')
puts 'loading photo'
