import { render } from "@testing-library/react";

import { Button } from "./Button";

test("Button renders correctly", () => {
  const text = "Click me";
  const { getByText } = render(
    <Button>{ text }</Button>
  )
  expect(getByText(text)).toBeInTheDocument();
});
