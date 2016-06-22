class CreateResources < ActiveRecord::Migration
  def change
    create_table :resources do |t|
      t.integer "recipe_id"
      t.string :name
      t.string :resource_type
      t.text :properties
      t.text :actions

      t.timestamps null: false
    end
  end
end
