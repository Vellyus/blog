import './App.css';
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home";
import { Admin } from "./pages/Admin";
import { AdminBlog } from "./pages/AdminBlog";
import { NotFound } from "./pages/NotFound";

const router = createBrowserRouter([
  { path: "/", element: <Home />, },
  { path: "/admin", element: <Admin />, },
  { path: "/admin/blog", element: <AdminBlog />, },
  { path: "*", element: <NotFound /> }
]);


function App() {
  return <RouterProvider router={ router } />;
};

export default App;
