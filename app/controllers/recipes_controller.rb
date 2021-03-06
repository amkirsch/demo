class RecipesController < ApplicationController
  before_action :set_recipe, only: [:show, :edit, :update, :destroy]
  before_action :set_cookbook

  layout "admin"
  # GET /recipes
  # GET /recipes.json
  def index
    @recipes = @cookbook.recipes
  end

  # GET /recipes/1
  # GET /recipes/1.json
  def show
    #@recipe = Recipe.find(params[:recipe_id])
  end

  # GET /recipes/new
  def new
    @recipe = Recipe.new({cookbook_id: @cookbook.id})
  end

  # GET /recipes/1/edit
  def edit
  end

  # POST /recipes
  # POST /recipes.json
  def create
    @recipe = Recipe.new(recipe_params)

    respond_to do |format|
      if @recipe.save
        format.html { redirect_to [@cookbook, @recipe], notice: 'Recipe was successfully created.' }
        format.js { render inline: "location.reload();" }
        format.json { render :show, status: :created, location: [@cookbook, @recipe] }
      else
        format.html { render :new }
        format.js {render 'designer/edit'}
        format.json { render json: @recipe.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /recipes/1
  # PATCH/PUT /recipes/1.json
  def update
    respond_to do |format|
      if @recipe.update(recipe_params)
        format.html { redirect_to [@cookbook, @recipe], notice: 'Recipe was successfully updated.' }
        format.js { render inline: "location.reload();" }
        format.json { render :show, status: :ok, location: [@cookbook, @recipe] }
      else
        format.html { render :edit }
        format.js {render 'designer/edit'}
        format.json { render json: @recipe.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /recipes/1
  # DELETE /recipes/1.json
  def destroy
    if @recipe.resources
      @recipe.resources.each { |r| r.destroy }
    end
    @recipe.destroy
    respond_to do |format|
      format.html { redirect_to cookbook_recipes_url, notice: 'Recipe was successfully destroyed.' }
      format.js { render inline: "location.reload();" }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_recipe
      @recipe = Recipe.find(params[:id])
    end

    def set_cookbook
      @cookbook = Cookbook.find(params[:cookbook_id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def recipe_params
      params.require(:recipe).permit(:cookbook_id, :name)
    end
end
