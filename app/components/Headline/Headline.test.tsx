import { render, screen } from "@testing-library/react";

import { Headline } from "./Headline";

test("Button renders correctly", () => {
  const text = "Click me";
  render(<Headline>{text}</Headline>);
  expect(screen.getByText(text)).toBeInTheDocument();
});
