require 'open3'
require 'pry'

p system('extractbb', '--help')
out, status = Open3.capture2e('extractbb', '--help')

puts out
p status
