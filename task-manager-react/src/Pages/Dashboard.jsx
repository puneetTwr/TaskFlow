import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../Services/user-services";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../Contexts/UserProvider";

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

  if(!user) {
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
    <div className="container mt-5">
      <h1 className="mb-4">User Dashboard</h1>
      <div className="card">
        <div className="card-header">
          <h5>User Details</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <h6 className="font-weight-bold">Name:</h6>
              <p>{user?.name}</p>
            </div>
            <div className="col-md-6">
              <h6 className="font-weight-bold">Username:</h6>
              <p>{user?.username}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <h6 className="font-weight-bold">Email:</h6>
              <p>{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
