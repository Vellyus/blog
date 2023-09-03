import { logout } from "../../service/authService";
import { useLoginContext, useLoginUpdateContext } from "../../LoginContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { addOrEditBlogPost, removeBlogPost } from "../../service/blogService.js";
import { getData } from "../../service/blogService.js";
import { dbUrl, storage, imageListRef } from "../../constant";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";

export function AdminBlog() {

  const [formData, setFormData] = useState({
    title: '',
    lead: '',
    body: '',
    id: crypto.randomUUID()
  });
  const [submit, setSubmit] = useState(false);
  const [blogPosts, setBlogPosts] = useState(null);
  const [editModeId, setEditModeId] = useState(null);

  const uploadImage = async () => {
    try {
      const imagesRef = ref(storage, `images/${ formData.imageId }`);
      await uploadBytes(imagesRef, formData.image)
        .then((ref) => {
          console.log(ref);
          getDownloadURL(imagesRef).then((url) => {
            setFormData(prevFormData => ({ ...prevFormData, imageURL: url }));
          });
          console.log("image uploaded");
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (formData?.imageURL && formData?.imageId) {
      addOrEditBlogPost(formData.id, formData.imageId, formData.title, formData.lead, formData.body, formData.imageURL);
    }
  }, [formData?.imageURL]);


  useEffect(() => {
    getData(dbUrl).then(data => setBlogPosts(data));
  }, [formData]);

  console.log(blogPosts);

  const handleInputChange = (e) => {
    if (e.target.id === "fileInput") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0], "imageId": crypto.randomUUID() });
    } else setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRemoveArticle = (id) => {
    removeBlogPost(id);
    getData(dbUrl).then(data => setBlogPosts(data));
  };

  const showEditForm = (id) => {
    setEditModeId(id);
    setFormData({
      image: blogPosts[id].image,
      title: blogPosts[id].title,
      lead: blogPosts[id].lead,
      body: blogPosts[id].body,
      id: id
    });
    window.scrollTo(0, 0);
  };

  const handleCreateOrEditArticle = (e) => {
    !editModeId ? handleNewArticle(e) : handleEditArticle(e);
  };

  const handleNewArticle = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageId) {
        await uploadImage(formData.image);
      }
      await addOrEditBlogPost(formData.id, formData.imageId || "No image uploaded", formData.title, formData.lead, formData.body, formData.imageURL || "No image uploaded");
      setSubmit(!submit);
      getData(dbUrl).then(data => setBlogPosts(data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditArticle = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageId) {
        await uploadImage(formData.image);
      }
      await addOrEditBlogPost(editModeId, formData.imageId || blogPosts[editModeId].image, formData.title, formData.lead, formData.body, formData.imageURL || blogPosts[editModeId].imageURL);
      setEditModeId(null);
      setSubmit(!submit);
      getData(dbUrl).then(data => setBlogPosts(data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormReset = () => {
    setFormData(null);
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
  }, [isLoggedIn]);

  useEffect(() => {
    listAll(imageListRef).then(res => console.log(res));;
  }, []);

  return (
    <>
      <h1>AdminBlog</h1>
      <button onClick={ handleLogout }>Kijelentkezés</button>

      { !submit ? (
        <form onSubmit={ handleCreateOrEditArticle } id="editOrCreateArticleForm">
          { editModeId !== null ? (<h3>Szerkesztés</h3>) : (null) }

          { editModeId ? (
            formData?.imageId !== null ? (
              blogPosts[editModeId].imageURL !== "No image uploaded" ? (
                <img className="smallImg" src={ `${ blogPosts[editModeId].imageURL }` }></img>
              ) : (null)
            ) : (
              null
            )
          ) : (null) }


          <label htmlFor="fileInput">
            <input type="file" name="image" id="fileInput" onChange={ handleInputChange }></input></label>

          <label htmlFor="title">Cím:
            <input
              onChange={ handleInputChange }
              type="text"
              id="title"
              name="title"
              placeholder=""
              value={ formData?.title }
            /></label>

          <label htmlFor="lead">Bevezető:
            <textarea onChange={ handleInputChange }
              type="text"
              id="lead"
              name="lead"
              placeholder=""
              value={ formData?.lead }
            /></label>

          <label htmlFor="body">Tartalom:
            <textarea onChange={ handleInputChange }
              type="text"
              id="body"
              name="body"
              placeholder=""
              value={ formData?.body }
            /></label>

          <button type="submit" value="Submit">Mentés</button>

          { editModeId !== null ? (
            <button onClick={ () => {
              setEditModeId(null);
              setSubmit(false);
              setFormData({ title: "", lead: "", body: "" });
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
              { blogPosts[post].imageURL !== "No image uploaded" ? <img className="smallImg" src={ `${ blogPosts[post].imageURL }` }></img> : null }
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
};