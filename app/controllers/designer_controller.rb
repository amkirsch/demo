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
end
