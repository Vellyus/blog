import { useEffect } from "react";
import { useState } from "react";
import { getData } from "../../service/blogService";
import { dbUrl } from "../../constant";

export function Home() {

  const [blogPosts, setBlogPosts] = useState();

  useEffect(() => {
    getData(dbUrl).then(data => setBlogPosts(data));
  }, [blogPosts]);

  return (
    <>
      <h1>Főoldal</h1>
      {
        blogPosts && Object.keys(blogPosts).map((post, i) => {
          return (
            <article key={ i }>
              <h2>{ blogPosts[post].title }</h2>
              <p>{ blogPosts[post].lead }</p>
              <p>{ blogPosts[post].body }</p>
            </article>
          );
        })
      }
    </>
  );
}