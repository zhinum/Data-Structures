const { HashMap } = require("./hash");

describe.only("HashMap Implementation Tests", () => {
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

    expect(map.get("Canada")).toBeNull();
  });

  test("set updates existing keys instead of duplicating them", () => {
    map.set("France", "Paris");
    map.set("France", "Paris (Updated)");

    expect(map.get("France")).toBe("Paris (Updated)");

    // Ensure the bucket doesn't have duplicate objects for the same key
    const bucket = map.bucket("France");
    const matches = bucket.filter((item) => item.key === "France");
    expect(matches.length).toBe(1);
  });

  test("entry checker returns the correct key object when found", () => {
    map.set("Nigeria", "Abuja");
    const bucket = map.bucket("Nigeria");

    const found = map.entry(bucket, "Nigeria");
    expect(found).toEqual({ key: "Nigeria", value: "Abuja" });
  });

  test("entry checker returns null when key is missing from bucket", () => {
    map.set("Nigeria", "Abuja");
    const bucket = map.bucket("Nigeria");

    const missing = map.entry(bucket, "Germany");
    expect(missing).toBeNull();
  });
});
