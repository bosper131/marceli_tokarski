import React from 'react';
import Button from '../Button/Button';
const Pagination = (props) => {
    const pageLinks = [];
    for(let i = 1; i<= props.pages +1 ; i++ ){
        let active = props.currentPage === i ? "active" : "";
        pageLinks.push(
          <li
            className={`page-item ${active}`}
            key={i}
            onClick={() => props.nextPage(i)}
          >
            <Button type="button" className="page-link" name={i}/>
          </li>
        );
    }

    return (
      <nav aria-label="Data grid navigation">
        <ul className="pagination justify-content-start">
          {props.currentPage === 1 ? (
            <li className="page-item disabled">
              <Button
                type="button"
                className="page-link"
                name="Previous"
                tabIndex="-1"
              />
            </li>
          ) : (
            <li
              className="page-item"
              onClick={() => props.nextPage(props.currentPage - 1)}
            >
              <Button type="button" className="page-link" name="Previous" />
            </li>
          )}
          {pageLinks}
          {props.currentPage === props.pages + 1 ? (
            <li className="page-item disabled">
              <Button buttonClass="page-link" name="Next" />
            </li>
          ) : (
            <li
              className="page-item"
              onClick={() => props.nextPage(props.currentPage + 1)}
            >
              <Button buttonClass="page-link" name="Next" />
            </li>
          )}
        </ul>
      </nav>
    );
}
export default Pagination;