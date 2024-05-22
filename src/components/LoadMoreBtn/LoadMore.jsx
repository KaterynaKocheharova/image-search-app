import css from "./LoadMore.module.css";

export default function LoadMoreBtn({ onClick }) {
  return (
    <button className={css.btn} onClick={onClick}>
      Load more
    </button>
  );
}
