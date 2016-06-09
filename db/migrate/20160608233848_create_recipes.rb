class CreateRecipes < ActiveRecord::Migration
  def change
    create_table :recipes do |t|
      t.integer "cookbook_id"
      t.string :name, null: false

      t.timestamps null: false
    end
    add_index :recipes, "cookbook_id"
  end
end
