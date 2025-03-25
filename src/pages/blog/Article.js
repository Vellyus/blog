import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { getData } from "../../service/blogService"
import { dbUrl } from "../../constant"
import { useNavigate } from "react-router-dom"
import BackToMain from '../../components/BackToMain'
import ArticleTitle from '../../components/ArticleTitle'
import ArticleLead from "../../components/ArticleLead"
import ArticleBody from "../../components/ArticleBody"

export function Article() {
  const id = useParams().id
  const navigate = useNavigate()

  const [blogPost, setBlogPost] = useState()

  useEffect(() => {
    getData(dbUrl).then(data => setBlogPost(data))
  }, [blogPost])

  const handleNavToMainPage = () => {
    navigate(`/`, { replace: true })
  }

  return (
    <>
      <main>
        {
          blogPost &&
          <article>
            {blogPost[id].imageURL !== "No image uploaded" ? <img className="bigImg" alt="article" src={`${ blogPost[id].imageURL }`}></img> : null}
            <ArticleTitle title={blogPost[id].title} />
            <ArticleLead lead={blogPost[id].lead} />
            <ArticleBody body={blogPost[id].body} />
            {/* <p>{ blogPost[id].lead }</p> */}
            {/* <p>{ blogPost[id].body }</p> */}
            <BackToMain handleNavToMainPage={handleNavToMainPage} />
          </article>
        }
      </main>
    </>
  )
}