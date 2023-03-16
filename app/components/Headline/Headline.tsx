import classNames from "classnames";

interface HeadlineProps {
  /**
   * The content of the headline.
   */
  children?: React.ReactNode;

  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;

  /**
   * How large should the button be?
   */
  size?: "small" | "medium" | "large";

  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Example headline component
 */
export const Headline = ({
  children,
  primary = false,
  size = "medium",
  ...props
}: HeadlineProps) => {
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
  return (
    <button type="button" className={className} {...props}>
      {children ?? ""}
    </button>
  );
};
