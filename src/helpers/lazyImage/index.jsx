import React, { useState } from "react";
const CardImages = "/assets/images/thumbnail.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
// export const addTransformParam = (src) => {
//   return src?.length > 0 && src?.indexOf("?") === -1 ? "?t=w" : "&t=w";
// };

const LazyImage = ({ src, className, onClick }) => {
  // const { src } = image;
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={className}>
      <LazyLoadImage
        onClick={onClick ? onClick : null}
        src={src}
        alt="Image Alt"
        placeholderSrc={CardImages}
        afterLoad={() => setIsLoaded(true)}
        threshold={500}
        className={isLoaded ? "image-loaded" : "image-loading"}
      />
    </div>
  );
};

export default LazyImage;
