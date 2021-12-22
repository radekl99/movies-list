import classes from "./SearchItem.module.css";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import AuthContext from "../../context/auth-context";

const SearchItem = (props) => {
  const { title, year, overview, id } = props.movieData;

  const movies = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  const isOnList = movies.some((movie) => movie.id === id);

  const addButtonChangeHandler = () => {
    if (!isOnList) {
      dispatch({ type: "addMovie", payload: props.movieData });
    }
    if (isOnList) {
      dispatch({ type: "removeMovie", payload: id });
    }
  };

  return (
    <li className={classes.searchItem}>
      <div className={classes.titleContainer}>
        <h2>
          {title} {year && <span>({year})</span>}
        </h2>
        <label className={classes.addButton}>
          <input
            type="checkbox"
            onChange={addButtonChangeHandler}
            checked={isOnList}
          />
          <FontAwesomeIcon icon={faPlus} className={classes.addIcon} />
        </label>
      </div>
      <p>{overview}</p>
    </li>
  );
};

export default SearchItem;
