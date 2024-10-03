import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import taskFlowLogo from "../assets/task-flow-logo.png";
import { useAppContext } from "../Contexts/AppContext";
import "../Styles/Navbar.css";

function NavigationBar() {
  const { user, setUser } = useAppContext();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setUser(null);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    window.location.href = "/login";
  };

  return (
    <Navbar expand="lg" className="custom-navbar shadow-sm" fixed="top">
      <Container fluid className="mx-4">
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <img
            alt=""
            src={taskFlowLogo}
            width="40"
            height="40"
            className="d-inline-block align-top me-2"
          />
          <span className="fs-3 task-flow">Task Flow</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
          {user ? (
            <>
              <Navbar.Text className="text-muted me-3">
                Signed in as:{" "}
                <a href="#login" className="text-primary fs-4">
                  {user.username}
                </a>
              </Navbar.Text>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={handleLogin}
              >
                Login
              </button>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
