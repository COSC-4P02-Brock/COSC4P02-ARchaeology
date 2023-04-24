import classNames from "classnames";
import { createElement, useCallback } from "react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, MouseEvent } from "react";

type BaseButtonProps = {
  /**
   * Is the button block-level?
   */
  block?: boolean;
  
  /**
   * Is the button disabled?
   */
  disabled?: boolean;

  /**
   * Is the button dark on light instead of light on dark?
   */
  inverse?: boolean;

  /**
   * Is this a destruction action?
   */
  danger?: boolean;

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
  block = false,
  danger = false,
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
    disabled && "cursor-not-allowed opacity-50",
    !primary && !danger && inverse && "bg-slate-200 text-slate-700 hover:bg-slate-300 hover:text-slate-800",
    danger && inverse && "bg-red-200 text-red-700 hover:bg-red-300 hover:text-red-800",
    primary && inverse && "bg-blue-200 text-blue-700 hover:bg-blue-300 hover:text-blue-800",
    !primary && !danger && !inverse && "bg-slate-700 text-slate-100 hover:bg-slate-800 hover:text-white",
    danger && !inverse && "bg-red-700 text-red-100 hover:bg-red-800 hover:text-white",
    primary && !inverse && "bg-blue-700 text-white hover:bg-blue-800 hover:text-white",
    size === "small" ? "text-sm" : size === "medium" ? "text-md" : "text-lg",
    size === "small" ? "px-2" : size === "medium" ? "px-4" : "px-6",
    size === "small" ? "py-0.5" : size === "medium" ? "py-2" : "py-3",
    block && 'w-full',
    "transition",
    "duration-300",
    "ease-out",
    "hover:ease-in",
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
