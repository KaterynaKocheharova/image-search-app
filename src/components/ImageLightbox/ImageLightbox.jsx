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
        controller={{
          closeOnBackdropClick: true,
        }}
        render={{
          slide: ({ slide }) => (
            <div>
              <img
                src={slide.src}
                alt={slide.alt || ""}
                style={{ width: "100%", height: "auto" }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "10px",
                  left: "10px",
                  color: "white",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              >
                Your custom text here
              </div>
            </div>
          ),
        }}
      />
    </>
  );
}
