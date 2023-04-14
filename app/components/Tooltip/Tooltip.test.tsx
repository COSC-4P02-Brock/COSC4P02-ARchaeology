import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import { Tooltip } from "./Tooltip";

const TEST_CHILD_TEXT = "Hover to see tooltip";
const TEST_TOOLTIP_TEXT = "I am a tooltip!";

describe("Tooltip", () => {
  it("should render children", () => {
    render(
      <Tooltip content={TEST_TOOLTIP_TEXT}>
        <button>{TEST_CHILD_TEXT}</button>
      </Tooltip>
    );
    expect(screen.getByText(TEST_CHILD_TEXT)).toBeInTheDocument();
    expect(screen.queryByText(TEST_TOOLTIP_TEXT)).not.toBeInTheDocument();
  });

  it("should render tooltip content on hover", async () => {
    render(
      <Tooltip content={TEST_TOOLTIP_TEXT}>
        <button>{TEST_CHILD_TEXT}</button>
      </Tooltip>
    );

    let tooltip = screen.queryByText(TEST_TOOLTIP_TEXT);
    expect(tooltip).not.toBeInTheDocument();

    userEvent.hover(screen.getByText(TEST_CHILD_TEXT));

    tooltip = await screen.findByText(TEST_TOOLTIP_TEXT);
    expect(tooltip).toBeInTheDocument();
  });
});
