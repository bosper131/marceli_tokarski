import React from "react";
import Button from '../Button/Button'

const ListItem = ({id,name,species,gender,homeworld}) => {

  return (
    <tr>
      <th scope="row">{id}</th>
      <td>{name}</td>
      <td>{species}</td>
      <td>{gender}</td>
      <td>{homeworld}</td>
      <td>
        <div
          className="btn-group btn-group-sm"
          role="group"
          aria-label="Actions"
        >
          <Button
            buttonClass="btn btn-secondary"
            iClass="fa fa-pencil"
            name="Edit"
          />
          <Button
            buttonClass="btn btn-danger"
            iClass="fa fa-trash-o"
            name="Remove"
          />
        </div>
      </td>
    </tr>
  );
};

export default ListItem;