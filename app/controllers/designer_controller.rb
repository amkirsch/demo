class DesignerController < ApplicationController
  def index
    @cookbooks = Cookbook.all
  end

  def resources
    @recipe = Recipe.find(params[:recipe_id])
    respond_to do |format|
      format.js
      format.html
    end
  end
end
