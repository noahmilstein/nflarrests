class Crime < ActiveRecord::Base
  validates :name, presence: true
  validates :position, presence: true
  validates :encounter, presence: true
  validates :description, presence: true
  validates :outcome, presence: true
  validates :date, presence: true

  belongs_to :team
  has_many :crime_categories
  has_many :categories, through: :crime_categories
end
