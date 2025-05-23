import React from 'react'

export const Posts = ({ posts, handleShowArticle, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>
  }

  return (
    <ul className='posts-grid'>
      {posts.map(post => (
        < li key={post.id} >
          <article key={post.id}>
            {post.imageURL !== "No image uploaded" ? <img className="smallImg" src={`${ post.imageURL }`}></img> : null}
            <h2>{post.title}</h2>
            <p>{post.lead}</p>
            <button className='readMoreButton' onClick={() => handleShowArticle(post.id)}>Read more</button>
          </article>
        </li>
      ))
      }
    </ul>
  )
}
