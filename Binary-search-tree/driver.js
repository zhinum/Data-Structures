const { Tree } = require("./BST.js");

function driver() {
  return [Math.floor(Math.random() * 100)];
}

const testTree = new Tree(driver());

console.log(testTree.isBalanced());
function add(num) {
  return num + 2;
}
testTree.prettyPrint(testTree.levelOrderRecursively(add));
testTree.prettyPrint(testTree.levelOrderLoop(add));
testTree.prettyPrint(testTree.inorderForEach(add));
testTree.prettyPrint(testTree.postorderForEach(add));
testTree.prettyPrint(testTree.preorderForEach(add));

testTree.insert(204);
testTree.insert(224);
testTree.insert(264);
testTree.insert(304);
testTree.insert(208);
testTree.insert(104);
testTree.insert(207);
testTree.insert(604);
testTree.insert(254);
testTree.insert(294);

console.log(testTree.isBalanced());

testTree.rebalance;

console.log(testTree.isBalanced());

testTree.prettyPrint(testTree.levelOrderRecursively(add));
testTree.prettyPrint(testTree.levelOrderLoop(add));
testTree.prettyPrint(testTree.inorderForEach(add));
testTree.prettyPrint(testTree.postorderForEach(add));
testTree.prettyPrint(testTree.preorderForEach(add));
