class Node {
  // null is empty by default.
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

class LinkedList {
  constructor() {
    this.headNode = null;
    this.tailNode = null;
  }

  prepend(value) {
    let newNode = new Node(value);

    this.headNode = new Node(value, this.headNode);

    if (this.tailNode === null) {
      this.tailNode = newNode;
    } // if the list was empty the new node becomes the first and the last.
  }
  // there are two ways to do this, described as O(n) and O(1). we could loop through our nodes and then append at the end or we can use a tailNode as a base to reference the last node.

  //using o(1) method
  append(value) {
    let newNode = new Node(value);

    if (this.headNode === null) {
      this.headNode = newNode;
      this.tailNode = newNode; // if the list was empty the new node becomes the first and the last.
      return;
    }

    this.tailNode.nextNode = newNode;
    this.tailNode = newNode;
  }
}
