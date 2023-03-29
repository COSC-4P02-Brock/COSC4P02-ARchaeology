import { render, screen } from "@testing-library/react";

import { Footer } from "./Footer";

describe("Footer", () => {
  const siteInfo = {
    footerMenuLinks: [],

    name: "Site",

    socialMediaLinks: [],

    url: "https://example.com",
  };

  test("Renders header for screen readers only", async () => {
    render(<Footer currentYear="2023" siteInfo={siteInfo} />);
    const heading = screen.getByRole("heading");
    expect(heading).toHaveTextContent("Footer");
    await expect(heading).toHaveClass("sr-only"); // screen reader only
  });

  test("Renders copyright notice", () => {
    render(<Footer currentYear="2023" siteInfo={siteInfo} />);
    expect(
      screen.getByText("© 2023 Site. All rights reserved.")
    ).toBeInTheDocument();
  });

  test("Renders menu links", async () => {
    render(<Footer currentYear="2023" siteInfo={{
      ...siteInfo,
      footerMenuLinks: [
        { name: 'Example', url: 'https://www.example.com' },
        { name: 'Another Example', url: 'https://example.com/another' },
      ],
    }} />);
    const links = screen.getAllByTestId("Footer.FooterMenuLink");
    expect(links).toHaveLength(2);

    expect(links[0]).toHaveTextContent("Example");
    await expect(links[0]).toHaveAttribute("href", "https://www.example.com");

    expect(links[1]).toHaveTextContent("Another Example");
    await expect(links[1]).toHaveAttribute("href", "https://example.com/another");
  });

  test("Renders social media links", async () => {
    render(<Footer currentYear="2023" siteInfo={{
      ...siteInfo,
      socialMediaLinks: [
        { name: "Facebook", icon: "facebook", url: "https://www.facebook.com" },
        { name: "YouTube", icon: "youtube", url: "https://www.youtube.com" },
        { name: "Twitter", icon: "twitter", url: "https://www.twitter.com" },
      ],
    }} />);
    const links = screen.getAllByTestId("Footer.SocialMediaLink");
    expect(links).toHaveLength(3);

    await expect(links[0]).toHaveAttribute("title", "Visit us on Facebook");
    await expect(links[0]).toHaveAttribute("href", "https://www.facebook.com");

    await expect(links[1]).toHaveAttribute("title", "Visit us on YouTube");
    await expect(links[1]).toHaveAttribute("href", "https://www.youtube.com");

    await expect(links[2]).toHaveAttribute("title", "Visit us on Twitter");
    await expect(links[2]).toHaveAttribute("href", "https://www.twitter.com");

    expect(screen.getByTestId("SocialMediaIcon.Facebook")).toBeInTheDocument();
    expect(screen.getByTestId("SocialMediaIcon.YouTube")).toBeInTheDocument();
    expect(screen.getByTestId("SocialMediaIcon.Twitter")).toBeInTheDocument();
  });
});
