import React, { useState, useEffect } from "react";

export default function EmployeeForm({ onSubmit, initialValues, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    position: ""
  });

  useEffect(() => {
    if (initialValues) {
      setForm({
        name: initialValues.name || "",
        email: initialValues.email || "",
        position: initialValues.position || ""
      });
    }
  }, [initialValues]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <div>
        <label>Name: </label>
        <input name="name" value={form.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Email: </label>
        <input name="email" value={form.email} onChange={handleChange} required />
      </div>
      <div>
        <label>Position: </label>
        <input name="position" value={form.position} onChange={handleChange} />
      </div>
      <button type="submit" style={{ marginRight: "0.5rem" }}>Save</button>
      {onCancel && <button onClick={onCancel} type="button">Cancel</button>}
    </form>
  );
}
