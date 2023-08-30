import { useEffect } from "react";
import { useState } from "react";
import { getData } from "../../service/blogService";
import { dbUrl } from "../../constant";
import { useNavigate } from "react-router-dom";
import { Posts } from "./Posts";

export function Home() {

  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const data = await getData(dbUrl);
      setBlogPosts(data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const handleShowArticle = (id) => {
    navigate(`/${ id }`, { replace: true });
  };

  return (
    <>
      <h1>Főoldal</h1>
      <Posts posts={ blogPosts } handleShowArticle={ handleShowArticle } loading={ loading } />

    </>
  );
}