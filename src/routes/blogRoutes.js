import { Home } from "../pages/blog/Home";
import { NotFound } from "../pages/blog/NotFound";
import { Article } from "../pages/blog/Article";

export const blogRoutes = [
  { path: "/", element: <Home />, },
  { path: "/:id", element: <Article />, },
  { path: "*", element: <NotFound /> }   // 404 page is not showing up, because the router is handling it as a dynamic segment url, but it can't load an Article element
];