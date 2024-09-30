import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { getCurrentUser } from "../Services/user-services";
import taskFlowLogo from "../assets/task-flow-logo.png";

function NavigationBar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    try {
      const fetchedUser = await getCurrentUser();
      setUser(fetchedUser);
      console.log("your user is : ", fetchedUser);
    } catch (err) {
      setError(err.message);
    }
  };

  function handleLogout() {
    localStorage.removeItem("jwtToken");
    setUser(null);
  }
  function handleLogin(e) {
    e.preventDefault();
    window.location.href = "/login";
  }
  useEffect(() => {
    fetchUser();
  }, []);
  
  return (
    <Navbar className="bg-body-tertiary">
      <Container fluid className="mx-5">
        <Navbar.Brand href="#home" className="fs-2">
          <img
            alt=""
            src={taskFlowLogo}
            width="50"
            height="50"
            className="d-inline-block align-top"
          />
          Task Flow
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          {user ? (
            <>
              <Navbar.Text>
                Signed in as: <a href="#login">{user.username}</a>
              </Navbar.Text>
              <button
                type="button"
                className="btn btn-dark mx-2"
                onClick={handleLogout}
              >
                Logout ?
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="btn btn-dark mx-2"
                onClick={handleLogin}
              >
                Login ?
              </button>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
