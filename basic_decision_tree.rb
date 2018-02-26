require 'decisiontree'

attributes = ['Temp']

training = [
  [98.7, 'healthy'],
  [99.1, 'healthy'],
  [99.5, 'sick'],
  [100.5, 'sick'],
  [102.5, 'crazy sick'],
  [107.5, 'dead']]

dec_tree = DecisionTree::ID3Tree.new(attributes, training, 'sick', :continuous)
dec_tree.train

test = [98.5, 'healthy'] # 'healthy'
test_2 = [106.4, 'healthy'] # 'dead'

p dec_tree.predict(test)
p dec_tree.predict(test_2)