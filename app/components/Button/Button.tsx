import classNames from "classnames";
import { createElement } from "react";

type BaseButtonProps = {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;

  /**
   * How large should the button be?
   */
  size?: "small" | "medium" | "large";
}

type ButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /**
   * href will not be passed to the button element if it is present.
   */
  href?: string;
};
type ButtonLinkProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;

/**
 * Button component
 */
export const Button = ({
  href,
  primary = false,
  size = "medium",
  ...props
}: ButtonProps | ButtonLinkProps) => {
  const className = classNames(
    "inline-flex",
    "items-center",
    "justify-center",
    "rounded",
    "text-white",
    "transition-colors",
    primary ? "bg-blue-700" : "bg-gray-700",
    primary ? "hover:bg-blue-800" : "hover:bg-gray-800",
    primary ? "hover:text-blue-100" : "hover:text-gray-100",
    size === "small" ? "text-sm" : size === "medium" ? "text-md" : "text-lg",
    size === "small" ? "px-2" : size === "medium" ? "px-4" : "px-6",
    size === "small" ? "py-1" : size === "medium" ? "py-2" : "py-3"
  );

  const isLink = Boolean(href)

  return createElement(isLink ? "a" : "button", {
    className,
    href: isLink ? href : undefined,
    type: isLink ? undefined : "button",
    ...props,
  });
};
