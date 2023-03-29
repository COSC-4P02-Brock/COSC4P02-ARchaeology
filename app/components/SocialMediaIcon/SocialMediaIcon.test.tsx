import { render, screen } from "@testing-library/react";

import { SocialMediaIcon } from "./SocialMediaIcon";
import type { SocialMediaLink } from "../../models";
describe("Social media icon", () => {
  test.each([
    ["facebook", "SocialMediaIcon.Facebook"],
    ["instagram", "SocialMediaIcon.Instagram"],
    ["twitter", "SocialMediaIcon.Twitter"],
    ["youtube", "SocialMediaIcon.YouTube"],
  ])(
    "given %s as icon, renders component with %s test id",
    (icon, testId) => {
      render(<SocialMediaIcon icon={icon as SocialMediaLink['icon']} />);
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    }
  );
});
