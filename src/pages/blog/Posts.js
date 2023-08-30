import React from 'react';

export const Posts = ({ posts, handleShowArticle, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <ul>
      { Object.keys(posts).map(post => (
        <li key={ posts[post].id }>
          <article key={ post }>
            { posts[post].imageURL !== "No image uploaded" ? <img className="smallImg" src={ `${ posts[post].imageURL }` }></img> : null }
            <h2>{ posts[post].title }</h2>
            <p>{ posts[post].lead }</p>
            <button onClick={ () => handleShowArticle(post) }>Teljes bejegyzés</button>
          </article>
        </li>
      )) }
    </ul>
  );
};
