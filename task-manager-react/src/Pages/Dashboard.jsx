import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../Services/user-services";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../Contexts/UserProvider";
import "../Styles/Dashboard.css";
import TaskInput from "../Components/TaskInput";
import { Container, Form, InputGroup, Button, DropdownButton, Dropdown } from "react-bootstrap";

const Dashboard = () => {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    navigate("/login");
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <h1>
          You are not logged in Please <Link to="/login">Login</Link> or{" "}
          <Link to="/signup">Create an Account</Link>
        </h1>
      </div>
    );
  }

  return (
    <Container className="dashBoard">
      <h1 className="mb-4">Enter a Task</h1>
      <TaskInput />
    </Container>
  );
};

export default Dashboard;
