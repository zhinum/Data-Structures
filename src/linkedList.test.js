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
});
