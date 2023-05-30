import './App.css';
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { getData } from './service/blogService';
import { adminRoutes } from './routes/adminRoutes';
import { blogRoutes } from './routes/blogRoutes';

const router = createBrowserRouter([
  { path: "/", children: blogRoutes },
  { path: "/admin", children: adminRoutes }
]);

console.log(getData());

function App() {
  return <RouterProvider router={ router } />;
};

export default App;
