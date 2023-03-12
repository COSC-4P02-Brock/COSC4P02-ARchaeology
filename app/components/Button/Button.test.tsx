import { render, screen } from "@testing-library/react";

import { Button } from "./Button";

describe("button", () => {
  test("Button renders as a default medium button", async () => {
    const text = "Click me";
    render(<Button>{text}</Button>);

    const button = screen.getByText(text);

    expect(button.tagName).toEqual("BUTTON");
  });

  describe("style", () => {
    test("Button renders as a medium default button", async () => {
      const text = "Click me";
      render(<Button>{text}</Button>);

      const button = screen.getByText(text);
      await expect(button).toHaveClass("text-md");
      await expect(button).toHaveClass("bg-gray-700");
    });
  });

  test("Button renders as a medium primary button", async () => {
    const text = "Click me";
    render(<Button primary>{text}</Button>);

    const button = screen.getByText(text)
    await expect(button).toHaveClass("text-md");
    await expect(button).toHaveClass("bg-blue-700");
  });

  test("Button renders as a small button", async () => {
    const text = "Click me";
    render(<Button size="small">{text}</Button>);

    const button = screen.getByText(text)
    await expect(button).toHaveClass("text-sm");
  });

  test("Button renders as a large button", async () => {
    const text = "Click me";
    render(<Button size="large">{text}</Button>);

    const button = screen.getByText(text)
    await expect(button).toHaveClass("text-lg");
  });

  describe("link", () => {
    test("Button renders as an internal link", async () => {
      const text = "Visit Google";
      const href = "https://google.com";
      render(<Button href={href}>{text}</Button>);
      
      const link = screen.getByText(text)
  
      expect(link.tagName).toEqual("A");
      await expect(link).toHaveAttribute("href", href);
      await expect(link).not.toHaveAttribute("target");
    });
  
    test("Button renders as an external link", async () => {
      const text = "Visit Google in a new tab";
      const href = "https://google.com";
      render(<Button href={href} target="_blank">{text}</Button>);
      
      const link = screen.getByText(text)
  
      expect(link.tagName).toEqual("A");
      await expect(link).toHaveAttribute("href", href);
      await expect(link).toHaveAttribute("target", "_blank");
    })
  })
})
