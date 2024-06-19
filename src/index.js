import react from "react";
import reactDom from "react-dom/client";
import App from "./App";
import StarRatings from "./StarRatings";

const root = reactDom.createRoot(document.getElementById("root"));

root.render(
  <react.StrictMode>
    {/* <App /> */}
    <StarRatings maxRating={10} />
  </react.StrictMode>
);
