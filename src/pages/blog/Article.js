import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getData } from "../../service/blogService";
import { dbUrl } from "../../constant";
import { useNavigate } from "react-router-dom";

export function Article() {
  const id = useParams().id;
  const navigate = useNavigate();

  const [blogPost, setBlogPost] = useState();

  useEffect(() => {
    getData(dbUrl).then(data => setBlogPost(data));
  }, [blogPost]);

  const handleNavToMainPage = () => {
    navigate(`/`, { replace: true });
  };

  return (
    <>
      {
        blogPost &&
        <article>
          <h2>{ blogPost[id].title }</h2>
          <p>{ blogPost[id].lead }</p>
          <p>{ blogPost[id].body }</p>
          <button className="backHome" onClick={ handleNavToMainPage }>Vissza a főoldalra</button>
        </article>
      }
    </>
  );
}