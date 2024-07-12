import { useEffect, useState } from "react";
import StarRatings from "./StarRatings";
import { KEY, Loader } from "./App";

export default function MovieDetails({
  selectedID,
  handleClose,
  onAddwatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isloading, setIsloading] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedID);
  // const [avgRating, setAvgrating] = useState(0);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedID
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  // /* eslint-disable */
  // if (imdbRating > 7) [isTop, setIsTop] = useState(true);
  // if (imdbRating > 7) return <p>its done</p>;

  function handleOnrating(rating) {
    setUserRating(rating);
  }

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedID,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };

    onAddwatched(newWatchedMovie);
    handleClose();
    // setAvgrating((userRating + Number(imdbRating)) / 2);
  }

  useEffect(
    function () {
      function callback(e) {
        if (e.code === "Escape") {
          handleClose();
        }
      }
      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [handleClose]
  );

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsloading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedID}`
        );
        const data = await res.json();
        setMovie(data);
        setIsloading(false);
        return function () {
          setMovie({});
        };
      }
      getMovieDetails();
    },
    [selectedID]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;
      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  return (
    <div className="details">
      {isloading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={handleClose}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h3>{title}</h3>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                ⭐<span>{imdbRating} IMDB rating</span>
              </p>
            </div>
          </header>
          {/* <p>rating: {avgRating}</p> */}
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRatings
                    maxRating={10}
                    size={20}
                    defaultRating={0}
                    onRating={handleOnrating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>You have rated this Movie {watchedUserRating}⭐</p>
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
