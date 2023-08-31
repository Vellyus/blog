import React from 'react';

export const Pagination = ({ postsPerPage, totalPosts, paginate }) => {

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
              onClick={ () => paginate(number) } // add onClick to set the current page number in a state, use that to style the active link -> className: activePageLink or simple pageLink
              href='#' className='pageLink'
            >{ number }</a>
          </li>
        )
        ) }
      </ul>
    </nav>
  );
};
