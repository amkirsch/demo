class DesignerController < ApplicationController
  def index
    @cookbooks = Cookbook.newest_first
  end

  def resources
    @recipe = Recipe.find(params[:recipe_id])
    respond_to do |format|
      format.js
      format.html
    end
  end

  def sort
    respond_to do |format|
      format.js
    end
    params = sort_params
    recipe = Recipe.find(params[:recipe_id])
    resource = Resource.find(params[:resource_id])
    puts resource.recipe_id
    resource.recipe_id = recipe.id
    puts resource.recipe_id
    puts "Here is our recipe: #{recipe.name} for resource: #{resource.name}"
    resource.save

  end

  private

  def sort_params
    params.require(:sort).permit(:recipe_id, :resource_id, :resource_position)
  end
end
