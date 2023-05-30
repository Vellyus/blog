import './App.css';
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { Home } from "./pages/blog/Home";
import { Admin } from "./pages/admin/Admin";
import { AdminBlog } from "./pages/admin/AdminBlog";
import { NotFound } from "./pages/blog/NotFound";
import { getData } from './service/blogService';

const router = createBrowserRouter([
  { path: "/", element: <Home />, },
  { path: "/admin", element: <Admin />, },
  { path: "/admin/blog", element: <AdminBlog />, },
  { path: "*", element: <NotFound /> }
]);

console.log(getData());

function App() {
  return <RouterProvider router={ router } />;
};

export default App;
