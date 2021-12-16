import React from "react";
import classnames from "classnames";
import "./Button.css";

const Button = ({ onClick, className, children }) => {
  return (
    <button
      className={classnames("button", className)}
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
};

export default Button;
