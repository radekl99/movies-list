import classes from "./CreateUserPage.module.css";
import { useRef, useContext } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import createUser from "../../functions/createUser";
import AuthContext from "../../context/auth-context";
import { useDispatch } from "react-redux";

// Finish error states

const CreateUserPage = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const router = useHistory();
  const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();

  const submitHandler = async (event) => {
    event.preventDefault();

    const createUserData = await createUser(
      emailRef.current.value,
      passwordRef.current.value
    );

    if (!createUserData.success) {
      alert(createUserData.errorMessage);
    }

    if (createUserData.success) {
      const { userId, expiresIn, idToken } = createUserData;
      authCtx.onLogin(userId, idToken, +expiresIn);
      dispatch({ type: "setUserId", payload: userId });
      router.replace("/list");
    }
  };

  return (
    <section className={classes.formContainer}>
      <h2 className={classes.loginHeader}>Sign Up</h2>
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
          Register
        </button>
        <Link to="/login" className={classes.link}>
          I have an account
        </Link>
      </form>
    </section>
  );
};

export default CreateUserPage;
