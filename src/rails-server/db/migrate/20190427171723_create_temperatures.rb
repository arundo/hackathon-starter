class CreateTemperatures < ActiveRecord::Migration[5.2]
  def change
    create_table :temperatures do |t|
      t.string :time
      t.string :current_temp
      t.string :target_temp
      t.string :outside_temp

      t.timestamps
    end
  end
end
