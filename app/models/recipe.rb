class Recipe < ActiveRecord::Base
  has_many :resources

  belongs_to :cookbook
end
