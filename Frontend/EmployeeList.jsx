import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import {
  fetchEmployees,
  createEmployeeApi,
  updateEmployeeApi,
  deleteEmployeeApi
} from "../api/employee.api.js";
import { fetchTeams, assignEmployeesApi } from "../api/team.api.js";
import EmployeeForm from "../components/EmployeeForm.jsx";

export default function EmployeeList() {
  const { token } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [teams, setTeams] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState([]);

  const loadData = async () => {
    if (!token) return;
    const [empRes, teamRes] = await Promise.all([
      fetchEmployees(token),
      fetchTeams(token)
    ]);
    if (empRes.success) setEmployees(empRes.data);
    if (teamRes.success) setTeams(teamRes.data);
  };

  useEffect(() => {
    loadData();
  }, [token]);

  const handleCreate = async (data) => {
    const res = await createEmployeeApi(token, data);
    if (res.success) {
      setEditingEmployee(null);
      await loadData();
    }
  };

  const handleUpdate = async (data) => {
    const res = await updateEmployeeApi(token, editingEmployee.id, data);
    if (res.success) {
      setEditingEmployee(null);
      await loadData();
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this employee?")) return;
    const res = await deleteEmployeeApi(token, id);
    if (res.success) {
      await loadData();
    }
  };

  const toggleSelectedEmployee = (id) => {
    setSelectedEmployeeIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const assignSelectedEmployees = async () => {
    if (!selectedTeamId || selectedEmployeeIds.length === 0) return;
    await assignEmployeesApi(token, selectedTeamId, selectedEmployeeIds);
    await loadData();
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Employees</h2>

      <h3>{editingEmployee ? "Edit Employee" : "Create Employee"}</h3>
      <EmployeeForm
        initialValues={editingEmployee}
        onSubmit={editingEmployee ? handleUpdate : handleCreate}
        onCancel={() => setEditingEmployee(null)}
      />

      <h3>Assign Employees to Team</h3>
      <div style={{ marginBottom: "1rem" }}>
        <label>Team: </label>
        <select
          value={selectedTeamId}
          onChange={(e) => setSelectedTeamId(e.target.value)}
        >
          <option value="">-- select --</option>
          {teams.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
        <button onClick={assignSelectedEmployees} style={{ marginLeft: "0.5rem" }}>
          Assign Selected Employees
        </button>
      </div>

      <table border="1" cellPadding="4" cellSpacing="0">
        <thead>
          <tr>
            <th>Select</th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Teams</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((e) => (
            <tr key={e.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedEmployeeIds.includes(e.id)}
                  onChange={() => toggleSelectedEmployee(e.id)}
                />
              </td>
              <td>{e.id}</td>
              <td>{e.name}</td>
              <td>{e.email}</td>
              <td>{e.position}</td>
              <td>{(e.Teams || []).map((t) => t.name).join(", ")}</td>
              <td>
                <button onClick={() => setEditingEmployee(e)}>Edit</button>
                <button onClick={() => handleDelete(e.id)} style={{ marginLeft: "0.5rem" }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {employees.length === 0 && (
            <tr>
              <td colSpan="7">No employees yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
