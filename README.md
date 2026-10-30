Details for the binary search tree ps. recursion rules

the driver script tested the buildtree, insert, balanced and all traversal functions.

the test will cover the remaining functions such as include, and delete. 

One important bug i noticed was when inserting numbers greater than 100, when inserting any number. Callbacks traversal functions that go through the tree and run a function on the numbers, cause a change in those numbers this creates a chance for a duplicate, make sure to handle those duplicates well in your insert methods, i didn't "time stopped for 11 hours" making sure yours is 10 hours. 

In short just make sure there is a check for the duplicates and  return original node or create a new node and return that node, whichever works, for the node being recursively handled which falls a victim of being a duplicate.
