class Node {
  constructor(value) {
    this.value = value;
    this.leftNode = null;
    this.rightNode = null;
  }
}

class Tree {
  constructor(array) {
    let duplicateFilteredArray = this.duplicateRemoval(array);
    const sortedArray = this.sort(duplicateFilteredArray);

    this.root = this.#buildTree(sortedArray, 0, sortedArray.length - 1) || null;
  }

  #buildTree(array, start, end) {
    if (start > end) return null;

    let mid = Math.floor((start + end) / 2);

    let root = new Node(array[mid]);
    root.leftNode = this.#buildTree(array, start, mid - 1);
    root.rightNode = this.#buildTree(array, mid + 1, end);

    return root;
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

      level.push(node.value);

      traverseBreathOrderRecur(node.left, level + 1);
      traverseBreathOrderRecur(node.right, level + 1);
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

    let queue = [this.root];

    while (queue.length > 0) {
      const currentNode = queue.shift();

      if (callback) {
        callback(currentNode.value);
      } else throw new Error("callback function not provided");

      if (currentNode.leftNode) {
        queue.push(currentNode.leftNode);
      }
      if (currentNode.rightNode) {
        queue.push(currentNode.rightNode);
      }
    }
  }
}
module.exports = { Tree };
