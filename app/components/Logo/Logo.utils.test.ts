import { getFillClassNames } from "./Logo.utils";

describe("getFillClassNames", () => {
  test("Gets fill class names for light theme", () => {
    const { blue, red, text } = getFillClassNames("dark");
    expect(blue).toEqual("fill-brand-blue");
    expect(red).toEqual("fill-brand-red");
    expect(text).toEqual("fill-white");
  });

  test("Gets fill class names for dark theme", () => {
    const { blue, red, text } = getFillClassNames("light");
    expect(blue).toEqual("fill-brand-blue");
    expect(red).toEqual("fill-brand-red");
    expect(text).toEqual("fill-brand-black");
  });
});
