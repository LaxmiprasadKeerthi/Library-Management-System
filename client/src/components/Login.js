import React, { useState } from "react";
import axios from "axios";
import "../CSS/Login.css";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);

      if (res.status === 200 && res.data.email) {
        const user = { email: res.data.email };
        localStorage.setItem("user", JSON.stringify(user));
        onLogin(user);
        navigate("/books");
      } else {
        setError("❌ Invalid login credentials.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("❌ Network error. Try again later.");
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login to Continue</h2>
        <input
          name="email"
          type="email"
          placeholder="Enter email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Enter password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}

        <p className="signup-link">
          Don't have an account? <Link to="/signup">Signup here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
