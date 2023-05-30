import { Home } from "../pages/blog/Home";
import { NotFound } from "../pages/blog/NotFound";

export const blogRoutes = [
  { path: "/", element: <Home />, },
  { path: "*", element: <NotFound /> }
];