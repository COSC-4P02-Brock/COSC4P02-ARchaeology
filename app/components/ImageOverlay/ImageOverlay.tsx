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
    "relative",
    "w-52",
    "bottom-14",
    "flex",
    "justify-center",
    "place-content-center",
    "transform",
    "bg-black",
    "bg-opacity-80",
    "hover:bg-opacity-100",
    "text-white p-4",
    "rounded-md"
  );

  const image = classNames(
    "relative",
    "w-52",
    "h-52",
    "rounded-md"
  );
  
  return (
    <div>
      {isValidFile ? (
        <div>
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
    </div>
  )
};