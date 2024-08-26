import { useEffect, useRef } from "react";

export default function Search({ onSearch }) {
  const inputElement = useRef(null);

  useEffect(
    function () {
      function callback(e) {
        if (document.activeElement === inputElement.current) return;
        if (e.code === "Enter") {
          inputElement.current.focus();
          onSearch("");
        }
      }

      document.addEventListener("keydown", callback);
      return () => document.addEventListener("keydown", callback);
    },
    [onSearch]
  );

  // useEffect(() => {
  //   const element = document.querySelector(".search");
  //   element.focus();
  // }, []);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      onChange={(e) => onSearch(e.target.value)}
      ref={inputElement}
    />
  );
}
