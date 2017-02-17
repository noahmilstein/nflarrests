class Category < ActiveRecord::Base
  validates :name, presence: true
  has_many :crimes_categories
  has_many :crimes, through: :crime_categories
end
