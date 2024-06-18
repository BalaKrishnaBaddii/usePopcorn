import Left from "./Left";
import Right from "./Right";
import { useState } from "react";

export default function Main({
  tempMovieData,
  tempWatchedData,
  average,
  movies,
}) {
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <main className="main">
      <Left isOpen1={isOpen1} setIsOpen1={setIsOpen1} movies={movies} />
      <Right
        isOpen2={isOpen2}
        setIsOpen2={setIsOpen2}
        movies={movies}
        watched={watched}
        average={average}
      />
    </main>
  );
}
