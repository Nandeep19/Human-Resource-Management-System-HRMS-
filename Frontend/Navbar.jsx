import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc", marginBottom: "1rem" }}>
      <span style={{ fontWeight: "bold", marginRight: "1rem" }}>HRMS</span>
      {user && (
        <>
          <Link to="/dashboard" style={{ marginRight: "1rem" }}>Dashboard</Link>
          <Link to="/employees" style={{ marginRight: "1rem" }}>Employees</Link>
          <Link to="/teams" style={{ marginRight: "1rem" }}>Teams</Link>
          <Link to="/logs" style={{ marginRight: "1rem" }}>Logs</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
      {!user && <Link to="/login">Login</Link>}
    </nav>
  );
}
