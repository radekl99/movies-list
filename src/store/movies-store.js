import setMovies from "../functions/setMovies";
import setWatched from "../functions/setWatched";
import setWatchNext from "../functions/setWatchNext";

const initialState = {
  movies: [],
  watched: [],
  toWatch: null,
  userId: "",
  IdToken: "",
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "addMovie": {
      const newMoviesList = state.movies.concat(action.payload);
      setMovies(state.userId, newMoviesList, state.IdToken);
      return {
        ...state,
        movies: newMoviesList,
      };
    }
    case "removeMovie": {
      const newMoviesList = state.movies.filter(
        (movie) => movie.id !== action.payload
      );
      setMovies(state.userId, newMoviesList, state.IdToken);
      return {
        ...state,
        movies: newMoviesList,
      };
    }
    case "watchNext": {
      const newToWatch = state.movies.find(
        (movie) => movie.id === action.payload
      );
      setWatchNext(state.userId, newToWatch, state.IdToken);
      return { ...state, toWatch: newToWatch };
    }
    case "removeWatchNext": {
      setWatchNext(state.userId, null, state.IdToken);
      return { ...state, toWatch: null };
    }
    case "watched": {
      const watched = state.movies.find((movie) => movie.id === action.payload);
      const newMoviesList = state.movies.filter(
        (movie) => movie.id !== action.payload
      );
      const newWatchedList = state.watched.concat(watched);
      setMovies(state.userId, newMoviesList, state.IdToken);
      setWatched(state.userId, newWatchedList, state.IdToken);
      return { ...state, movies: newMoviesList, watched: newWatchedList };
    }
    case "unwatch": {
      const unwatched = state.watched.find(
        (movie) => movie.id === action.payload
      );
      const newWatchedList = state.watched.filter(
        (movie) => movie.id !== action.payload
      );
      const newMoviesList = state.movies.concat(unwatched);
      setMovies(state.userId, newMoviesList, state.IdToken);
      setWatched(state.userId, newWatchedList, state.IdToken);
      return { ...state, movies: newMoviesList, watched: newWatchedList };
    }
    case "setUserIdAndToken": {
      const newUserId = action.payload.userId;
      const newIdToken = action.payload.IdToken;
      return { ...state, userId: newUserId, IdToken: newIdToken };
    }
    case "setData": {
      const newMoviesList = action.payload.movies;
      const newWatchedList = action.payload.watched;
      const newToWatch = action.payload.toWatch;
      return {
        ...state,
        movies: newMoviesList,
        watched: newWatchedList,
        toWatch: newToWatch,
      };
    }
    default: {
      return state;
    }
  }
};

export default moviesReducer;
