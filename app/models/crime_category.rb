class CrimeCategory < ActiveRecord::Base
  belongs_to :category
  belongs_to :crime
end
