import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function ImageLighbox({
  isOpen,
  close,
  slides,
  index,
  setIndex,
}) {
  console.log(slides);
  return (
    <>
      <Lightbox
        open={isOpen}
        close={close}
        slides={slides}
        index={index}
        on={{ view: ({ index: currentIndex }) => setIndex(currentIndex) }}
      />
    </>
  );
}
