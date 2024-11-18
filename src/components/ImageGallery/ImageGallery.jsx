import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className={css.wrapperGallery}>
      {images.map((image) => (
        <li key={image.id} style={{ listStyleType: "none" }}>
          <ImageCard
            src={image.urls.small}
            alt={image.alt_description}
            onClick={() => onImageClick(image.urls.full)}
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
