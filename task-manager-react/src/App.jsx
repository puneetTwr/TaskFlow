import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Signup from "./Pages/Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from "./Components/Navbar";
import { UserProvider } from "./Contexts/UserProvider";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
  ]);
  return (
    <UserProvider>
      <NavigationBar />
      <RouterProvider router={router} />
    </UserProvider>
  );
};

export default App;
