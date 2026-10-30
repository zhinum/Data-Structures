import { Tree } from "./BST.js";

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

describe("Binary Search Tree - Operations & Deletion Unit Tests", () => {
  let tree;

  // Tree structure representation:
  //         10 (Root)
  //       /    \
  //      5      15
  //     / \       \
  //    3   7       20
  //                  \
  //                   25
  beforeEach(() => {
    const arr = [10, 5, 15, 3, 7, 20, 25];
    tree = new Tree(arr);
  });

  test("1. Test includes / find method", () => {
    expect(tree.includes(7)).toBe(true);
    expect(tree.includes(10)).toBe(true);
    expect(tree.includes(99)).toBe(false); // Non-existent value
  });

  test("2. Test depth method for specific nodes", () => {
    expect(tree.depth(10)).toBe(0); // Root depth is 0
    expect(tree.depth(5)).toBe(1); // Child depth is 1
    expect(tree.depth(3)).toBe(2); // Grandchild depth is 2
  });

  test("3. Test height method for specific nodes", () => {
    expect(tree.height(3)).toBe(0); // Leaf node height is 0
    expect(tree.height(20)).toBe(1); // Node with one child height is 1
    expect(tree.height(10)).toBe(3); // Root height spans the max depth
  });
});

describe("4. Test delete method variations", () => {
  test("should delete a leaf node (0 children)", () => {
    tree.delete(3); // 3 is a leaf node
    expect(tree.includes(3)).toBe(false);
    // Ensure other nodes remain intact
    expect(tree.includes(5)).toBe(true);
    expect(tree.includes(7)).toBe(true);
  });

  test("should delete a node with one child", () => {
    tree.delete(20); // 20 has one child (25)
    expect(tree.includes(20)).toBe(false);
    expect(tree.includes(25)).toBe(true); // Child should still be reachable
  });

  test("should delete a node with two children", () => {
    tree.delete(5); // 5 has two children (3 and 7)
    expect(tree.includes(5)).toBe(false);
    expect(tree.includes(3)).toBe(true); // Left child preserved
    expect(tree.includes(7)).toBe(true); // Right child preserved
  });

  test("should delete the root node", () => {
    tree.delete(10); // Deleting the root
    expect(tree.includes(10)).toBe(false);
    expect(tree.root).not.toBeNull(); // A new root should take its place
    // Verify the rest of the tree is still intact and traversable
    expect(tree.includes(15)).toBe(true);
    expect(tree.includes(5)).toBe(true);
  });
});
