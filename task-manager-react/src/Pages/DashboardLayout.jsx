// src/Components/DashboardLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import "../Styles/Dashboard.css";
import { Container } from "react-bootstrap";
import { IoAddCircleSharp } from "react-icons/io5";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboardRoute = location.pathname === "/dashboard";

  const goToCreateTask = () => {
    navigate("/dashboard");
  };
  return (
    <div className="dashboard-layout d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Container fluid className="m-0 p-0">
        <Outlet />
      </Container>
      {!isDashboardRoute && (
        <IoAddCircleSharp
          onClick={goToCreateTask}
          size={80}
          className="add-task-icon"
        />
      )}
    </div>
  );
};

export default DashboardLayout;
