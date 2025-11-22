import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { fetchLogs } from "../api/log.api.js";
import LogViewer from "../components/LogViewer.jsx";

export default function LogsPage() {
  const { token } = useAuth();
  const [logs, setLogs] = useState([]);

  const loadLogs = async () => {
    if (!token) return;
    const res = await fetchLogs(token, 200);
    if (res.success) setLogs(res.data);
  };

  useEffect(() => {
    loadLogs();
  }, [token]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Audit Logs</h2>
      <LogViewer logs={logs} />
    </div>
  );
}
