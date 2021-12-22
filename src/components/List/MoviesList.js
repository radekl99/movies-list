import ListItem from "./ListItem";
import WatchedItem from "./WatchedItem";
import WatchNextItem from "./WatchNextItem";
import classes from "./MoviesList.module.css";
import { Fragment, useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import ToggleSwitch from "./ToggleSwitch";
import AuthContext from "../../context/auth-context";
import getData from "../../functions/getData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRandom } from "@fortawesome/free-solid-svg-icons";

const MoviesList = () => {
  const [watched, setWatched] = useState(false);
  const authCtx = useContext(AuthContext);
  const moviesList = useSelector((state) => state.movies);
  const watchedList = useSelector((state) => state.watched);
  const watchNext = useSelector((state) => state.toWatch);
  const dispatch = useDispatch();

  useEffect(() => {
    getData(authCtx.userId);
  }, []);

  const changeWatchedHandler = () => {
    setWatched((prevState) => !prevState);
  };

  const randomMovieHandler = () => {
    const randomNumber = Math.floor(Math.random() * moviesList.length);
    const randomMovie = moviesList[randomNumber];
    dispatch({ type: "watchNext", payload: randomMovie.id });
  };

  return (
    <Fragment>
      {watchNext && (
        <div className={classes.watchNextContainer}>
          <h1 className={classes.watchNextTitle}>Next to watch:</h1>
          <WatchNextItem movie={watchNext} />
        </div>
      )}

      {(watchedList.length > 0 || moviesList.length > 0) && (
        <div className={classes.buttonsContainer}>
          <div className={classes.toggleContainer}>
            <label htmlFor="watched">Watched</label>
            <ToggleSwitch onChange={changeWatchedHandler} />
          </div>
          {moviesList.length > 1 && (
            <div className={classes.randomContainer}>
              <label htmlFor="random">Watch random movie</label>
              <button
                id="random"
                className={classes.randomButton}
                onClick={randomMovieHandler}
              >
                <FontAwesomeIcon icon={faRandom} />
              </button>
            </div>
          )}
        </div>
      )}

      {!watched && moviesList.length > 0 && (
        <ul className={classes.moviesList}>
          {moviesList.map((movie) => (
            <ListItem movieData={movie} key={movie.id} />
          ))}
        </ul>
      )}

      {watched && watchedList.length > 0 && (
        <ul className={classes.moviesList}>
          {watchedList.map((movie) => (
            <WatchedItem movieData={movie} key={movie.id} />
          ))}
        </ul>
      )}

      {watched && watchedList.length === 0 && (
        <h3 className={classes.info}>You have not ticked any movie as watched yet!</h3>
      )}
    </Fragment>
  );
};

export default MoviesList;
