import classes from "./WatchedItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";

const WatchedItem = (props) => {
  const { title, year, id } = props.movieData;
  const dispatch = useDispatch();

  const unwatchMovieHandler = () => {
    dispatch({ type: "unwatch", payload: id });
  };

  return (
    <li className={classes.listItem}>
      <h2>
        {title} <span>({year})</span>
      </h2>
      <div className={classes.buttonsContainer}>
        <button
          title="Unwatch"
          className={classes.unwatchBtn}
          onClick={unwatchMovieHandler}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </li>
  );
};

export default WatchedItem;
