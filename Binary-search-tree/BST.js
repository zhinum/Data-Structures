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
    console.log(duplicateFilteredArray);
    const sortedArray = this.sort(duplicateFilteredArray);
    console.log(sortedArray);

    this.root = this.#buildTree(sortedArray, 0, sortedArray.length - 1) || null;
  }

  #buildTree(array, start, end) {
    if (start > end) return null;

    console.log(start);
    console.log(end);
    let mid = Math.floor((start + end) / 2);
    console.log(mid);
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
    let start = array[0];
    for (let i = 1; i <= array.length - 1; i++) {
      if (start > array[i]) {
        return this.sort(array);
      } else {
        return array;
      }
    }
  }

  sort(array) {
    return array.sort((a, b) => a - b);
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
}

module.exports = { Tree };
