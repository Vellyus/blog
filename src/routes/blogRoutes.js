import { Home } from "../pages/blog/Home"
import { NotFound } from "../pages/blog/NotFound"
import { Article } from "../pages/blog/Article"

export const blogRoutes = [
  { path: "/", element: <Home /> },
  { path: "/article/:id", element: <Article /> },
  { path: "*", element: <NotFound /> }
]
