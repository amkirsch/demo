class Recipe < ActiveRecord::Base
  has_many :resources

  validates_presence_of :name

  belongs_to :cookbook
end
