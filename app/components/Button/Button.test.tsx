import { render, screen } from "@testing-library/react";

import { Button } from "./Button";

test("Button renders correctly", () => {
  const text = "Click me";
  render(<Button>{text}</Button>);
  expect(screen.getByText(text)).toBeInTheDocument();
});
