import css from "./ImageCard.module.css";

const ImageCard = ({ src, alt, onClick }) => {
  return (
    <div onClick={onClick} className={css.card}>
      <img src={src} alt={alt} />
    </div>
  );
};

export default ImageCard;
