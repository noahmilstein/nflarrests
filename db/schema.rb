# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170217003437) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "crime_categories", force: :cascade do |t|
    t.integer  "category_id"
    t.integer  "crime_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["category_id"], name: "index_crime_categories_on_category_id", using: :btree
    t.index ["crime_id"], name: "index_crime_categories_on_crime_id", using: :btree
  end

  create_table "crimes", force: :cascade do |t|
    t.integer  "team_id"
    t.date     "date"
    t.string   "name"
    t.string   "position"
    t.string   "encounter"
    t.text     "description"
    t.text     "outcome"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["team_id"], name: "index_crimes_on_team_id", using: :btree
  end

  create_table "teams", force: :cascade do |t|
    t.string   "code"
    t.string   "name"
    t.string   "city"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
