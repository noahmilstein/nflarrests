class Team < ActiveRecord::Base
  validates :code, presence: true, length: { minimum: 2, maximum: 4 }
  validates :name, presence: true
  validates :city, presence: true

  has_many :crimes
end
