import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from "./Components/Navbar";
import { AppProvider } from "./Contexts/AppContext";
import router from "./router/router";
const App = () => {
  return (
    <AppProvider>
      <NavigationBar />
      <RouterProvider router={router} />
    </AppProvider>
  );
};

export default App;
