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

    const sortedArray = tree.sort(unsortedArray);

    // Expect the array to be strictly sorted in ascending order
    expect(sortedArray).toEqual([1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345]);
  });
  test("3. Should return the array as-is if it is already sorted", () => {
    const alreadySorted = [1, 3, 4, 5, 7, 8, 9];
    const result = tree.sortCheck(alreadySorted);
    console.log(result);

    // Expect it to pass through and return the sorted array directly
    expect(result).toEqual([1, 3, 4, 5, 7, 8, 9]);
  });

  test("4. Should detect an unsorted array and trigger sort()", () => {
    const unsortArray = [1, 7, 4, 23, 8, 9, 3, 5, 67, 324];
    console.log(unsortArray);
    const result = tree.sortCheck(unsortArray);
    console.log(result);

    // Expect sortCheck to catch the unordered items and return a cleanly sorted array
    expect(result).toEqual([1, 3, 4, 5, 7, 8, 9, 23, 67, 324]);
  });

  test("5. Test #buildTree using the sorted & unique array", () => {
    // With 11 unique sorted items, the middle index (index 5) is 8
    expect(tree.root).not.toBeNull();
    expect(tree.root.value).toBe(8);
  });
});
