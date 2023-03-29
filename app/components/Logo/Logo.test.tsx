import { render, screen } from "@testing-library/react";

import { Logo } from "./Logo";

describe("Logo", () => {
  test.each([
    ["dark", "Logo.darkTheme"],
    ["light", "Logo.lightTheme"],
  ])(
    "given %s as theme, renders component with %s test id",
    (theme, testId) => {
      render(<Logo theme={theme as "light" | "dark"} />);
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    }
  );
});
