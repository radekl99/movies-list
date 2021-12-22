import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <div className={classes.loading}>
      <div className={classes.loadingInner}></div>
    </div>
  );
};

export default LoadingSpinner;
