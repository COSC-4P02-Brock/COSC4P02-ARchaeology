import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { LikeButton } from "./LikeButton";

const TEST_COUNT = 0;
const TEST_LABEL = "like";

describe("LikeButton", () => {
  test("renders like button", () => {
    render(
      <LikeButton
        like={() => undefined}
        likeCount={TEST_COUNT}
      >
        {TEST_LABEL}
      </LikeButton>
    );
    expect(screen.getByText(TEST_LABEL)).toBeInTheDocument();
  });

  test("shows like count on hover", async () => {
    render(
      <LikeButton
        like={() => undefined}
        likeCount={TEST_COUNT}
      >
        {TEST_LABEL}
      </LikeButton>
    )

    userEvent.hover(screen.getByText(TEST_LABEL));

    const tooltip = await screen.findByText("0 likes");
    expect(tooltip).toBeInTheDocument();
  });

  test("calls like function on click", async () => {
    const like = vi.fn();
    render(
      <LikeButton like={like} likeCount={TEST_COUNT}>
        {TEST_LABEL}
      </LikeButton>
    );

    const button = screen.getByRole('button');
    button.click();

    expect(like).toHaveBeenCalled();
  });
});
