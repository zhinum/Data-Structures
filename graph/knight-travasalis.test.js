import { knightMoves } from "./knight-travasalis.js";
import { getKnightMoves } from "./knight-travasalis.js";

test("getKnightMoves from [4, 1] returns correct valid moves", () => {
  const moves = getKnightMoves(4, 1);
  expect(moves).toEqual([
    [6, 2],
    [5, 3],
    [3, 3],
    [2, 2],
    [6, 0],
    [2, 0],
  ]);
});

test("finds the shortest path from [4, 1] to [4, 5]", () => {
  const path = knightMoves([4, 1], [4, 5]);

  expect(path[0]).toEqual([4, 1]);
  expect(path[path.length - 1]).toEqual([4, 5]);

  // Since it takes 2 moves, the total length of the path array should be 3 items (start, middle, target)
  expect(path.length).toBe(3);

  // Verify the exact expected route
  expect(path).toEqual([
    [4, 1],
    [5, 3],
    [4, 5],
  ]);
});
