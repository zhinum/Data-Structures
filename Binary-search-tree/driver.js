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
