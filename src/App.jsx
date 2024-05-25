import { useState, useEffect, useRef } from "react";
import Container from "./components/Container/Container";
import SearchBar from "./components/SearchBar/SearchBar";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMore";
import getImages from "./api";
import handleLoadMoreScroll from "./scroll";

export default function App() {
  const [images, setImages] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [currentQuery, setCurrentQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const galleryItemRef = useRef();

  useEffect(() => {
    async function handleSearch() {
      try {
        if (currentQuery !== "") {
          setIsLoading(true);
          setError(false);
          const imageData = await getImages(currentQuery, currentPage);
          if (!imageData.results.length) {
            setIsEmpty(true);
            return;
          }
          if (currentPage === 1) {
            setTotalPages(imageData.total_pages);
          }
          setImages((prevImages) => [...prevImages, ...imageData.results]);
        }
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    handleSearch();
  }, [currentQuery, currentPage]);

  useEffect(() => {
    if (currentPage === 1) return;
    handleLoadMoreScroll(galleryItemRef.current);
  }, [images, currentPage]);

  function handleSubmit(query) {
    setIsEmpty(false);
    setCurrentQuery(query);
    setCurrentPage(1);
    setImages([]);
  }

  function handleLoadMoreBtnClick() {
    setCurrentPage(currentPage + 1);
  }

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      <main>
        <Container notHeader>
          {!images.length && !isLoading && !isEmpty && (
            <p>Let's begin search!🤗</p>
          )}
          {isEmpty && <p>No images found! Sorry!</p>}
          {images.length > 0 && (
            <ImageGallery ref={galleryItemRef} images={images} />
          )}
          {isLoading && <Loader />}
          {error && <ErrorMessage />}
          {images.length > 0 && !isLoading && currentPage !== totalPages && (
            <LoadMoreBtn onClick={handleLoadMoreBtnClick} />
          )}
        </Container>
      </main>
    </div>
  );
}

// import * as React from "react";
// import Lightbox from "yet-another-react-lightbox";
// import "yet-another-react-lightbox/styles.css";

// export default function App() {
//   const [open, setOpen] = React.useState(false);

//   return (
//     <>
//       <button type="button" onClick={() => setOpen(true)}>
//         Open Lightbox
//       </button>

//       <Lightbox
//         open={open}
//         close={() => setOpen(false)}
//         slides={[
//           { src: "/image1.jpg" },
//           { src: "/image2.jpg" },
//           { src: "/image3.jpg" },
//         ]}
//       />
//     </>
//   );
// }
