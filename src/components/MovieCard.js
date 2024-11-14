import React from "react";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath, onClick }) => {
  const fallbackImage = "https://www.2embed.cc/images/noposter.jpg"; // Fallback image for missing poster
  if (!posterPath) return null; // Handle missing poster better

  return (
    <div className="w-36 md:w-48 pr-4 cursor-pointer" onClick={onClick}>
      <img
        alt="Movie Card"
        src={posterPath ? IMG_CDN_URL + posterPath : fallbackImage}
      />
    </div>
  );
};

export default MovieCard;
