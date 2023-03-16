import classNames from "classnames";
import { createElement, useCallback } from "react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, MouseEvent } from "react";

type BaseButtonProps = {
  /**
   * Is the button disabled?
   */
  disabled?: boolean;

  /**
   * Is the button dark on light instead of light on dark?
   */
  inverse?: boolean;

  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;

  /**
   * How large should the button be?
   */
  size?: "small" | "medium" | "large";
}

type ButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLButtonElement> & {
  /**
   * href will not be passed to the button element if it is present.
   */
  href?: string;
};
type ButtonLinkProps = BaseButtonProps & AnchorHTMLAttributes<HTMLAnchorElement>;

/**
 * Button component
 */
export const Button = ({
  disabled = false,
  href,
  inverse = false,
  primary = false,
  size = "medium",
  ...props
}: ButtonProps | ButtonLinkProps) => {
  const className = classNames(
    "inline-flex",
    "items-center",
    "justify-center",
    "rounded",
    inverse ? (primary ? "text-blue-700" : "text-gray-700") : "text-white",
    "transition-colors",
    disabled && "cursor-not-allowed opacity-50",
    primary ? (inverse ? "bg-blue-200" : "bg-blue-700") : (inverse ? "bg-gray-200": "bg-gray-700"),
    primary ? (inverse ? "hover:bg-blue-300" : "hover:bg-blue-800") : (inverse ? "hover:bg-gray-300" : "hover:bg-gray-800"),
    primary ? (inverse ? "hover:text-blue-800" : "hover:text-blue-100") : (inverse ? "hover:text-gray-800" : "hover:text-gray-100"),
    size === "small" ? "text-sm" : size === "medium" ? "text-md" : "text-lg",
    size === "small" ? "px-2" : size === "medium" ? "px-4" : "px-6",
    size === "small" ? "py-1" : size === "medium" ? "py-2" : "py-3"
  );

  const isLink = Boolean(href)
  const handleClick = useCallback((event:  MouseEvent<HTMLButtonElement> & MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      event.preventDefault()
      event.stopPropagation()
      return
    }

    if (props.onClick) {
      props.onClick(event)
      return
    }

    // Let event bubble up.
  }, [disabled, props.onClick])

  return createElement(isLink ? "a" : "button", {
    className,
    disabled: isLink ? undefined : disabled,
    href: isLink ? href : undefined,
    onClick: handleClick,
    type: isLink ? undefined : "button",
    ...props,
  });
};
