import { Admin } from "../pages/admin/Admin";
import { AdminBlog } from "../pages/admin/AdminBlog";

export const adminRoutes = [
  { path: "/admin", element: <Admin />, },
  { path: "/admin/blog", element: <AdminBlog />, },
];