import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

const Button = ({ text, color, onClick, styleName }) => {
  return (
    <button
      style={{ backgroundColor: color }}
      onClick={onClick}
      className={styleName}
    >
      {text}
    </button>
  );
};

Button.defaultProps = {
  backgroundColor: "red",
};

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
