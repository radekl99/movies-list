import classes from "./HomePage.module.css";
import React from "react";

const HomePage = () => {
  return (
    <section className={classes.home}>
      <div className={classes.title}>
        <h1>
          Make your own <span>MoviesList</span> and choose what to watch next!
        </h1>
      </div>
      <div className={classes.image}>
        <img
          src="https://images.pexels.com/photos/4009036/pexels-photo-4009036.jpeg?cs=srgb&dl=pexels-cottonbro-4009036.jpg&fm=jpg"
          alt="Happy couple sitting on couch and watching TV."
        ></img>
      </div>
    </section>
  );
};

export default HomePage;
