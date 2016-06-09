class CreateResources < ActiveRecord::Migration
  def change
    create_table :resources do |t|
      t.integer "recipe_id"
      t.string :name, null: false
      t.string :resource_type, null: false
      t.text   :content, default: ""

      t.timestamps null: false
    end

    add_index :resources, "recipe_id"
  end
end
