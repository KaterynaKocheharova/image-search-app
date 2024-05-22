import css from "./ImageCard.module.css";

export default function ImageCard({
  imageData: {
    likes,
    description,
    urls: { small, regular },
  },
  onOpenModal,
}) {
  function handleModalClick() {
    onOpenModal({ src: regular, alt: description });
  }

  return (
    <>
      <p>Likes: {likes}</p>
      <div className={css["image-container"]}>
        <img
          className={css.image}
          src={small}
          alt={description}
          onClick={handleModalClick}
        />
      </div>
    </>
  );
}
