import { useEffect, useState } from "react";
import "./index.css";
import Nav from "./NavBar/Nav";
import Search from "./NavBar/Search";
import NumResults from "./NavBar/NumResults";
import Main from "./Main/Main";
import Box from "./Main/Box";
import MovieList from "./Main/ListBox/MovieList";
import MovieSummary from "./Main/SummaryBox/MovieSummary";
import WatchList from "./Main/SummaryBox/WatchList";
import { MovieDetails } from "./MovieDetails";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export const KEY = "1934cdbf";

export default function App() {
  const [query, setQuery] = useState("avengers");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState("");
  const [selectedID, setSelectedid] = useState(null);

  function handleSelectedMovie(id) {
    setSelectedid((selectedID) => (selectedID === id ? null : id));
  }

  function handleCloseMovie() {
    setSelectedid(null);
  }

  function handleSearch(q) {
    setTimeout(setQuery(q), 1500);
    if (q !== query) setSelectedid(null);
  }

  function handleWatched(movie) {
    setWatched((watched) => [
      ...watched,
      movie.imdbID === watched.imdbID
        ? { ...watched, imdbRating: movie.imdbRating }
        : movie,
    ]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setError("");
          setIsloading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok) {
            throw new Error("Something went wrong with fetching movies");
          }

          const data = await res.json();
          console.log(data);
          if (data.Response === "False") {
            throw new Error("Movie not Found");
          }
          setMovies(data.Search);
        } catch (err) {
          console.log(err.message);
          if (err.message !== "AbortError") {
            setError(err.message);
          }
          setError("");
        } finally {
          setIsloading(false);
        }
      }

      if (query.length < 3) {
        setError("");
        setMovies([]);
        return;
      }
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return (
    <>
      <Nav>
        <Search query={query} onSearch={handleSearch} />
        <NumResults movies={movies} />
      </Nav>
      <Main>
        <Box>
          {isloading && <Loader />}
          {!error && !isloading && (
            <MovieList
              movies={movies}
              key={movies.imdbID}
              onSelectMovie={handleSelectedMovie}
            />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedID ? (
            <MovieDetails
              selectedID={selectedID}
              handleClose={handleCloseMovie}
              onAddwatched={handleWatched}
              watched={watched}
            />
          ) : (
            <>
              <MovieSummary watched={watched} average={average} />
              <WatchList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>📛 </span>
      {message}
    </p>
  );
}

export function Loader() {
  return <p className="loader">Loading...</p>;
}
