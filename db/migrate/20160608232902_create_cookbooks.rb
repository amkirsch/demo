class CreateCookbooks < ActiveRecord::Migration
  def change
    create_table :cookbooks do |t|
      t.string :name, null: false
      t.string :version, default: 0.1, null: false

      t.timestamps null: false
    end
  end
end
