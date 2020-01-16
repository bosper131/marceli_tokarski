import React from "react";
import ListItem from "./ListItem";


const List =({characters}) => {
    const headers = ["Id", "Name", "Species", "Gender", "Homeworld", "Actions"];
    return (
      <>
        <thead className="thead-light">
          <tr>
            {headers.map(header => (
              <th key={header} scope="col">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {characters.map(character => (
            <ListItem key={character.id} {...character} />
          ))}
        </tbody>
      </>
    );
  }
export default List;
