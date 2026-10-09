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

  size() {
    let currentNode = this.headNode;
    let count = 0;

    while (currentNode != null) {
      count++;
      currentNode = currentNode.nextNode;
    }
    return count;
  }

  head() {
    if (this.headNode === null) {
      return undefined;
    }
    return this.headNode;
  }

  tail() {
    if (this.tailNode === null) {
      return undefined;
    }
    return this.tailNode;
  }

  atIndex(index) {
    if (index < 0 || typeof index !== "number") {
      return undefined;
    }
    let current = this.headNode;
    let count = 0;

    while (current !== null) {
      if (index === count) {
        return current;
      }
      count++;
      current = current.nextNode;
    }
  }

  pop() {
    if (this.headNode === null) {
      return undefined;
    }

    let removedNode = this.headNode;

    this.headNode = this.headNode.nextNode;

    removedNode.nextNode = null;

    if (this.headNode === null) {
      this.tailNode === null;
    }
    return removedNode;
  }

  contains(value) {
    if (value === null) return;

    let currentNode = this.headNode;

    while (currentNode !== null) {
      if (currentNode === value) {
        return true;
      }
      currentNode = currentNode.nextNode;
    }
    return false;
  }
  findIndex(value) {
    if (value === null) return;

    let currentNode = this.headNode;

    let count = 0;
    while (currentNode !== null) {
      if (currentNode === value) {
        return count;
      }

      count++;
      currentNode = currentNode.nextNode;
    }
    return -1;
  }

  toString() {
    let currentNode = this.headNode;
    let result = "";

    while (currentNode !== null) {
      result += `( ${currentNode.value} ) -> `;
      currentNode = currentNode.nextNode;
    }
    result += "null";
    return result;
  }

  insertAt(index, ...values) {
    if (index < 0 || index > this.size()) {
      throw Error("out of bounds");
    }

    if (values.length === 0) return;

    // incase we are inserting at the head node.
    if (index === 0) {
      //loop backwards to maintain order when prepended.
      for (let i = values.length - 1; i >= 0; i--) {
        this.prepend(values[i]);
      }
      return;
    }
    // take the previous node (index.length-1) to get the accurate index.
    let previousNode = this.atIndex(index - 1);

    // store remaining nodes in a variable
    let remainder = previousNode.nextNode;

    //create new nodes for each value then point to the previous node
    for (const value in values) {
      const newNode = new Node(value);
      previousNode.nextNode = newNode;
      previousNode = newNode;
    }
    //note the previous node is now the last new node. we need to attach the remainder back to the pointer
    previousNode.nextNode = remainder;

    //update the tailNode.
    if (remainder === null) {
      this.tailNode = previousNode;
    }
  }
  removeAt(index) {
    if (index < 0 || index > this.size()) {
      throw new Error("out of bounds");
    }

    const targetNode = this.atIndex(index);
    const previousNode = this.atIndex(index - 1);
    const nextNode = targetNode.nextNode;

    if (targetNode === this.headNode) {
      return this.pop();
    }

    if (targetNode.nextNode === null) {
      previousNode.nextNode = null;
    }
    previousNode.nextNode = nextNode;
    targetNode.nextNode = null;

    return targetNode;
  }
}

module.exports = { LinkedList };
