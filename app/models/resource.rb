class Resource < ActiveRecord::Base
  serialize :properties, Hash

  validates_presence_of :name
  validates_presence_of :resource_type

  belongs_to :recipe
end
