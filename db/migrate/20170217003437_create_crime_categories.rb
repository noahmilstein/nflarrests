class CreateCrimeCategories < ActiveRecord::Migration[5.0]
  def change
    create_table :crime_categories do |t|
      t.belongs_to :category
      t.belongs_to :crime

      t.timestamps
    end
  end
end
