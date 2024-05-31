import { useState, useEffect, useRef } from "react";
import Container from "./components/Container/Container";
import SearchBar from "./components/SearchBar/SearchBar";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMore";
import ImageLightbox from "./components/ImageLightbox/ImageLightbox";
import handleLoadMoreScroll from "./scroll";
import useImageSearch from "./hooks/useImageSearch";
import useLightbox from "./hooks/useLightbox";

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const galleryItemRef = useRef();

  const { images, isEmpty, totalPages, isLoading, error } = useImageSearch(
    query,
    page
  );
  const { isOpen, index, slides, open, close, setIndex } = useLightbox(images);

  useEffect(() => {
    if (page === 1) return;
    handleLoadMoreScroll(galleryItemRef.current);
  }, [images, page]);

  const handleSearchSubmit = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
  };

  const handleLoadMoreClick = () => setPage(page + 1);

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      <main>
        <Container notHeader>
          {!images.length && !isLoading && !isEmpty && (
            <p>Let&apos;s begin search!🤗</p>
          )}
          {isEmpty && <p>No images found! Sorry!</p>}
          {images.length > 0 && (
            <ImageGallery
              ref={galleryItemRef}
              images={images}
              openLightbox={open}
            />
          )}
          {isLoading && <Loader />}
          {error && <ErrorMessage />}
          {images.length > 0 && !isLoading && page !== totalPages && (
            <LoadMoreBtn onClick={handleLoadMoreClick} />
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
