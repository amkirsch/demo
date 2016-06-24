class DesignerController < ApplicationController
  def index
    @cookbook = Cookbook.find_by name: 'test'
  end

  def resources
    @assets = 'resources'
  end
end
