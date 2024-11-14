import React, { useEffect, useState } from "react";
import { Star } from "lucide-react"; // Make sure to include this for the rating icon
import { fetchMovieDetails } from "../utils/tmdbApi";
import { fetchMovieCredits } from "../utils/tmdbApi";
import { fetchMovieVideos } from "../utils/tmdbApi";

const MovieDetail = ({ movie, setSelectedMovie }) => {
  const [details, setDetails] = useState(null);
  const [credits, setCredits] = useState(null);
  const [videoKey, setVideoKey] = useState(null);

  // Fetching movie details, credits, and video
  useEffect(() => {
    const getData = async () => {
      const movieDetails = await fetchMovieDetails(movie.id);
      setDetails(movieDetails);

      const movieCredits = await fetchMovieCredits(movie.id);
      setCredits(movieCredits);

      const movieVideos = await fetchMovieVideos(movie.id);
      setVideoKey(movieVideos);
    };

    getData();
  }, [movie.id]);

  if (!details || !credits) {
    return <div>Loading...</div>; // Add loading state while fetching data
  }

  const {
    original_title,
    overview,
    vote_average,
    formattedRuntime,
    release_date,
  } = details;
  const { actors, director } = credits;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex justify-center items-center">
      <div className="bg-black text-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">{original_title}</h2>
          <button
            onClick={() => setSelectedMovie(null)} // Close the modal by setting selectedMovie to null
            className="text-red-500 font-bold text-lg"
          >
            X
          </button>
        </div>
        {videoKey && (
          <div className="aspect-w-16 aspect-h-9 mb-8">
            <iframe
              src={`https://www.youtube.com/embed/${videoKey}`}
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full"
              title={`${original_title} trailer`}
            />
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>{release_date}</span>
            <span>•</span>
            <span>{formattedRuntime}</span>
            <span>•</span>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              <span>{vote_average}/10</span>
            </div>
          </div>
          <p className="text-gray-300">{overview}</p>

          <div>
            <h2 className="text-xl font-semibold mb-2">Cast</h2>
            <div className="flex flex-wrap gap-2">
              {actors?.map((actor, index) => (
                <span
                  key={index}
                  className="bg-gray-600 px-2 py-1 rounded-full text-sm"
                >
                  {actor}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Director</h2>
            <div className="flex flex-wrap gap-2">
              {director?.map((dir, index) => (
                <span
                  key={index}
                  className="bg-gray-600 px-2 py-1 rounded-full text-sm"
                >
                  {dir}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
