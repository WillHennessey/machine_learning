import numpy as np
from sklearn.datasets import load_iris
from sklearn import tree
from sklearn.externals.six import StringIO
import pydotplus
import os     

os.environ["PATH"] += os.pathsep + 'C:/Program Files (x86)/Graphviz2.38/bin/'
iris = load_iris()
#print iris.feature_names
#print iris.target_names
#for i in range(len(iris.target)):
#	print "Example %d: label %s, features %s" % (i, iris.target[i], iris.data[i] )
test_index = [0,50,100]

# training data
train_target = np.delete(iris.target, test_index)
train_data = np.delete(iris.data, test_index, axis = 0)

# testing data
test_target = iris.target[test_index]
test_data = iris.data[test_index]

clf = tree.DecisionTreeClassifier()
clf = (clf.fit(iris.data, iris.target))

print test_target
print clf.predict(test_data)


# vizualization code

dot_data = StringIO()
tree.export_graphviz(clf,
	out_file = dot_data, feature_names = iris.feature_names, class_names = iris.target_names,
	filled = True, rounded = True, impurity = False, special_characters = True)
graph = pydotplus.graph_from_dot_data(dot_data.getvalue())
graph.write_pdf('iris.pdf')