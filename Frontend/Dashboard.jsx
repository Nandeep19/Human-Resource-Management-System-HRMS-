import React from "react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Dashboard</h2>
      {user ? (
        <p>Welcome, {user.email}! Organisation ID: {user.organisationId}</p>
      ) : (
        <p>Please login.</p>
      )}
      <p>Use the navigation bar to manage employees, teams, and view logs.</p>
    </div>
  );
}
