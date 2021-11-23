import React from "react";
import PropTypes from "prop-types";

const Button = ({ text, color, onClick }) => {
  return (
    <button
      style={{ backgroundColor: color, color: "white" }}
      onClick={onClick}
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
  color: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
