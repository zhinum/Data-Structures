const { HashMap } = require("./hash");

describe("HashMap Implementation Tests", () => {
  let map;

  beforeEach(() => {
    map = new HashMap();
  });

  test("hash function returns an index within capacity (0 to 15)", () => {
    const index1 = map.hash("France");
    const index2 = map.hash("Japan");
    const index3 = map.hash("Nigeria");

    expect(index1).toBeGreaterThanOrEqual(0);
    expect(index1).toBeLessThan(16);

    expect(index2).toBeGreaterThanOrEqual(0);
    expect(index2).toBeLessThan(16);

    expect(index3).toBeGreaterThanOrEqual(0);
    expect(index3).toBeLessThan(16);
  });

  test("set and get work correctly for storing and retrieving values", () => {
    map.set("France", "Paris");
    map.set("Japan", "Tokyo");

    expect(map.get("France")).toBe("Paris");
    expect(map.get("Japan")).toBe("Tokyo");
  });

  test("get returns null for missing keys", () => {
    map.set("France", "Paris");

    expect(map.get("Canada")).toBeUndefined();
  });

  test("set updates existing keys instead of duplicating them", () => {
    map.set("France", "Paris");
    map.set("France", "Paris (Updated)");

    expect(map.get("France")).toBe("Paris (Updated)");

    // Ensure the bucket doesn't have duplicate objects for the same key
    const bucket = map.entries("France");
    const matches = bucket.filter((item) => item.key === "France");
    expect(matches.length).toBe(1);
  });

  test("entry checker returns the correct key object when found", () => {
    map.set("Nigeria", "Abuja");
    const bucket = map.buckets[map.hash("Nigeria")];

    const found = map.checker("Nigeria", bucket);
    expect(found).toEqual({ key: "Nigeria", value: "Abuja" });
  });

  test("entry checker returns null when key is missing from bucket", () => {
    map.set("Nigeria", "Abuja");
    const bucket = map.buckets[map.hash("Nigeria")];

    const missing = map.checker("germany", bucket);
    expect(missing).toBeNull();
  });
});

describe("HashMap Class", () => {
  let map;

  beforeEach(() => {
    map = new HashMap();
  });

  // Helper function to populate our standard 12-item dataset
  const populateMap = (m) => {
    m.set("apple", "red");
    m.set("banana", "yellow");
    m.set("carrot", "orange");
    m.set("dog", "brown");
    m.set("elephant", "gray");
    m.set("frog", "green");
    m.set("grape", "purple");
    m.set("hat", "black");
    m.set("ice cream", "white");
    m.set("jacket", "blue");
    m.set("kite", "pink");
  };

  test("1. has() returns true if key exists, false otherwise", () => {
    populateMap(map);
    expect(map.has("apple")).toBe(true);
    expect(map.has("kite")).toBe(true);
    expect(map.has("spaceship")).toBe(false);
  });

  test("2. remove() deletes an entry and returns true, or false if not found", () => {
    populateMap(map);
    expect(map.remove("apple")).toBe(true);
    expect(map.has("apple")).toBe(false);
    expect(map.lengthTrack()).toBe(10);
    expect(map.remove("spaceship")).toBe(false);
  });

  test("3. length tracks the correct number of stored entries", () => {
    expect(map.lengthTrack()).toBe(0);
    populateMap(map);
    expect(map.lengthTrack()).toBe(11);
    map.remove("kite");
    expect(map.lengthTrack()).toBe(10);
    expect(map.lengthLoop()).toBe(10);
    map.remove("apple");
    expect(map.lengthLoop()).toBe(9);
  });

  test("4. clear() wipes out all entries and resets the map", () => {
    populateMap(map);
    map.instantClear();
    expect(map.lengthTrack()).toBe(0);
    expect(map.lengthLoop()).toBe(0);
    expect(map.has("apple")).toBe(false);
    expect(map.keys()).toEqual([]);
  });

  test("5. keys() returns an array of all keys in the hash map", () => {
    populateMap(map);
    const keys = map.keys();
    expect(keys).toContain("apple");
    expect(keys).toContain("frog");
    expect(keys).toContain("ice cream");
    expect(keys.length).toBe(11);
  });

  test("6. values() returns an array of all values in the hash map", () => {
    populateMap(map);
    const values = map.values();
    expect(values).toContain("red");
    expect(values).toContain("green");
    expect(values).toContain("white");
    expect(values.length).toBe(11);
  });

  test("7. entries() returns all pairs and 12th item triggers resize correctly", () => {
    populateMap(map);
    map.set("lion", "golden");
    const entries = map.entries();

    expect(entries).toContainEqual(["apple", "red"]);
    expect(entries).toContainEqual(["lion", "golden"]);
    expect(entries).toContainEqual(["ice cream", "white"]);
    expect(entries.length).toBe(12);

    expect(map.capacity).toBe(32);
  });
});
