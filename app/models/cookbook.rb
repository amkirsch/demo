class Cookbook < ActiveRecord::Base
  has_many :recipes

  validates_presence_of :name
  validates_uniqueness_of :name
  
  scope :oldest_first, lambda { order("cookbooks.created_at ASC") }
  scope :search, lambda { |query| where(["name LIKE ?", "%#{query}%"]) }
end
