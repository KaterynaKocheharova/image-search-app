import css from "./Container.module.css";
import clsx from "clsx";

export default function Container({ children, notHeader }) {
  return (
    <div
      className={clsx(css.container, { [css["main-container"]]: notHeader })}
    >
      {children}
    </div>
  );
}
