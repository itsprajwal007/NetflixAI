import { useSelector } from "react-redux";
import MovieList from "./MovieList";
const GPTMovieSuggestions = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gpt);
  if (!movieNames || movieNames.length === 0) {
    return <div>No movie suggestions available at the moment.</div>;
  }

  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-80">
      <div>
        {movieNames.map((movieName, index) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={movieResults[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default GPTMovieSuggestions;
