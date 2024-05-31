import { useState, useEffect } from "react";
import getImages from "../api";

export default function useImageSearch(query, page) {
  const [images, setImages] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchImages() {
      if (!query) return;
      setIsLoading(true);
      setError(false);
      try {
        const imageData = await getImages(query, page);
        if (imageData.results.length === 0) {
          setIsEmpty(true);
          return;
        }
        setIsEmpty(false);
        if (page === 1) {
          setTotalPages(imageData.total_pages);
          setImages(imageData.results);
          return;
        }
        setImages((prevImages) => [...prevImages, ...imageData.results]);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchImages();
  }, [query, page]);

  return { images, isEmpty, totalPages, isLoading, error };
}
