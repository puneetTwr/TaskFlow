import React, { useState } from "react";
import { createUser } from "../Services/user-services";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../Contexts/AppContext";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { setUser } = useAppContext();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await createUser({ username, password, name, email });

      if (response && response.success) {
        setUser(response.data.data);
        navigate("/dashboard");
        setUsername("");
        setPassword("");
        setName("");
        setEmail("");
      } else {
        console.error("Error creating user:", response.message);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  return (
    <Container className="signupPage mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <div className="signup p-4 border rounded">
            <h1 className="text-center mb-4">Sign Up</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                  autoComplete="off"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  autoComplete="off"
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Sign Up
              </Button>
            </Form>
          </div>
          <div className="text-center mt-3">
            <p>Or</p>
            <h2 className="loginLink">
              <Link to="/login">Login</Link>
            </h2>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
