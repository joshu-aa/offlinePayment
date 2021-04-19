import React from "react";

export const Pagination = ({ pageSize, total, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(total / pageSize); i++) {
    pageNumbers.push(i);
  }
  if (pageNumbers.length > 0) {
    return (
      <nav>
        <ul className="pagination">
          <li
            className={
              currentPage === 1 ? "page-item disabled" : "page-item clickable"
            }
          >
            <a className="page-link" onClick={() => paginate(currentPage - 1)}>
              Prev
            </a>
          </li>
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={
                number === currentPage
                  ? "page-item active clickable"
                  : "page-item clickable"
              }
            >
              <a onClick={() => paginate(number)} className="page-link">
                {number}
              </a>
            </li>
          ))}
          <li
            className={
              currentPage === pageNumbers.length
                ? "page-item disabled"
                : "page-item clickable"
            }
          >
            <a className="page-link" onClick={() => paginate(currentPage + 1)}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    );
  } else {
    return <div></div>;
  }
};

export default Pagination;
