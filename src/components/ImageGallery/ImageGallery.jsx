import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

import { forwardRef } from "react";

const ImageGallery = forwardRef(function ImageGallery(
  { images, openLightbox },
  ref
) {
  return (
    <ul className={css.list}>
      {images.map((image, index) => (
        <li ref={index === 0 ? ref : null} className={css.card} key={image.id}>
          <ImageCard
            imageData={image}
            openLightbox={openLightbox}
            index={index}
          />
        </li>
      ))}
    </ul>
  );
});

export default ImageGallery;
