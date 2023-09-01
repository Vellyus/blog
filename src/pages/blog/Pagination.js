import React, { useState } from 'react';

export const Pagination = ({ postsPerPage, totalPosts, paginate }) => {

  const [activePage, setActivePage] = useState(1);
  const pageNumbers = [];


  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul>
        { pageNumbers.map(number => (
          <li key={ number } className='pageItem'>
            <a
              onClick={ () => {
                paginate(number);
                setActivePage(number);
              } }
              href='#' className={ activePage === number ? "pageLink-active" : "pageLink" }
            >{ number }</a>
          </li>
        )
        ) }
      </ul>
    </nav>
  );
};
