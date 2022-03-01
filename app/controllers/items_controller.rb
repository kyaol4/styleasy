class ItemsController < ApplicationController
  def show
    @item = Item.find(params[:id])
    authorize @item
  end

  def create
    @item = Item.new(item_params)
    authorize @item
    if @item.save
      redirect_to root_path, notice: 'Item was successfully created.'
    else
      render root_path
    end
  end

  private

  def item_params
    params.require(:item).permit(:size, :price, :brand, :photos)
  end
end
