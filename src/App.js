import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ListPage from "./pages/ListPage/ListPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SearchMoviePage from "./pages/SearchMoviePage/SearchMoviePage";

import Header from "./components/UI/Header";
import { Fragment } from "react";
import CreateUserPage from "./pages/CreateUserPage/CreateUserPage";

import { useContext } from "react";
import AuthContext from "./context/auth-context";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Fragment>
      <Header />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <Route path="/create-user" exact>
          <CreateUserPage />
        </Route>
        {authCtx.isLoggedIn && (
          <Route path="/search-movie" exact>
            <SearchMoviePage />
          </Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path="/list" exact>
            <ListPage />
          </Route>
        )}
        <Route path="*">
          <HomePage />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
