import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

  test("Button renders as a medium inverse button", async () => {
    const text = "Click me";
    render(<Button inverse>{text}</Button>);

    const button = screen.getByText(text);
    await expect(button).toHaveClass("text-md");
    await expect(button).toHaveClass("bg-gray-200");
  });

  test("Button renders as a medium inverse primary button", async () => {
    const text = "Click me";
    render(<Button inverse primary>{text}</Button>);

    const button = screen.getByText(text);
    await expect(button).toHaveClass("text-md");
    await expect(button).toHaveClass("bg-blue-200");
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

  test("Button invokes callback on click", async () => {
    const user = userEvent.setup()
    const text = "Click me";
    const callback = vi.fn();
    render(<Button onClick={callback}>{text}</Button>);

    const button = screen.getByText(text);
    await user.click(button);

    expect(callback).toHaveBeenCalled();
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
      const href = "https://googl.com";
      render(<Button href={href} target="_blank">{text}</Button>);
      
      const link = screen.getByText(text)
  
      expect(link.tagName).toEqual("A");
      await expect(link).toHaveAttribute("href", href);
      await expect(link).toHaveAttribute("target", "_blank");
    });

    test("Button invokes callback on click", async () => {
      const text = "Click me";
      const href = "https://googl.com";
      const callback = vi.fn();
      render(<Button href={href} onClick={callback}>{text}</Button>);
  
      const button = screen.getByText(text);
      button.click();
  
      expect(callback).toHaveBeenCalled();
    });
  })
})
