import React, { useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:9927/leavemanagementsystem";

const Login = () => {
  const [form, setForm] = useState({ empId: "", password: "" });
  const navigate = useNavigate();

  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, form);
      const data = response.data;

      
      sessionStorage.setItem("employee", JSON.stringify(data));

      toast.success("Login successful");

      
      if (data.job && data.job.toLowerCase() === "manager") {
        navigate("/manager");
      } else {
        navigate("/employee");
      }
    } catch (error) {
      console.error(error);

      
      if (error.response && error.response.status === 401) {
        toast.error("Invalid Employee ID or Password");
      } else {
        toast.error("Login failed. Please try again");
      }
    }
  };

  return (
    <div className="home-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="empId"
            placeholder="Employee Id"
            value={form.empId}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
