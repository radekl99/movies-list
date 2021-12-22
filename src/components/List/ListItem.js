import classes from "./ListItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faGlasses,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";

const ListItem = (props) => {
  const { title, year, id } = props.movieData;
  const watchNext = useSelector((state) => state.toWatch);
  const dispatch = useDispatch();

  const removeMovieHandler = () => {
    dispatch({ type: "removeMovie", payload: id });

    if (watchNext) {
      if (watchNext.id === id) {
        dispatch({ type: "removeWatchNext" });
      }
    }
  };

  const watchedMovieHandler = () => {
    dispatch({ type: "watched", payload: id });

    if (watchNext) {
      if (watchNext.id === id) {
        dispatch({ type: "removeWatchNext" });
      }
    }
  };

  const watchNextHandler = () => {
    dispatch({ type: "watchNext", payload: id });
  };

  return (
    <li className={classes.listItem}>
      <h2>
        {title} <span>({year})</span>
      </h2>
      <div className={classes.buttonsContainer}>
        <button
          title="Watch next"
          className={classes.watchNextBtn}
          onClick={watchNextHandler}
        >
          <FontAwesomeIcon icon={faGlasses} />
        </button>
        <button
          title="Remove"
          className={classes.deleteBtn}
          onClick={removeMovieHandler}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
        <button
          title="Watched"
          className={classes.watchedBtn}
          onClick={watchedMovieHandler}
        >
          <FontAwesomeIcon icon={faCheck} />
        </button>
      </div>
    </li>
  );
};

export default ListItem;
