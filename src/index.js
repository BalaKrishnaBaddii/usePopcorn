import react, { useState } from "react";
import reactDom from "react-dom/client";
import App from "./App";
import StarRatings from "./StarRatings";

const root = reactDom.createRoot(document.getElementById("root"));

root.render(
  <react.StrictMode>
    <App />
    <Rating />

    {/* <StarRatings
      maxRating={5}
      messages={["Terriable", "Bad", "Okay", "Good", "Amazing"]}
      defaultRating={1}
    /> */}
    {/* <StarRatings maxRating={5} color="red" size={30} defaultRating={3} /> */}
  </react.StrictMode>
);

function Rating() {
  const [movieRating, SetMovieRating] = useState(0);
  console.log(movieRating);
  return (
    <>
      <StarRatings
        size={48}
        color="green"
        maxRating={5}
        onRating={SetMovieRating}
        messages={["Flop", "Bad", "Average", "Good", "Very Good"]}
      />
      <p>This Movie has reated {movieRating} Rating</p>
    </>
  );
}
