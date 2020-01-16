import React from "react";


const Radio = ({ id, checked, changeFn, className, children }) => (
  <div>
    <input
      id={id}
      type="radio"
      checked={checked}
      className={className}
      onChange={changeFn}
    />
    <label className={className}>{children}</label>
  </div>
);

export default Radio;
