import css from "./ImageCard.module.css";

export default function ImageCard({
  imageData: {
    likes,
    description,
    urls: { small },
  },
  openLightbox,
  index,
}) {
  return (
    <a className={css["item-link"]} onClick={() => openLightbox(index)}>
      <p>Likes: {likes}</p>
      <div className={css["image-container"]}>
        <img className={css.image} src={small} alt={description} />
      </div>
    </a>
  );
}
