export default function Search({ onSearch }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}
