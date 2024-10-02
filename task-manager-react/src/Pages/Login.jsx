import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authenticateUser, getCurrentUser } from "../Services/user-services";
import { useUser } from "../Contexts/UserProvider";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await authenticateUser({ username, password });
    if (response && response.success) {
      setUser(response.data.data);
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        setUser(currentUser); // Set the current user to the context
        navigate("/dashboard"); // Navigate to dashboard if user is already logged in
      }
    };
    fetchCurrentUser();
  }, [navigate, setUser]);

  return (
    <Container className="loginPage mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <div className="login p-4 border rounded">
            <h1 className="text-center mb-4">Login</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Login
              </Button>
            </Form>
          </div>
          <div className="text-center mt-3">
            <p>Or</p>
            <h2 className="signupLink">
              <Link to="/signup">Signup</Link>
            </h2>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
