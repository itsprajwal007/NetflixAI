import { BG_URL } from "../utils/constants";
import GPTMovieSuggestions from "./GPTMovieSuggestions";
import GPTSearchBar from "./GPTSearchBar";

const GPTSearch = () => {
  return (
    <div>
      <div className="fixed -z-10">
        <img src={BG_URL} alt="logo" />
      </div>
      <GPTSearchBar />
      <GPTMovieSuggestions />
    </div>
  );
};

export default GPTSearch;
