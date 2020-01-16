import React from "react";
import Option from './Option'


const Select = ({ id, name, species, classLabel, classSelect, onChange,children}) => {
  return (
    <div>
      <label htmlFor={id} className={classLabel}>
        {children}
        <select
          id={id}
          className={classSelect}
          name={name}
          onChange={onChange}
        >
          <Option />
          {species.map(specie => (
            <Option value={specie} />
          ))}
        </select>
      </label>
    </div>
  );
};

export default Select;
