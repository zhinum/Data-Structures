class Node {
  constructor(value) {
    this.value = value;
    this.leftNode = null;
    this.rightNode = null;
  }
}

export class Tree {
  constructor(array) {
    console.log(array);
    let duplicateFilteredArray = this.duplicateRemoval(array);
    const sortedArray = this.sort(duplicateFilteredArray);

    this.root = this.#buildTree(sortedArray, 0, sortedArray.length - 1);
    this.balanced = false;
  }

  #buildTree(array, start, end) {
    if (start > end) return null;

    let mid = Math.floor((start + end) / 2);

    let root = new Node(array[mid]);
    root.leftNode = this.#buildTree(array, start, mid - 1);
    root.rightNode = this.#buildTree(array, mid + 1, end);

    return root;
  }

  prettyPrint(currentNode = this.root, prefix = "", isLeft = true) {
    if (currentNode === null || currentNode === undefined) {
      return;
    }

    this.prettyPrint(
      currentNode.rightNode,
      `${prefix}${isLeft ? "│   " : "    "}`,
      false,
    );
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${currentNode.value}`);
    this.prettyPrint(
      currentNode.leftNode,
      `${prefix}${isLeft ? "    " : "│   "}`,
      true,
    );
  }
  duplicateRemoval(array) {
    let cleanedArray = [...new Set(array)];
    return cleanedArray;
  }

  sortCheck(array) {
    for (let i = 1; i <= array.length - 1; i++) {
      if (array[i - 1] > array[i]) {
        return this.sort(array);
      }
    }
    return array;
  }

  sort(array) {
    console.log(array);
    let sorted = array.sort((a, b) => a - b);
    console.log(sorted);
    return sorted;
  }
  includes(value) {
    let currentNode = this.root;
    if (currentNode.value === value) {
      return true;
    }

    if (value > currentNode.value) {
      this.includes(currentNode.rightNode);
    }
    if (value < currentNode) {
      this.includes(currentNode.leftNode);
    }
    return false;
  }
  insert(value) {
    this.#insertRecursively(value, this.root);
  }

  #insertRecursively(value, currentNode) {
    if (currentNode === null) {
      return new Node(value);
    }

    if (currentNode.value === value) {
      return;
    }

    if (value < currentNode.value) {
      currentNode.leftNode = this.#insertRecursively(value, currentNode);
    }

    if (value > currentNode.value) {
      currentNode.rightNode = this.#insertRecursively(value, currentNode);
    }
  }

  delete(value) {
    this.#deleteItemRecur(value, this.root);
  }

  #deleteItemRecur(value, currentNode) {
    if (currentNode === null || currentNode === value) {
      return currentNode;
    }
    // look for node with value.
    if (value > currentNode.value) {
      currentNode.rightNode = this.#deleteItemRecur(value, currentNode.right);
    } else if (value < currentNode.value) {
      currentNode.leftNode = this.#deleteItemRecur(value, currentNode.left);
    }

    // check if node is empty
    if (currentNode.rightNode === null) {
      return currentNode.leftNode;
    }
    if (currentNode.leftNode === null) {
      return currentNode.rightNode;
    }

    const sucessor = this.findSucessor(currentNode);
    currentNode.value = sucessor.value;
    //clear sucessor previous position
    currentNode.right = this.#deleteItemRecur(
      sucessor.value,
      currentNode.right,
    );
    return currentNode;
  }

  // go through inorderly and find the next greatest value to replaced node
  findSucessor(currentNode) {
    currentNode = currentNode.rightNode;

    while (currentNode !== null && currentNode.leftNode !== null) {
      currentNode = currentNode.left;
    }
    return currentNode;
  }

  levelOrderRecursively(callback) {
    const levelArray = [];
    function traverseBreathOrderRecur(node, level) {
      if (node === null) return;

      if (!levelArray[level]) {
        levelArray[level] = [];
      }

      levelArray.push(node.value);

      traverseBreathOrderRecur(node.leftNode, level + 1);
      traverseBreathOrderRecur(node.rightNode, level + 1);
    }

    traverseBreathOrderRecur(this.root, 0);

    let flatArray = levelArray.flat();
    if (callback) {
      flatArray.forEach((item) => callback(item));
      return;
    } else throw new Error("callback not provided");
  }

  levelOrderLoop(callback) {
    if (this.root === null) return;
    if (typeof callback !== "function") {
      throw new Error("not a function");
    }

    let queue = [this.root];

    while (queue.length > 0) {
      const currentNode = queue.shift();

      callback(currentNode.value);

      queue.push(currentNode.leftNode);

      if (currentNode.rightNode) {
        queue.push(currentNode.rightNode);
      }
    }
  }

  preorderForEach(callback) {
    this.#validateCallback(callback);
    this.#preorderForEachHelper(this.root, callback);
  }

  inorderForEach(callback) {
    this.#validateCallback(callback);
    this.#inorderForEach(this.root, callback);
  }

  postorderForEach(callback) {
    this.#validateCallback(callback);
    this.#postorderForEach(this.root, callback);
  }

  #validateCallback(callback) {
    if (typeof callback !== "function") {
      throw new Error("not a function");
    }
  }

  height(value) {
    let currentNode = this.root;
    while (currentNode !== null) {
      if (value === currentNode.value)
        return this.#calculateHeight(currentNode);
      if (value < currentNode.value) {
        currentNode = currentNode.leftNode;
      } else {
        currentNode = currentNode.rightNode;
      }
    }
    return undefined;
  }
  //height is the number of edges(connections) nodes from the leaf Nodes

  #calculateHeight(currentNode) {
    if (currentNode === null) return 0;

    const leftNodeHeight = this.#calculateHeight(currentNode.leftNode);

    const rightNodeHeight = this.#calculateHeight(currentNode.rightNode);

    if (Math.abs(leftNodeHeight - rightNodeHeight) > 1) {
      this.balanced = false;
    }

    return Math.max(leftNodeHeight, rightNodeHeight) + 1;
  }

  depth(value) {
    if (value === null) return;
    let depthCount = 0;
    let currentNode = this.root;
    while (currentNode !== null) {
      if (currentNode.value === value) return depthCount;

      if (value > currentNode.value) {
        currentNode = currentNode.rightNode;
      }
      if (value < currentNode.value) {
        currentNode = currentNode.leftNode;
      }

      depthCount++;
    }
  }
  isBalanced() {
    this.balanced = true;

    this.#calculateHeight(this.root);

    return this.balanced;
  }
  rebalance() {
    if (this.isBalanced === true) return "Tree is already balanced";
    let newArr = [];

    let callback = newArr.push();
    let currentNode = this.root;
    this.#inorderForEach(currentNode, callback);

    new Tree(newArr);
  }

  #preorderForEachHelper(currentNode, callback) {
    if (currentNode === null) return;
    -callback(currentNode.value);
    this.#preorderForEachHelper(currentNode.leftNode, callback);
    this.#preorderForEachHelper(currentNode.rightNode, callback);
  }

  #inorderForEach(currentNode, callback) {
    if (currentNode === null) return;

    this.#inorderForEach(currentNode.leftNode, callback);
    callback(currentNode.value);
    this.#inorderForEach(currentNode.rightNode, callback);
  }

  #postorderForEach(currentNode, callback) {
    if (currentNode === null) return;

    this.#postorderForEach(currentNode.leftNode, callback);
    this.#postorderForEach(currentNode.rightNode, callback);
    callback(currentNode.value);
  }
}
