
import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
const AiLogo = "/assets/logo/logo-5.png";
export const addTransformParam = (src) => {
  return src?.length > 0 && src?.indexOf("?") === -1 ? "?t=w" : "&t=w";
};
// const contentHubSizes = [576, 992, 1200, 1920, 2880];
// const deviceSizes = [576, 992, 1440, 1920, 2880];
const LazyImage = ({
  image,
  sizes,
  width,
  height,
  loading = "lazy",
  className,
}) => {
  const { src, alt } = image;
  const [isLoaded, setIsLoaded] = useState(false);
  const handleImageLoad = (arg) => {
    setIsLoaded(true);
  };
  return (
    <div className={className} style={{ position: "relative", width, height }}>
      {!isLoaded && (
        <Skeleton
          baseColor="#d1d1d1" highlightColor="#FFFFFF"
          className={className}
          style={{ width: "100%", height: "100%", display: 'block' }}
        />
      )}

      {image ? (
        <img
          alt={alt}
          // width={width}
          // height={height}
          width='100%'
          height='100%'
          onLoad={handleImageLoad}
          loading={loading}
          src={`${src}`}
          // srcSet={deviceSizes
          //   .map(
          //     (deviceSize, index) =>
          //       `${src}${addTransformParam(src)}${contentHubSizes[index]
          //       } ${deviceSize}w`
          //   )
          //   .join(", ")}
          sizes={sizes ? sizes : `(max-width: 768px) 100vw, 50vw`}
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 1s",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : null}
    </div>
  );
};

export default LazyImage;
