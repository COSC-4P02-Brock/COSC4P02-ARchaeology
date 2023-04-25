import classNames from "classnames";

interface ImageOverlayProps {
  /**
   * What is the url of the image?
   */
  url: string;

  /**
   * What should the text of the overlay be?
   */
  text: string;

  /**
   * What should the alternative text be?
   */
  alt?: string;
}

/**
 * Example overlay component
 */
export const ImageOverlay = ({
  url, text, alt
}: ImageOverlayProps) => {

  alt = alt ?? text
  const validExtensions = [".png", ".jpg"]
  const extension = url.substr(url.lastIndexOf('.'));
  const isValidFile = validExtensions.indexOf(extension) !== -1;

  const overlaytext = classNames(
    "absolute",
    "w-full",
    "bottom-0",
    "flex",
    "justify-center",
    "place-content-center",
    "transform",
    "bg-opacity-70",
    "bg-black",
    "group-hover:bg-opacity-80",
    "text-white p-4",
    "rounded-b-md",
    "transition",
    "duration-300",
  );

  const image = classNames(
    "absolute",
    "w-full",
    "object-cover",
    "rounded-md",
    "top-0",
    "h-full",
  );
  
  return (
    <>
      {isValidFile ? (
        <div className="group relative w-full" style={{ paddingBottom: "62.5%" }}>
          <img src={url} className={image} alt={alt}/>
          <div className={overlaytext}>
            <p>{text}</p>
          </div>
        </div>
      ) : (
        <div>
          <img src={"/img/warning.png"} className={image} alt={alt}/>
          <div className={overlaytext}>
            <p>Invalid File</p>
          </div>
        </div>
      )}
    </>
  )
};