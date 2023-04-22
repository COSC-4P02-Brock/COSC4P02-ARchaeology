import { render, screen } from "@testing-library/react";

import { Error } from "./Error";

describe("Error", () => {
  test("Displays error message", () => {
    const message = "Oops! Something went wrong. Please try again later.";
    render(<Error message={message} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });
});
