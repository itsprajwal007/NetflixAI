import React, { useState } from "react";
import MovieCard from "./MovieCard";
import MovieDetail from "./MovieDetail";

const MovieList = ({ title, movies }) => {
  const [selectedMovie, setSelectedMovie] = useState(null); // State for selected movie

  // Handler to set selected movie when a card is clicked
  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div className="px-6">
      <h1 className="text-lg md:text-3xl py-4 text-white">{title}</h1>
      <div className="flex overflow-x-scroll ">
        <div className="flex ">
          {movies?.length > 0 ? (
            movies?.map((movie) => (
              <MovieCard
                key={movie.id}
                posterPath={movie.poster_path}
                onClick={() => handleMovieClick(movie)} // Pass the click handler here
              />
            ))
          ) : (
            <div className="text-white">No movies to display</div>
          )}
        </div>
      </div>

      {/* MovieDetail Popup */}
      {selectedMovie && (
        <MovieDetail
          movie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
        />
      )}
    </div>
  );
};

export default MovieList;
