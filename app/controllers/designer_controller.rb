class DesignerController < ApplicationController
  def index
    @resources = Resource.all
  end
end
