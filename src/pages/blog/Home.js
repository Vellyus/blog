import { useEffect } from "react"
import { useState } from "react"
import { getData } from "../../service/blogService"
import { dbUrl } from "../../constant"
import { useNavigate } from "react-router-dom"
import { Posts } from "./Posts"
import { Pagination } from "./Pagination"
import Header from '../../components/Header'

export function Home() {

  const [blogPosts, setBlogPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(9)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const data = await getData(dbUrl)
      setBlogPosts(data)
      setLoading(false)
    }

    fetchPosts()
  }, [])

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const posts = []
  blogPosts && Object.keys(blogPosts).map(postId => posts.push(blogPosts[postId]))
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const handleShowArticle = (id) => {
    navigate(`/${ id }`, { replace: true })
  }

  return (
    <>
      <Header />
      <main className="homePage">
        <h2>Home</h2>
        <Posts posts={currentPosts} handleShowArticle={handleShowArticle} loading={loading} />
        <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />
      </main>
    </>
  )
}