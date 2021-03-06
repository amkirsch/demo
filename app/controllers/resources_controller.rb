class ResourcesController < ApplicationController
  before_action :set_resource, only: [:show, :edit, :update, :destroy]
  before_action :set_recipe, :set_cookbook

  layout "admin"
  # GET /resources
  # GET /resources.json
  def index
    @resources = @recipe.resources.sorted
  end

  # GET /resources/1
  # GET /resources/1.json
  def show
  end

  # GET /resources/new
  def new
    @resource = Resource.new({recipe_id: @recipe.id})
    @resource_count = Resource.count + 1
  end

  # GET /resources/1/edit
  def edit
    @resource_count = Resource.count
  end

  # POST /resources
  # POST /resources.json
  def create
    @resource = Resource.new(resource_params)

    respond_to do |format|
      if @resource.save
        format.html { redirect_to [@cookbook, @recipe, @resource], notice: 'Resource was successfully created.' }
        format.js { render inline: "location.reload();" }
        format.json { render :show, status: :created, location: [@cookbook, @recipe, @resource] }
      else
        @resource_count = Resource.count + 1
        @form = 'resources' # used to pass back the proper form for js callback
        format.html { render :new }
        format.js {render 'designer/create'}
        format.json { render json: @resource.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /resources/1
  # PATCH/PUT /resources/1.json
  def update
    respond_to do |format|
      if @resource.update(resource_params)
        format.html { redirect_to [@cookbook, @recipe, @resource], notice: 'Resource was successfully updated.' }
        format.js { render inline: "location.reload();" }
        format.json { render :show, status: :ok, location: [@cookbook, @recipe, @resource] }
      else
        @resource_count = Resource.count
        @form = 'resources' # used to pass back the proper form for js callback
        format.html { render :edit }
        format.js {render 'designer/edit'}
        format.json { render json: @resource.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /resources/1
  # DELETE /resources/1.json
  def destroy
    @resource.destroy
    respond_to do |format|
      format.html { redirect_to cookbook_recipe_resources_url, notice: 'Resource was successfully destroyed.' }
      format.js { render inline: "location.reload();" }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_resource
      @resource = Resource.find(params[:id])
    end

    def set_recipe
      @recipe = Recipe.find(params[:recipe_id])
    end

    def set_cookbook
      @cookbook = Cookbook.find(params[:cookbook_id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def resource_params
      all_properties = params.require(:resource).fetch(:properties, nil).try(:permit!)
      params.require(:resource).permit(:recipe_id,:name, :resource_type, :position, :actions).merge(:properties => all_properties)
    end

end
