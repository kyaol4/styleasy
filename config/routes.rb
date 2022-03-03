Rails.application.routes.draw do
  # root :to => 'home#index'  #<<< SHOPIFY
  # get '/products', :to => 'products#index'  #<<<<  SHOPIFY
  # mount ShopifyApp::Engine, at: '/'  #<<<<< SHOPIFY
  devise_for :users
  root to: 'pages#home' #<<<< LOCAL
  resources :items, only: [:show, :create]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
