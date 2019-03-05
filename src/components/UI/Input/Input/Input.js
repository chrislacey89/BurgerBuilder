import React from "react";

import classes from "./Input.module.css";

const input = props => {
  let inputElement = null;

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={classes.InputElement}
<<<<<<< HEAD
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
=======
          {...props}
          {...props.elementConfig}
>>>>>>> 8152351da90217411a6c6bcad45eafe36d145ad6
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={classes.InputElement}
<<<<<<< HEAD
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={classes.InputElement}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
=======
          {...props}
          {...props.elementConfig}
        />
      );
>>>>>>> 8152351da90217411a6c6bcad45eafe36d145ad6
      break;
    default:
      inputElement = (
        <input
          className={classes.InputElement}
<<<<<<< HEAD
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
=======
          {...props}
          {...props.elementConfig}
>>>>>>> 8152351da90217411a6c6bcad45eafe36d145ad6
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
