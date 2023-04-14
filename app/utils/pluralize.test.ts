import { pluralize } from "./pluralize";

describe("pluralize", () => {
  test("treats zero as a case of plural form", () => {
    expect(pluralize({ plural: "cats", singular: "cat" }, 0)).toBe("0 cats");
  });

  test("treats one as a case of singular form", () => {
    expect(pluralize({ plural: "cats", singular: "cat" }, 1)).toBe("1 cat");
  });

  test("treats two as a case of plural form", () => {
    expect(pluralize({ plural: "cats", singular: "cat" }, 2)).toBe("2 cats");
  });

  test("formats small numbers for locale (en-CA)", () => {
    expect(pluralize({ plural: "cats", singular: "cat" }, 999)).toBe("999 cats");
  });

  test("formats large numbers for locale (en-CA)", () => {
    expect(pluralize({ plural: "cats", singular: "cat" }, 1000)).toBe("1,000 cats");
  });
});
