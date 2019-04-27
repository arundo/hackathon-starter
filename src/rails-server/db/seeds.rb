# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'csv'
Temperature.destroy_all

csv_text = File.read(Rails.root.join('lib', 'seeds', 'data.csv'))
csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
csv.each do |row|
  t = Temperature.new
  t.time = row['time']
  t.current_temp = row['current_temp']
  t.target_temp = row['target_temp']
  t.outside_temp = row['outside_temp']
  t.save
end

puts "There are now #{Temperature.count} rows in the temperatures table"
