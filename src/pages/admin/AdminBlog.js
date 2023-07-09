import { logout } from "../../service/authService";
import { useLoginContext, useLoginUpdateContext } from "../../LoginContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { addOrEditBlogPost } from "../../service/blogService.js";
import { getData } from "../../service/blogService.js";
import { dbUrl } from "../../constant";


export function AdminBlog() {

  const [formData, setFormData] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [blogPosts, setBlogPosts] = useState();

  useEffect(() => {
    getData(dbUrl).then(data => setBlogPosts(data));
  }, [blogPosts]);


  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      addOrEditBlogPost(crypto.randomUUID(), formData.title, formData.lead, formData.body);
      setSubmit(!submit);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormReset = () => {
    setSubmit(!submit);
  };

  const isLoggedIn = useLoginContext();
  const toggleisLoggedIn = useLoginUpdateContext();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout().then(() => {
      toggleisLoggedIn();
    });
  };

  useEffect(() => {
    !isLoggedIn && navigate("/admin", { replace: true });
  });

  return (
    <>
      <h1>AdminBlog</h1>
      <button onClick={ handleLogout }>Kijelentkezés</button>

      { !submit ? (
        <form onSubmit={ handleSubmit } id="newSpendingForm" action="submit-form.php" method="post">
          <label htmlFor="title">Cím:
            <input onChange={ handleInputChange } type="text" id="title" name="title" placeholder="" /></label>

          <label htmlFor="lead">Bevezető:
            <textarea onChange={ handleInputChange } type="text" id="lead" name="lead" placeholder="" /></label>

          <label htmlFor="body">Tartalom:
            <textarea onChange={ handleInputChange } type="text" id="body" name="body" placeholder="" /></label>

          <button type="submit" value="Submit">Mentés</button>
        </form>
      ) : (<div className="submitted">
        <h3>Sikeresen mentve!</h3>
        <button onClick={ handleFormReset }>Új blog post</button>
      </div>) }

      <hr></hr>
      <h2>Blog bejegyzések:</h2>

      {
        blogPosts && Object.keys(blogPosts).map((post, i) => {
          return (
            <article key={ i }>
              <h3>{ blogPosts[post].title }</h3>
              <p>{ blogPosts[post].lead }</p>
              <p>{ blogPosts[post].body }</p>
              <button className="removeButton">Remove article</button>
            </article>
          );
        })
      }


    </>
  );
}