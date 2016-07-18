class DesignerController < ApplicationController

  def index
    @cookbooks = Cookbook.newest_first
  end

  def edit

    @cookbook = Cookbook.find(params[:cookbook_id]) if params[:cookbook_id]
    @recipe = Recipe.find(params[:recipe_id]) if params[:recipe_id]
    @resource = Resource.find(params[:resource_id]) if params[:resource_id]

    if @resource
      @resource_count = Resource.count
      @form = "resources"
    elsif @recipe
      @form = "recipes"
    elsif @cookbook
      @form = "cookbooks"
    end

    respond_to do |format|
      format.js
      format.html
    end
  end

  def create
    @cookbook = Cookbook.find(params[:cookbook_id]) if params[:cookbook_id]
    @recipe = Recipe.find(params[:recipe_id]) if params[:recipe_id]
    if @recipe
      @form = "resources"
      @resource = Resource.new({recipe_id: @recipe.id})
      @resource_count = Resource.count + 1
    elsif @cookbook
      @form = "recipes"
      @recipe = Recipe.new({cookbook_id: @cookbook.id})
    else
      @form = "cookbooks"
      @cookbook = Cookbook.new
    end
    respond_to do |format|
      format.js
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
