import { render, screen } from "@testing-library/react";

import { Headline } from "./Headline";

test("Headline renders correctly", () => {
  const header = "header";
  const desc = "description";
  const buttonText = "Click me!";
  render(<Headline>{header}</Headline>);
  expect(screen.getByText(header)).toBeInTheDocument();
  expect(screen.getByText(desc)).toBeInTheDocument();
  expect(screen.getByText(buttonText)).toBeInTheDocument();
});
