import MovieSummary from "./MovieSummary";

export default function Right({ isOpen2, setIsOpen2, watched, average }) {
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && <MovieSummary watched={watched} average={average} />}
    </div>
  );
}
