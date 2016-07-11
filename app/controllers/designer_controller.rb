class DesignerController < ApplicationController

  def index
    @cookbooks = Cookbook.newest_first
  end

  def edit
    @cookbook = Cookbook.find(params[:cookbook_id])
    @recipe = Recipe.find(params[:recipe_id])
    @resource = Resource.find(params[:resource_id])
    @resource_count = Resource.count
    respond_to do |format|
      format.js #{ render 'index'}
      format.html
    end
  end

  def resources
    @recipe = Recipe.find(params[:recipe_id])
    respond_to do |format|
      format.js
      format.html
    end
  end

  def sort
    params = sort_params
    recipe = Recipe.find(params[:recipe_id])
    resource = Resource.find(params[:resource_id])
    resource.position = params[:resource_position]
    resource.recipe_id = recipe.id
    resource.save
    respond_to do |format|
      format.js
    end
  end

  private

  def sort_params
    params.require(:sort).permit(:cookbook_id, :recipe_id, :resource_id, :resource_position)
  end
end
