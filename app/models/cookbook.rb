class Cookbook < ActiveRecord::Base
  has_many :recipes

  scope :oldest_first, lambda { order("cookbooks.created_at ASC") }
  scope :search, lambda { |query| where(["name LIKE ?", "%#{query}%"]) }
end
