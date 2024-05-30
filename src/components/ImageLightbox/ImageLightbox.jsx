import Lightbox from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/styles.css";
import css from "./ImageLightbox.module.css";

export default function ImageLighbox({
  isOpen,
  close,
  slides,
  index,
  setIndex,
}) {
  return (
    <>
      <Lightbox
        className={css.lightbox}
        open={isOpen}
        close={close}
        slides={slides}
        index={index}
        on={{ view: ({ index: currentIndex }) => setIndex(currentIndex) }}
        controller={{
          closeOnBackdropClick: true,
        }}
        plugins={[Counter]}
      />
    </>
  );
}
