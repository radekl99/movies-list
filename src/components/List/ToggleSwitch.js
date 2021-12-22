import classes from "./ToggleSwitch.module.css";

const ToggleSwitch = (props) => {
  return (
    <input
      className={classes.switch}
      type="checkbox"
      id="watched"
      onChange={props.onChange}
    />
  );
};

export default ToggleSwitch;
