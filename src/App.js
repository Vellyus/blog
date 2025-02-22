import './App.css'
// import { createBrowserRouter } from "react-router-dom";
import { createHashRouter } from 'react-router-dom'
import { RouterProvider } from "react-router-dom"
import { getData } from './service/blogService'
import { adminRoutes } from './routes/adminRoutes'
import { blogRoutes } from './routes/blogRoutes'
import { LoginProvider } from './LoginContext'

// const router = createBrowserRouter([
//   { path: "/", children: blogRoutes },
//   { path: "/admin", children: adminRoutes }
// ]);

const router = createHashRouter([
  { path: "/", children: blogRoutes },
  { path: "/admin", children: adminRoutes }
])

// console.log(getData());

function App() {
  return (
    <LoginProvider>
      <RouterProvider router={router} />
    </LoginProvider>
  )
};

export default App
