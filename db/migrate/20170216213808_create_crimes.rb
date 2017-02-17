class CreateCrimes < ActiveRecord::Migration[5.0]
  def change
    create_table :crimes do |t|
      t.belongs_to :team

      t.date :date
      t.string :name
      t.string :position
      t.string :encounter
      t.text :description
      t.text :outcome

      t.timestamps
    end
  end
end
