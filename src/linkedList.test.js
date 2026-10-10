const { LinkedList } = require("./linkedList.js");

describe("LinkedList Class", () => {
  let list;
  const initialNames = ["Alice", "Bob", "Charlie", "David", "Emma"];

  beforeEach(() => {
    list = new LinkedList();
  });

  // first test string Conversion Test
  describe("toString()", () => {
    test('returns "null" for an empty list', () => {
      expect(list.toString()).toBe("null");
    });

    test("correctly stringifies a populated list", () => {
      initialNames.forEach((name) => list.append(name));

      const expectedString =
        "( Alice ) -> ( Bob ) -> ( Charlie ) -> ( David ) -> ( Emma ) -> null";
      expect(list.toString()).toBe(expectedString);
    });
  });

  describe("Search Operations", () => {
    beforeEach(() => {
      initialNames.forEach((name) => list.append(name));
    });

    test("contains() returns true for existing elements and false for missing ones", () => {
      expect(list.contains("Charlie")).toBe(true);
      expect(list.contains("Zendaya")).toBe(false);
    });

    test("findIndex() returns correct indices", () => {
      expect(list.findIndex("David")).toBe(3);
      expect(list.findIndex("Zendaya")).toBe(-1);
    });

    test("atIndex() returns correct value", () => {
      expect(list.atIndex(3).value).toBe("David");
      expect(list.atIndex(1).value).toBe("Bob");
    });
  });

  describe("insertAt()", () => {
    beforeEach(() => {
      initialNames.forEach((name) => list.append(name));
    });

    test("inserts single node in the middle", () => {
      list.insertAt(2, "Frank");
      expect(list.toString()).toBe(
        "( Alice ) -> ( Bob ) -> ( Frank ) -> ( Charlie ) -> ( David ) -> ( Emma ) -> null",
      );
    });

    test("inserts multiple nodes at head (index 0) maintaining order", () => {
      list.insertAt(0, "Grace", "Hank");
      expect(list.toString()).toBe(
        "( Grace ) -> ( Hank ) -> ( Alice ) -> ( Bob ) -> ( Charlie ) -> ( David ) -> ( Emma ) -> null",
      );
    });
  });
});
