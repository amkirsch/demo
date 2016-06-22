class Resource < ActiveRecord::Base
  serialize :properties, Hash
  belongs_to :recipe
end
