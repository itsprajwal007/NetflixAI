import React from "react";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  const fallbackImage = "https://www.2embed.cc/images/noposter.jpg"; //fallback image for missing poster
  if (!posterPath) return null; //better way to handle poster not found
  return (
    <div className="w-48 pr-4">
      <img
        alt="Movie Card"
        src={posterPath ? IMG_CDN_URL + posterPath : fallbackImage}
      />
    </div>
  );
};

export default MovieCard;
