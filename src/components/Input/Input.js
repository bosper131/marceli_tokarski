import React from "react";
import "bootstrap/dist/css/bootstrap.css";
const Input = ({
  inputClass,
  id,
  type,
  placeholder,
  classLabel,
  name,
  onSubmit,
  onChange,
  children,
  ...props
}) => (
  <div>
    <label htmlFor={id} className={classLabel}>
      {children}
    </label>
    <input
      type={type}
      className={inputClass}
      id={id}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      {...props}
    />
  </div>
);

export default Input;
