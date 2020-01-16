import React from "react";

const Button = ({buttonClass,iClass,name, ...props}) => {
  return (
    <>
      {
        <button type="button" className={buttonClass} {...props}>
          {iClass && <i className={iClass} aria-hidden="true" />} {name}
        </button>
      }
    </>
  );
};

export default Button;
