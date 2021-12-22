import React, { Fragment, useContext, useState } from "react";
import Backdrop from "./Backdrop";
import classes from "./Header.module.css";
import AuthContext from "../../context/auth-context";
import { useHistory } from "react-router";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Header(props) {
  const [showNavigationLinks, setShowNavigationLinks] = useState(false);
  const authCtx = useContext(AuthContext);
  const router = useHistory();

  const hideNavigationLinksHandler = () => {
    setShowNavigationLinks(false);
  };

  const logoutHandler = () => {
    hideNavigationLinksHandler();
    authCtx.onLogout();
    router.replace("/");
  };

  const showNavigationLinksHandler = () => {
    setShowNavigationLinks(true);
  };

  const navigationLinksClasses = `${classes.navigationLinks} ${
    showNavigationLinks && classes.showNavigationLinks
  }`;

  window.addEventListener("resize", () => {
    if (window.innerWidth > 769) {
      setShowNavigationLinks(false);
    }
  });

  return (
    <Fragment>
      <header className={classes.header}>
        <Link to="/">
          <h1>MoviesList</h1>
        </Link>
        <nav>
          <ul className={navigationLinksClasses}>
            {authCtx.isLoggedIn && (
              <li>
                <NavLink
                  to="/list"
                  className={classes.link}
                  onClick={hideNavigationLinksHandler}
                  activeClassName={classes.active}
                  exact
                >
                  <p>My Movies</p>
                </NavLink>
              </li>
            )}
            {authCtx.isLoggedIn && (
              <li>
                <NavLink
                  to="/search-movie"
                  className={classes.link}
                  onClick={hideNavigationLinksHandler}
                  activeClassName={classes.active}
                  exact
                >
                  <p>Search Movies</p>
                </NavLink>
              </li>
            )}
            {authCtx.isLoggedIn && (
              <li>
                <button
                  onClick={logoutHandler}
                  className={classes.logoutButton}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
          {!authCtx.isLoggedIn && (
            <Link to="/login">
              <button className={classes.loginButton}>Login</button>
            </Link>
          )}
        </nav>
        {authCtx.isLoggedIn && (
          <button
            className={classes.showLinksButton}
            onClick={showNavigationLinksHandler}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        )}
      </header>
      {showNavigationLinks && <Backdrop onClick={hideNavigationLinksHandler} />}
      {props.children}
    </Fragment>
  );
}

export default Header;
