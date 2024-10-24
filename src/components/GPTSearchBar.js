import { useSelector, useDispatch } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import model from "../utils/geminiAI";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";
const GPTSearchBar = () => {
  const searchText = useRef(null);
  const langKey = useSelector((state) => state.config.lang);
  const dispatch = useDispatch();
  //for each movie, search TMDB API

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    let movieArray = [];
    try {
      const geminiQuery =
        "Suggest 5 movie names based on the query: " +
        searchText.current.value +
        ". Provide the results as a comma-separated list.";

      const result = await model.generateContent([geminiQuery]);
      const responseText = await result.response.text();

      // Step 1: Remove unwanted parts (everything before the first movie name)
      const cleanedText = responseText.replace(/Here are.*?:/, "").trim();

      // Step 2: Split the cleaned text by commas to get the movie names
      movieArray = cleanedText
        .split(",")
        .map((movie) => movie.replace(/\*|\n/g, "").trim());
      if (!movieArray.length) {
        throw new Error("No movies found.");
      }
      console.log(movieArray);
    } catch (error) {
      if (error.message.includes("SAFETY")) {
        console.error("Content blocked due to safety concerns.");
        alert(
          "Sorry, the content was blocked for safety reasons. Please try a different query."
        );
      } else {
        console.error("An error occurred:", error);
      }
    }

    //for each movie, search TMDB API
    const promiseArray = movieArray.map((movie) => searchMovieTMDB(movie));

    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);

    dispatch(
      addGptMovieResult({ movieNames: movieArray, movieResults: tmdbResults })
    );
  };

  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={lang[langKey].gptSearchPlaceholder}
          ref={searchText}
        />
        <button
          className="py-2 px-4 col-span-3 m-4 bg-red-700 text-white rounded-lg "
          type="submit"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
