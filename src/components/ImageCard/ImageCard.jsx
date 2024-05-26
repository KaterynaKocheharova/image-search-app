import css from "./ImageCard.module.css";

export default function ImageCard({
  imageData: {
    likes,
    description,
    urls: { small },
  },
  openLightbox,
}) {
  return (
    <>
      <p>Likes: {likes}</p>
      <div className={css["image-container"]}>
        <img
          className={css.image}
          src={small}
          alt={description}
          onClick={openLightbox}
        />
      </div>
    </>
  );
}
