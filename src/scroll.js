export default function handleLoadMoreScroll(el) {
  const top = el.getBoundingClientRect().height * 2;
  window.scrollBy({
    top,
    behavior: "smooth",
  });
}
