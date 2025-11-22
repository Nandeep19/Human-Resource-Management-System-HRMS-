import React, { useState, useEffect } from "react";

export default function TeamForm({ onSubmit, initialValues, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    description: ""
  });

  useEffect(() => {
    if (initialValues) {
      setForm({
        name: initialValues.name || "",
        description: initialValues.description || ""
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
        <label>Description: </label>
        <input name="description" value={form.description} onChange={handleChange} />
      </div>
      <button type="submit" style={{ marginRight: "0.5rem" }}>Save</button>
      {onCancel && <button onClick={onCancel} type="button">Cancel</button>}
    </form>
  );
}
