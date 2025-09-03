import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onLogout }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check session storage on load
    const employee = sessionStorage.getItem("employee");
    if (employee) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("employee"); // clear session
    setIsAuthenticated(false);
    if (onLogout) onLogout(); // call parent logout if provided
    navigate("/"); // go back to login page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        {/* Brand */}
        <span className="navbar-brand fw-bold">Leave Management System</span>

        {/* Buttons on the right */}
        <div className="ms-auto">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="btn btn-outline-light btn-sm"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/")}
              className="btn btn-outline-light btn-sm"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
