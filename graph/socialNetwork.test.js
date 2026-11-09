import { trackFriend } from "./socialNetwork.js";
import { getFriends } from "./socialNetwork.js";

describe("Tracking system of the graph", () => {
  const socialGraph = {
    Alice: ["Bob", "Claire"],
    Bob: ["Alice", "David", "Emma"],
    Claire: ["Alice", "Frank"],
    David: ["Bob"],
    Emma: ["Bob"],
    Frank: ["Claire"],
  };

  test("returns the array of friends", () => {
    expect(getFriends("Alice", socialGraph)).toEqual(["Bob", "Claire"]);
  });
  test("find person and shortest path to that person", () => {
    expect(trackFriend("Alice", "Frank", socialGraph)).toEqual([
      "Bob",
      "Claire",
    ]);
  });
});
