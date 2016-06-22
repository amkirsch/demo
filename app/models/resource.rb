class Resource < ActiveRecord::Base
  serialize :properties, Hash
end
