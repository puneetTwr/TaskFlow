// src/router.js
import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Dashboard from "../Pages/Dashboard";
import Signup from "../Pages/Signup";
import ErrorPage from "../Pages/ErrorPage";
import DashboardLayout from "../Pages/DashboardLayout";
import MyTasks from "../Pages/MyTasks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <Signup />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "myTasks",
        element: <MyTasks />,
      },
    ],
  },
]);

export default router;
