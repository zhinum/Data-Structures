class Node {
  constructor(data) {
    this.data = data;
    this.leftNode = leftNode;
    this.rightNode = rightNode;
  }
}

class Tree {
  constructor() {
    this.root = root;
  }

  buildTree(array) {}
  sortCheck(array) {
    let start = array[0];
    for (let i = 1; i <= array.length - 1; i++) {
      if (start > array[i]) {
        return array;
      } else {
        return this.mergeSort(array, 0, array.length);
      }
    }
  }
  mergeSort(array, start = 0, end = array.length) {
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
}
