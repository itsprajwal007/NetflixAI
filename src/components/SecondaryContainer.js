import { useState } from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import MovieDetail from "./MovieDetail"; // Import the MovieDetail modal

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const handleMovieClick = (movieId) => {
    setSelectedMovieId(movieId); // Set selected movie ID
    setIsModalOpen(true); // Open the modal when a movie is clicked
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedMovieId(null); // Reset the selected movie
  };

  return (
    <>
      <div className="bg-black">
        <div className="mt-0 md:-mt-52 pl-4 md:pl-12 relative z-20">
          <MovieList
            title={"Now Playing"}
            movies={movies.nowPlayingMovies}
            onMovieClick={handleMovieClick} // Pass the movie click handler
          />
          <MovieList
            title={"Popular"}
            movies={movies.popularMovies}
            onMovieClick={handleMovieClick} // Pass the movie click handler
          />
          <MovieList
            title={"Top Rated"}
            movies={movies.topRatedMovies}
            onMovieClick={handleMovieClick} // Pass the movie click handler
          />
          <MovieList
            title={"Upcoming Movies"}
            movies={movies.nowPlayingMovies}
            onMovieClick={handleMovieClick} // Pass the movie click handler
          />
        </div>
      </div>

      {/* Conditionally render MovieDetail Modal */}
      {isModalOpen && (
        <MovieDetail
          movieId={selectedMovieId} // Pass the selected movie ID
          onClose={handleCloseModal} // Pass the close function
        />
      )}
    </>
  );
};

export default SecondaryContainer;
