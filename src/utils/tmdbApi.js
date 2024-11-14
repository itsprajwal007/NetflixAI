import { API_OPTIONS } from "../utils/constants";

// Utility function to format runtime into "Xh Ymin"
const formatRuntime = (runtime) => {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}h ${minutes}min`;
};

// Fetching movie details (title, overview, rating, runtime, release date)
export const fetchMovieDetails = async (movieId) => {
  try {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
      API_OPTIONS
    );
    const json = await data.json();

    const { original_title, overview, vote_average, runtime, release_date } =
      json;

    const formattedRuntime = formatRuntime(runtime);

    return {
      original_title,
      overview,
      vote_average,
      formattedRuntime,
      release_date,
    };
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null; // Return null if there's an error
  }
};

// Fetching movie credits (actors and director)
export const fetchMovieCredits = async (movieId) => {
  try {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits`,
      API_OPTIONS
    );
    const json = await data.json();

    const actors = json.cast
      .filter((actor) => actor.known_for_department === "Acting")
      .map((actor) => actor.name)
      .slice(0, 3); // Take first 3 actors
    const director = json.crew
      .filter((crewMember) => crewMember.job === "Director")
      .map((director) => director.name)
      .slice(0, 3); // Take first 3 directors

    return { actors, director };
  } catch (error) {
    console.error("Error fetching movie credits:", error);
    return { actors: [], director: [] }; // Return empty arrays on error
  }
};

// Fetching movie videos (e.g., trailer)
export const fetchMovieVideos = async (movieId) => {
  try {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos`,
      API_OPTIONS
    );
    const json = await data.json();

    // Find the first trailer
    const trailer = json.results.find((video) => video.type === "Trailer");
    const trailerKey = trailer ? trailer.key : null;

    return trailerKey; // Return only the trailer key (or null if no trailer)
  } catch (error) {
    console.error("Error fetching movie videos:", error);
    return null; // Return null if there's an error
  }
};
