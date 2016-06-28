class CreateResources < ActiveRecord::Migration
  def change
    create_table :resources do |t|
      t.integer "recipe_id"
      t.string :name, null: false
      t.string :resource_type, null: false
      t.text :properties, null: false
      t.text :actions, null: false

      t.timestamps null: false
    end
  end
end
