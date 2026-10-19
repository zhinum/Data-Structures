const { Tree } = require("./BST.js");

describe("Binary Search Tree - Isolated Unit Tests", () => {
  const sampleArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

  const tree = new Tree(sampleArr);

  test("1. Test Duplicate Removal in isolation", () => {
    const sortedArray = tree.duplicateRemoval(sampleArr);

    // Length should drop from 14 down to 11 unique elements
    expect(sortedArray.length).toBe(11);
  });

  test("2. Test Sorting (Merge Sort / Sort Clean) in isolation", () => {
    const unsortedArray = tree.duplicateRemoval(sampleArr);

    const sortedArray = tree.mergeSort(unsortedArray);

    // Expect the array to be strictly sorted in ascending order
    expect(sortedArray).toEqual([1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345]);
  });

  test("3. Test #buildTree using the sorted & unique array", () => {
    // With 11 unique sorted items, the middle index (index 5) is 8
    expect(tree.root).not.toBeNull();
    expect(tree.root.value).toBe(8);
  });
});
