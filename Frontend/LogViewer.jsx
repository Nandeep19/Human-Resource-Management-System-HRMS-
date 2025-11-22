import React from "react";

export default function LogViewer({ logs }) {
  if (!logs || logs.length === 0) {
    return <p>No logs found.</p>;
  }

  return (
    <table border="1" cellPadding="4" cellSpacing="0">
      <thead>
        <tr>
          <th>Timestamp</th>
          <th>User</th>
          <th>Action</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log) => (
          <tr key={log.id}>
            <td>{new Date(log.createdAt).toLocaleString()}</td>
            <td>{log.User?.email || "N/A"}</td>
            <td>{log.action}</td>
            <td>{log.details}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
