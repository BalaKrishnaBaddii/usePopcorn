import react, { useState } from "react";
import reactDom from "react-dom/client";
import App from "./App";
import StarRatings from "./StarRatings";
import TextBox from "./TextExpander";

function Rating() {
  const [movieRating, SetMovieRating] = useState(0);
  console.log(movieRating);
  return (
    <>
      <StarRatings
        maxRating={5}
        size={50}
        color={"seagreen"}
        onRating={SetMovieRating}
        messages={["Flop", "Bad", "Average", "Good", "Very Good"]}
        defaultRating={2}
      />
      <p>This Movie has reated {movieRating} Rating</p>
    </>
  );
}
const root = reactDom.createRoot(document.getElementById("root"));

root.render(
  <react.StrictMode>
    {/* <App />
    <Rating /> */}
    <TextBox />
  </react.StrictMode>
);
