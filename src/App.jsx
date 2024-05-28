import { useState, useEffect, useRef } from "react";
import Container from "./components/Container/Container";
import SearchBar from "./components/SearchBar/SearchBar";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMore";
import ImageLighbox from "./components/ImageLightbox/ImageLightbox";
import getImages from "./api";
import handleLoadMoreScroll from "./scroll";

export default function App() {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [lightboxIsOpen, setLightboxIsOpen] = useState(false);
  const [lightboxSlides, setLightboxSlides] = useState([]);
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
    const srcs = images.map(({ urls: { regular } }) => {
      return { src: `${regular}` };
    });
    setLightboxSlides(srcs);

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

  function openLightbox(index) {
    setIndex(index);
    setLightboxIsOpen(true);
  }

  function closeLightbox() {
    setLightboxIsOpen(false);
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
            <ImageGallery
              ref={galleryItemRef}
              images={images}
              openLightbox={openLightbox}
            />
          )}
          {isLoading && <Loader />}
          {error && <ErrorMessage />}
          {images.length > 0 && !isLoading && currentPage !== totalPages && (
            <LoadMoreBtn onClick={handleLoadMoreBtnClick} />
          )}
          {lightboxIsOpen && (
            <ImageLighbox
              setIndex={setIndex}
              index={index}
              isOpen={lightboxIsOpen}
              close={closeLightbox}
              slides={lightboxSlides}
            />
          )}
        </Container>
      </main>
    </div>
  );
}
