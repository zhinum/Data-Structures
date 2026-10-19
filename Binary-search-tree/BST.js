class Node {
  constructor(value) {
    this.value = value;
    this.leftNode = null;
    this.rightNode = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.#buildTree(array, 0, array.length - 1) || null;
  }

  #buildTree(array, start, end) {
    let duplicateFilteredArray = this.duplicateRemoval(array);
    const sortedArray = this.sortCheck(duplicateFilteredArray);

    if (start > end) return;

    let mid = (start + end) / 2;
    let root = new Node(sortedArray[mid]);
    root.leftNode = this.#buildTree(sortedArray, start, mid - 1);
    root.rightNode = this.#buildTree(sortedArray, start, mid + 1);

    return root;
  }
  duplicateRemoval(array) {
    return [...new Set(array)];
  }
  sortCheck(array) {
    let start = array[0];
    for (let i = 1; i <= array.length - 1; i++) {
      if (start > array[i]) {
        return this.mergeSort(array, 0, array.length - 1);
      } else {
        return array;
      }
    }
  }

  mergeSort(array, start, end) {
    if (start >= end) return;

    let mid = (start + end) / 2;
    this.mergeSort(array, start, mid);
    this.mergeSort(array, mid + 1, end);
  }

  merge(array, start, mid, end) {
    let result = [];
    let leftIndex = start;
    let rightIndex = mid + 1;

    while (leftIndex <= mid && rightIndex <= end) {
      if (array[leftIndex] < array[rightIndex]) {
        result.push(array[leftIndex]);
        leftIndex++;
      } else {
        result.push(array[rightIndex]);
        rightIndex++;
      }
    }

    while (leftIndex <= mid) {
      result.push(array[leftIndex]);
      leftIndex++;
    }

    while (rightIndex <= mid) {
      result.push(array[rightIndex]);
      rightIndex++;
    }

    for (let i = 0; i <= result.length; i++) {
      array[start + i] = result[i];
    }
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
