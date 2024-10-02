// src/Components/DashboardLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import "../Styles/Dashboard.css";
import { Container } from "react-bootstrap";

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Container fluid className="m-0 p-0">
        <Outlet />
      </Container>
    </div>
  );
};

export default DashboardLayout;
