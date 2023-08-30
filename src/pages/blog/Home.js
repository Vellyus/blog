import { useEffect } from "react";
import { useState } from "react";
import { getData } from "../../service/blogService";
import { dbUrl } from "../../constant";
import { useNavigate } from "react-router-dom";
import { Posts } from "./Posts";

export function Home() {

  const [blogPosts, setBlogPosts] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    getData(dbUrl).then(data => setBlogPosts(data));
  }, [blogPosts]);

  const handleShowArticle = (id) => {
    navigate(`/${ id }`, { replace: true });
  };

  return (
    <>
      <h1>Főoldal</h1>
      { blogPosts && <Posts posts={ blogPosts } handleShowArticle={ handleShowArticle } /> }
    </>
  );
}