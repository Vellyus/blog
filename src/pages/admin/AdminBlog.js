import { logout } from "../../service/authService";
import { useLoginContext, useLoginUpdateContext } from "../../LoginContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { addOrEditBlogPost, removeBlogPost } from "../../service/blogService.js";
import { getData } from "../../service/blogService.js";
import { dbUrl } from "../../constant";


export function AdminBlog() {

  const [formData, setFormData] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [blogPosts, setBlogPosts] = useState();
  const [editModeId, setEditModeId] = useState(null);

  const titleRef = useRef();
  const leadRef = useRef();
  const bodyRef = useRef();

  const slugify = require("slugify");

  useEffect(() => {
    getData(dbUrl).then(data => setBlogPosts(data));
  }, [blogPosts]);


  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRemoveArticle = (id) => {
    removeBlogPost(id);
  };

  const showEditForm = (id) => {
    setEditModeId(id);
    setFormData({
      title: blogPosts[id].title,
      lead: blogPosts[id].lead,
      body: blogPosts[id].body
    });
  };

  const handleNewArticle = async (e) => {
    e.preventDefault();
    try {
      await addOrEditBlogPost(slugify(formData.title, { lower: true, strict: true }), formData.title, formData.lead, formData.body);
      setSubmit(!submit);
      getData(dbUrl).then(data => setBlogPosts(data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditArticle = async (e) => {
    e.preventDefault();
    try {
      await addOrEditBlogPost(editModeId, formData.title, formData.lead, formData.body);
      setEditModeId(null);
      setSubmit(!submit);
      getData(dbUrl).then(data => setBlogPosts(data));
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

  useEffect(() => {
    if (editModeId !== null) {
      titleRef.current.value = blogPosts[editModeId].title;
      leadRef.current.value = blogPosts[editModeId].lead;
      bodyRef.current.value = blogPosts[editModeId].body;
    }
  }, [editModeId]);

  return (
    <>
      <h1>AdminBlog</h1>
      <button onClick={ handleLogout }>Kijelentkezés</button>

      { !submit ? (
        <form onSubmit={ editModeId !== null ? (handleEditArticle) : (handleNewArticle) } id="editOrCreateArticleForm" action="submit-form.php" method="post">
          <h3>Szerkesztés</h3>
          <label htmlFor="title">Cím:
            <input onChange={ handleInputChange } type="text" id="title" name="title" placeholder="" ref={ titleRef } /></label>

          <label htmlFor="lead">Bevezető:
            <textarea onChange={ handleInputChange } type="text" id="lead" name="lead" placeholder="" ref={ leadRef } /></label>

          <label htmlFor="body">Tartalom:
            <textarea onChange={ handleInputChange } type="text" id="body" name="body" placeholder="" ref={ bodyRef } /></label>

          <button type="submit" value="Submit">Mentés</button>
          { editModeId !== null ? (
            <button onClick={ () => {
              setEditModeId(null);
              setSubmit(false);
              titleRef.current.value = "";
              leadRef.current.value = "";
              bodyRef.current.value = "";
            } }>Vissza</button>
          ) : (null) }
        </form>
      ) : (<div className="submitted">
        <h3>Sikeresen mentve!</h3>
        <button onClick={ handleFormReset }>Új blog post</button>
      </div>)
      }

      <hr></hr>
      <h2 id="articles-title">Blog bejegyzések:</h2>

      {
        blogPosts && Object.keys(blogPosts).map((post) => {
          return (
            <article key={ post }>
              <h3>{ blogPosts[post].title }</h3>
              <p>{ blogPosts[post].lead }</p>
              <p>{ blogPosts[post].body }</p>
              <button className="editButton" onClick={ () => showEditForm(post) }>Szerkesztés</button>
              <button className="removeButton" onClick={ () => handleRemoveArticle(post) }>Törlés</button>
            </article>
          );
        })
      }


    </>
  );
}