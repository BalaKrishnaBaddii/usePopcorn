export default function Search({ setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
