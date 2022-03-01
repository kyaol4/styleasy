class ItemsController < ApplicationController
  def show
  end

  def create
    authorize @restaurant
  end
end
