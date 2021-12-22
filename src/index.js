import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { AuthContextProvider } from "./context/auth-context";
import { createStore } from "redux";
import moviesReducer from "./store/movies-store";

const moviesStore = createStore(moviesReducer);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={moviesStore}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </Provider>
  </BrowserRouter>,

  document.getElementById("root")
);
