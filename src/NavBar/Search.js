import { useEffect } from "react";

export default function Search({ onSearch }) {
  useEffect(() => {
    const element = document.querySelector(".search");
    element.focus();
  }, []);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}
