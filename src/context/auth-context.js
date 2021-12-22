import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import getData from "../functions/getData";

const AuthContext = React.createContext({
  isLoggedIn: false,
  userId: "",
  idToken: "",
  onLogout: () => {},
  onLogin: (userId, token, tokenExpiresIn) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [idToken, setIdToken] = useState("");
  const dispatch = useDispatch();

  const getUserDatabaseData = async (userId, idToken) => {
    const { movies, watched, toWatch } = await getData(userId, idToken);

    dispatch({ type: "setData", payload: { movies, watched, toWatch } });
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId");
    localStorage.removeItem("idToken");
    localStorage.removeItem("tokenExpirationTime");
    setIsLoggedIn(false);
    setUserId("");
    setIdToken("");
  };

  const autoLogout = (time) => {
    setTimeout(logoutHandler, time);
  };

  const loginHandler = async (userId, token, tokenExpiresIn) => {
    localStorage.setItem("isLoggedIn", "1");
    localStorage.setItem("userId", userId);
    localStorage.setItem("idToken", token);

    const tokenExpirationTime = new Date(
      new Date().getTime() + new Date(tokenExpiresIn * 1000).getTime()
    ).getTime();

    localStorage.setItem("tokenExpirationTime", `${tokenExpirationTime}`);
    autoLogout(tokenExpiresIn * 1000);

    setIsLoggedIn(true);
    setUserId(userId);
    setIdToken(token);

    getUserDatabaseData(userId, token);
  };

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true);
      setUserId(localStorage.getItem("userId"));
      setIdToken(localStorage.getItem("idToken"));
      dispatch({
        type: "setUserIdAndToken",
        payload: {
          userId: localStorage.getItem("userId"),
          IdToken: localStorage.getItem("idToken"),
        },
      });

      const tokenExpirationTime = localStorage.getItem("tokenExpirationTime");
      const tokenExpiresIn = new Date(
        new Date(+tokenExpirationTime).getTime() - new Date().getTime()
      ).getTime();

      getUserDatabaseData(
        localStorage.getItem("userId"),
        localStorage.getItem("idToken")
      );
      autoLogout(tokenExpiresIn);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        idToken: idToken,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
