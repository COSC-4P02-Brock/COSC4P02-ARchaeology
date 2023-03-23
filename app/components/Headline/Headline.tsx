import classNames from "classnames";

interface HeadlineProps {
  /**
   * The header of the headline.
   */
  header?: React.ReactNode;

  /**
   * The content of the headline.
   */
  description?: React.ReactNode;

  /**
   * The text in the button.
   */
  buttonText?: React.ReactNode;

  /**
   * The link that the button will follow to.
   */
  link?: React.ReactNode;
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
  header,
  description,
  buttonText,
  link,
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
    primary ? "bg-black" : "bg-blue-700",
    primary ? "hover:bg-gray-600" : "hover:bg-gray-800",
    primary ? "hover:text-white " : "hover:text-gray-100",
    size === "small" ? "text-sm" : size === "medium" ? "text-md" : "text-lg",
    size === "small" ? "px-2" : size === "medium" ? "px-4" : "px-6",
    size === "small" ? "py-1" : size === "medium" ? "py-2" : "py-3"
  );
  return (
    
    <div className="bg-gray-300 rounded">
      <div className="ml-4 font-weight-bold">
        <h2 className="sr-only">Headline</h2>
        <p>{header}</p>
      </div>
      
      <div className="ml-4">
        <h2 className="sr-only">Description</h2>
        <p>{description}</p>
      </div>

      <div className="items-right">
        <button type="button" className={className} {...props}>
          {buttonText ?? ""}
        </button>
      </div>

    </div>

  );
};
