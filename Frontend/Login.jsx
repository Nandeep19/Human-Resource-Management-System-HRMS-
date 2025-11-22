import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { loginApi, registerOrg } from "../api/auth.api.js";

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    organisationName: "",
    adminEmail: "",
    password: ""
  });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await loginApi(loginForm);
      if (res.success) {
        login(res.data.token, res.data.user);
        navigate("/dashboard");
      } else {
        setError(res.message || "Login failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await registerOrg({
        organisationName: registerForm.organisationName,
        adminEmail: registerForm.adminEmail,
        password: registerForm.password
      });
      if (res.success) {
        login(res.data.token, res.data.user);
        navigate("/dashboard");
      } else {
        setError(res.message || "Registration failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>HRMS {isRegister ? "Register Organisation" : "Login"}</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!isRegister ? (
        <form onSubmit={handleLoginSubmit} style={{ maxWidth: "400px" }}>
          <div>
            <label>Email: </label>
            <input name="email" value={loginForm.email} onChange={handleLoginChange} />
          </div>
          <div>
            <label>Password: </label>
            <input
              name="password"
              type="password"
              value={loginForm.password}
              onChange={handleLoginChange}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      ) : (
        <form onSubmit={handleRegisterSubmit} style={{ maxWidth: "400px" }}>
          <div>
            <label>Organisation Name: </label>
            <input
              name="organisationName"
              value={registerForm.organisationName}
              onChange={handleRegisterChange}
            />
          </div>
          <div>
            <label>Admin Email: </label>
            <input
              name="adminEmail"
              value={registerForm.adminEmail}
              onChange={handleRegisterChange}
            />
          </div>
          <div>
            <label>Password: </label>
            <input
              name="password"
              type="password"
              value={registerForm.password}
              onChange={handleRegisterChange}
            />
          </div>
          <button type="submit">Register</button>
        </form>
      )}

      <button
        style={{ marginTop: "1rem" }}
        onClick={() => setIsRegister((prev) => !prev)}
      >
        {isRegister ? "Have an account? Login" : "New organisation? Register"}
      </button>
    </div>
  );
}
