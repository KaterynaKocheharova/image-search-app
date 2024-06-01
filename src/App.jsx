import { useState, useEffect, useRef } from "react";
import Container from "./components/Container/Container";
import SearchBar from "./components/SearchBar/SearchBar";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMore";
import ImageLightbox from "./components/ImageLightbox/ImageLightbox";
import getImages from "./api";
import handleLoadMoreScroll from "./scroll";

export default function App() {
  // IMAGES STATES
  const [images, setImages] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [currentQuery, setCurrentQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  // LIGHBOX STATES
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const slides = images.map(({ urls: { regular } }) => ({ src: regular }));

  // LIGHBOX FUNCTIONS

  const open = (index) => {
    setIndex(index);
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

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

  // SMOOTH SCROLLING
  useEffect(() => {
    if (currentPage === 1) return;
    handleLoadMoreScroll(galleryItemRef.current);
  }, [images, currentPage]);

  // SEARCHING FOR THE FIRST TIME
  function handleSubmit(query) {
    setIsEmpty(false);
    setCurrentQuery(query);
    setCurrentPage(1);
    setImages([]);
  }

  // LOAD MORE
  function handleLoadMoreBtnClick() {
    setCurrentPage(currentPage + 1);
  }

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      <main>
        <Container notHeader>
          {!images.length && !isEmpty && <p>Let's begin search!🤗</p>}
          {isEmpty && <p>No images found! Sorry!</p>}
          {images.length > 0 && (
            <ImageGallery ref={galleryItemRef} images={images} openLightbox={open} />
          )}
          {isLoading && <Loader />}
          {error && <ErrorMessage />}
          {images.length > 0 && !isLoading && currentPage !== totalPages && (
            <LoadMoreBtn onClick={handleLoadMoreBtnClick} />
          )}
          {isOpen && (
            <ImageLightbox
              setIndex={setIndex}
              index={index}
              isOpen={isOpen}
              close={close}
              slides={slides}
            />
          )}
        </Container>
      </main>
    </div>
  );
}
