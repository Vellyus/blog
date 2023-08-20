import { Admin } from "../pages/admin/Admin";
import { AdminBlog } from "../pages/admin/AdminBlog";
import { NotFound } from "../pages/blog/NotFound";

export const adminRoutes = [
  { path: "/admin", element: <Admin />, },
  { path: "/admin/blog", element: <AdminBlog />, },
  { path: "*", element: <NotFound /> }
];