import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Signup from "./Pages/Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from "./Components/Navbar";
import { AppProvider } from "./Contexts/AppContext";
import ErrorPage from "./Pages/ErrorPage";
import DashboardLayout from "./Pages/DashboardLayout";
import router from "./router/router";
const App = () => {
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Home />,
  //     errorElement: <ErrorPage />,
  //   },
  //   {
  //     path: "/login",
  //     element: <Login />,
  //     errorElement: <ErrorPage />,
  //   },
  //   {
  //     path: "/signup",
  //     element: <Signup />,
  //     errorElement: <ErrorPage />,
  //   },
  //   {
  //     path: "/dashboard",
  //     element: <DashboardLayout />,
  //     errorElement: <ErrorPage />,
  //     children: [
  //       {
  //         path: "",
  //         element: <Dashboard />,
  //       },
  //     ],
  //   },
  // ]);
  return (
    <AppProvider>
      <NavigationBar />
      <RouterProvider router={router} />
    </AppProvider>
  );
};

export default App;
