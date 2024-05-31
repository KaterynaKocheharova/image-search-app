import { useState } from "react";

export default function useLightbox(images) {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const slides = images.map(({ urls: { regular } }) => ({ src: regular }));

  const open = (index) => {
    setIndex(index);
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  return { isOpen, index, slides, open, close, setIndex };
}
