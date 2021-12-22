import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import classes from "./WatchNextItem.module.css";
import { useDispatch } from "react-redux";

const WatchNextItem = (props) => {
  const { title, year, id } = props.movie;
  const dispatch = useDispatch();

  const unwatchMovieHandler = () => {
    dispatch({ type: "removeWatchNext", payload: id });
  };
  const watchedMovieHandler = () => {
    dispatch({ type: "removeWatchNext" });
    dispatch({ type: "watched", payload: id });
  };

  return (
    <Fragment>
      <div className={classes.watchNextItem}>
        <button
          title="Watch later"
          className={`${classes.unwatchBtn} ${classes.button}`}
          onClick={unwatchMovieHandler}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2>
          {title} <span>({year})</span>
        </h2>

        <button
          title="Watched"
          className={`${classes.watchedBtn} ${classes.button}`}
          onClick={watchedMovieHandler}
        >
          <FontAwesomeIcon icon={faCheck} />
        </button>
      </div>
    </Fragment>
  );
};

export default WatchNextItem;
