// src/Components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import "../Styles/Sidebar.css";

const Sidebar = () => {
  return (
    <div
      className="sidebar p-3"
      style={{
        minWidth: "250px",
        background: "#282830",
        color: "#ffffff",
        height: "100vh",        
      }}
    >
      <Nav className="flex-column mt-5" >
        <NavLink to="/dashboard" className="nav-link sidebar-link">
          Dashboard
        </NavLink>
        <NavLink to="/tasks/all" className="nav-link sidebar-link">
          All Tasks
        </NavLink>
        <NavLink to="/tasks/my" className="nav-link sidebar-link">
          My Tasks
        </NavLink>
        <NavLink to="/tasks/completed" className="nav-link sidebar-link">
          Completed Tasks
        </NavLink>
        <NavLink to="/categories" className="nav-link sidebar-link">
          Categories
        </NavLink>
        <NavLink to="/labels" className="nav-link sidebar-link">
          Labels/Tags
        </NavLink>
        <NavLink to="/calendar" className="nav-link sidebar-link">
          Calendar
        </NavLink>
        <NavLink to="/reports" className="nav-link sidebar-link">
          Reports
        </NavLink>
        <NavLink to="/settings" className="nav-link sidebar-link">
          Settings
        </NavLink>
        <NavLink to="/logout" className="nav-link sidebar-link">
          Logout
        </NavLink>
      </Nav>
    </div>
  );
};

export default Sidebar;
