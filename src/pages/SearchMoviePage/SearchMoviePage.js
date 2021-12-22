import classes from "./SearchMoviePage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import SearchList from "../../components/Search/SearchList";
import React, { useRef, useState } from "react";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
// import ScrollButton from "../../components/UI/ScrollButton";

const SearchPage = () => {
  const [searchMovies, setSearchMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchInputRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (searchInputRef.current.value.length === 0) return;

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=06c8fcd0ba99f447f36b4b8df8cb06f8&language=en-US&query=${searchInputRef.current.value}&page=1&include_adult=false`
    );

    const movies = await response.json();

    let searchMoviesResponse = [];

    movies.results.forEach((movie) => {
      let year;

      if (movie.release_date) {
        if (movie.release_date.length !== 0) {
          year = new Date(movie.release_date).getFullYear();
        }
      }

      const searchedMovie = {
        id: movie.id,
        title: movie.title,
        year: year,
        overview: movie.overview,
      };
      searchMoviesResponse.push(searchedMovie);
    });

    setIsLoading(false);
    setSearchMovies(searchMoviesResponse);
  };

  return (
    <section className={classes.searchPage}>
      <form className={classes.form} onSubmit={submitHandler}>
        <label htmlFor="searchInput">Search for a movie:</label>
        <div className={classes.inputContainer}>
          <input
            type="text"
            id="searchInput"
            placeholder="Type a title here..."
            ref={searchInputRef}
          />
          <button>
            <FontAwesomeIcon icon={faSearch} className={classes.icon} />
          </button>
        </div>
      </form>
      <div className={classes.logo}>
        <span>Powered by </span>
        <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">
          <img
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
            alt="TMDB logo"
          />
        </a>
      </div>
      {searchMovies.length > 0 && <SearchList movies={searchMovies} />}
      {isLoading && <LoadingSpinner />}
      {/* <ScrollButton /> */}
    </section>
  );
};

export default React.memo(SearchPage);
