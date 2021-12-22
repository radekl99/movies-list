import classes from "./LoginPage.module.css";
import { useRef, useContext } from "react";
import { useHistory } from "react-router";
import signInUser from "../../functions/signInUser";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import { useDispatch } from "react-redux";

// Finish error states

const LoginPage = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const router = useHistory();
  const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();

  const submitHandler = async (event) => {
    event.preventDefault();

    const signInUserData = await signInUser(
      emailRef.current.value,
      passwordRef.current.value
    );

    if (!signInUserData.success) {
      alert(signInUserData.errorMessage);
    }

    if (signInUserData.success) {
      const { userId, expiresIn, idToken } = signInUserData;
      authCtx.onLogin(userId, idToken, +expiresIn);
      dispatch({
        type: "setUserIdAndToken",
        payload: { userId, IdToken: idToken },
      });
      router.replace("/list");
    }
  };

  return (
    <section className={classes.formContainer}>
      <h2 className={classes.loginHeader}>Sign In</h2>
      <form className={classes.loginForm}>
        <div className={classes.fieldsContainer}>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            ref={emailRef}
            className={classes.input}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            ref={passwordRef}
            className={classes.input}
          />
        </div>
        <button type="submit" onClick={submitHandler}>
          Login
        </button>
        <Link to="/create-user" className={classes.link}>
          I don't have an account
        </Link>
      </form>
    </section>
  );
};

export default LoginPage;
