import toast, { Toaster } from "react-hot-toast";
import Container from "../Container/Container";
import css from "./SearchBar.module.css";

let toastId;

const notify = () => {
  toastId = toast(<div onClick={closeToast}>Fields should not be empty</div>, {
    duration: 2000,
    position: "top-right",
    icon: "❗",
  });
};

function closeToast() {
  toast.remove(toastId);
}

export default function SearchBar({ onSubmit }) {
  function handleSubmit(event) {
    event.preventDefault();
    const searchValue =
      event.currentTarget.elements.searchTarget.value.trim("");
    if (searchValue === "") {
      notify();
    } else {
      onSubmit(searchValue);
      event.currentTarget.reset();
    }
  }

  return (
    <header className={css.header} onClick={closeToast}>
      <Container>
        <form className={css.form} onSubmit={handleSubmit}>
          <input
            className={css.input}
            name="searchTarget"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button className={css.button} type="submit">
            Search
          </button>
          <Toaster
            toastOptions={{
              style: {
                color: " #403234",
                backgroundColor: "#e2c2b3",
              },
            }}
          />
        </form>
      </Container>
    </header>
  );
}
