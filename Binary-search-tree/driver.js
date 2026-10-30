import { Tree } from "./BST.js";

function driver() {
  let randomArr = [];
  for (let i = 0; i < 100; i++) {
    randomArr.push(Math.floor(Math.random() * 100));
  }
  return randomArr;
}

const testTree = new Tree(driver());

console.log(testTree.isBalanced());
function add(num) {
  return num + 2;
}
testTree.prettyPrint(testTree.root);

testTree.levelOrderRecursively(add);

testTree.prettyPrint(testTree.root);
testTree.levelOrderLoop(add);
testTree.prettyPrint(testTree.root);
testTree.inorderForEach(add);
testTree.prettyPrint(testTree.root);
testTree.postorderForEach(add);
testTree.prettyPrint(testTree.root);
testTree.preorderForEach(add);

testTree.insert(204);

testTree.insert(224);

testTree.insert(264);
testTree.insert(304);
testTree.insert(208);
testTree.insert(404);
testTree.insert(207);

testTree.insert(104);
testTree.insert(254);
testTree.insert(294);
testTree.prettyPrint(testTree.root);
testTree.levelOrderRecursively(add);

console.log(testTree.isBalanced());

const rebalanceTree = testTree.rebalance();
rebalanceTree.prettyPrint(rebalanceTree.root);

console.log(rebalanceTree.isBalanced());

rebalanceTree.prettyPrint(rebalanceTree.root);
rebalanceTree.levelOrderRecursively(add);
rebalanceTree.prettyPrint(rebalanceTree.root);
rebalanceTree.levelOrderLoop(add);
rebalanceTree.prettyPrint(rebalanceTree.root);
rebalanceTree.inorderForEach(add);
rebalanceTree.prettyPrint(rebalanceTree.root);
rebalanceTree.postorderForEach(add);
rebalanceTree.prettyPrint(rebalanceTree.root);
rebalanceTree.preorderForEach(add);
