import { logout } from "../../service/authService"
import { useLoginContext, useLoginUpdateContext } from "../../LoginContext"
import { useNavigate } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import { addOrEditBlogPost, removeBlogPost } from "../../service/blogService.js"
import { getData } from "../../service/blogService.js"
import { dbUrl, storage, imageListRef } from "../../constant"
import { listAll, ref, uploadBytes } from "firebase/storage"

export function AdminBlog() {

  const [formData, setFormData] = useState(null)
  const [submit, setSubmit] = useState(false)
  const [blogPosts, setBlogPosts] = useState()
  const [editModeId, setEditModeId] = useState(null)

  const imageRef = useRef()
  const titleRef = useRef()
  const leadRef = useRef()
  const bodyRef = useRef()

  const slugify = require("slugify")

  const uploadImage = async () => {
    try {
      const imagesRef = ref(storage, `images/${ formData.imageId }`)
      await uploadBytes(imagesRef, formData.image).then(() => {
        console.log("image uploaded")
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData(dbUrl).then(data => setBlogPosts(data))
  }, [blogPosts])

  const handleInputChange = async (e) => {
    if (e.target.id === "fileInput") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0], "imageId": crypto.randomUUID() })
    } else setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleRemoveArticle = (id) => {
    removeBlogPost(id)
  }

  const showEditForm = (id) => {
    setEditModeId(id)
    setFormData({
      image: blogPosts[id].image,
      title: blogPosts[id].title,
      lead: blogPosts[id].lead,
      body: blogPosts[id].body
    })
  }

  const handleNewArticle = async (e) => {
    e.preventDefault()
    try {
      await addOrEditBlogPost(slugify(formData.title, { lower: true, strict: true }), formData.imageId, formData.title, formData.lead, formData.body)
      await uploadImage(formData.image)
      setSubmit(!submit)
      getData(dbUrl).then(data => setBlogPosts(data))
    } catch (error) {
      console.log(error)
    }
  }

  const handleEditArticle = async (e) => {
    e.preventDefault()
    try {
      await addOrEditBlogPost(editModeId, formData.imageId, formData.title, formData.lead, formData.body)
      setEditModeId(null)
      setSubmit(!submit)
      getData(dbUrl).then(data => setBlogPosts(data))
    } catch (error) {
      console.log(error)
    }
  }

  const handleFormReset = () => {
    setSubmit(!submit)
  }

  const isLoggedIn = useLoginContext()
  const toggleisLoggedIn = useLoginUpdateContext()

  const navigate = useNavigate()

  const handleLogout = () => {
    logout().then(() => {
      toggleisLoggedIn()
    })
  }

  useEffect(() => {
    !isLoggedIn && navigate("/admin", { replace: true })
  })

  useEffect(() => {
    listAll(imageListRef).then(res => console.log(res));;
  }, [])

  useEffect(() => {
    if (editModeId !== null) {
      // dont try to add a value to the input, load the image above the input instead, use the input only to change it
      // FIRST list the images on the admin page too and use that in edit mode too

      // imageRef.current.value = blogPosts[editModeId].image;
      titleRef.current.value = blogPosts[editModeId].title
      leadRef.current.value = blogPosts[editModeId].lead
      bodyRef.current.value = blogPosts[editModeId].body
    }
  }, [editModeId])

  return (
    <>
      <h1>AdminBlog</h1>
      <button onClick={handleLogout}>Sign out</button>

      {!submit ? (
        <form onSubmit={editModeId !== null ? (handleEditArticle) : (handleNewArticle)} id="editOrCreateArticleForm">
          {editModeId !== null ? (<h3>Edit</h3>) : (null)}

          <label htmlFor="fileInput">
            <input type="file" name="image" id="fileInput" ref={imageRef} onChange={handleInputChange}></input></label>

          <label htmlFor="title">Title:
            <input onChange={handleInputChange} type="text" id="title" name="title" placeholder="" ref={titleRef} /></label>

          <label htmlFor="lead">Intro:
            <textarea onChange={handleInputChange} type="text" id="lead" name="lead" placeholder="" ref={leadRef} /></label>

          <label htmlFor="body">Body:
            <textarea onChange={handleInputChange} type="text" id="body" name="body" placeholder="" ref={bodyRef} /></label>

          <button type="submit" value="Submit">Save</button>

          {editModeId !== null ? (
            <button onClick={() => {
              setEditModeId(null)
              setSubmit(false)
              titleRef.current.value = ""
              leadRef.current.value = ""
              bodyRef.current.value = ""
            }}>Cancel</button>
          ) : (null)}
        </form>
      ) : (<div className="submitted">
        <h3>Post saved!</h3>
        <button onClick={handleFormReset}>New blog post</button>
      </div>)
      }

      <hr></hr>
      <h2 id="articles-title">Blog posts:</h2>

      {
        blogPosts && Object.keys(blogPosts).map((post) => {
          return (
            <article key={post}>
              <h3>{blogPosts[post].title}</h3>
              <p>{blogPosts[post].lead}</p>
              <p>{blogPosts[post].body}</p>
              <button className="editButton" onClick={() => showEditForm(post)}>Edit</button>
              <button className="removeButton" onClick={() => handleRemoveArticle(post)}>Remove</button>
            </article>
          )
        })
      }
    </>
  )
}