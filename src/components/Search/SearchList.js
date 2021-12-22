import SearchItem from "./SearchItem";
import classes from "./SearchList.module.css";

const SearchList = (props) => {
  return (
    <ul className={classes.searchList}>
      {props.movies.map((movie) => (
        <SearchItem movieData={movie} key={movie.id} />
      ))}
    </ul>
  );
};

export default SearchList;
