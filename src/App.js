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

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "1934cdbf";

export default function App() {
  const [query, setQuery] = useState("avengers");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState("");
  const [selectedID, setSelectedid] = useState(null);

  function handleSelectedMovie(id) {
    setSelectedid((selectedID) => (selectedID === id ? null : id));
  }

  function handClose() {
    setSelectedid(null);
  }

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setError("");
          setIsloading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
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
          setError(err.message);
        } finally {
          setIsloading(false);
        }
      }

      if (!query.length) {
        setError("");
        setMovies([]);
        return;
      }
      fetchMovies();
    },
    [query]
  );

  return (
    <>
      <Nav>
        <Search query={query} setQuery={setQuery} />
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
            <MovieDetails selectedID={selectedID} handleClose={handClose} />
          ) : (
            <>
              <MovieSummary watched={watched} average={average} />
              <WatchList watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function MovieDetails({ selectedID, handleClose }) {
  return (
    <div className="details">
      <button onClick={handleClose}>⬅️</button>
      <p>{selectedID}</p>
    </div>
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
function Loader() {
  return <p className="loader">loading...</p>;
}
