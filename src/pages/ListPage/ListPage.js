import classes from "./ListPage.module.css";
import React, { Fragment } from "react";
import MoviesList from "../../components/List/MoviesList";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ListPage = () => {
  const movies = useSelector((state) => state.movies);
  const watched = useSelector((state) => state.watched);

  let content;

  if (movies.length === 0 && watched.length === 0) {
    content = (
      <Fragment>
        <h3 className={classes.info}>No movies found on your list!</h3>
        <Link to="/search-movie" className={classes.link}>
          Search for some movies!
        </Link>
      </Fragment>
    );
  }

  if (movies.length === 0 && watched.length > 0) {
    content = (
      <Fragment>
        <h3 className={classes.info}>
          You watched all movies you had on list!
        </h3>
        <Link to="/search-movie" className={classes.link}>
          Search for more movies!
        </Link>
      </Fragment>
    );
  }

  return (
    <section className={classes.listPage}>
      <h2 className={classes.title}>
        Your <span>MoviesList</span>
      </h2>
      <MoviesList />
      {content}
    </section>
  );
};

export default React.memo(ListPage);
