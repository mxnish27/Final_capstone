import React from "react";
import { NavLink } from "react-router-dom";

const EmployeeSidebar = () => {
  const linkStyle = {
    color: "#333", 
    textDecoration: "none",
    padding: "8px 12px",
    borderRadius: "4px",
    display: "block",
  };

  const activeLinkStyle = {
    ...linkStyle,
    backgroundColor: "#ddd", 
    fontWeight: "bold",
  };

  return (
    <div className="d-flex flex-column vh-100 p-3 border-end" style={{ width: "220px" }}>
      <h5 className="mb-4">Employee Menu</h5>
      <ul className="nav flex-column gap-2">
        <li className="nav-item">
          <NavLink to="" style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}>
            My Profile
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="apply-leave" style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}>
            Apply Leave
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="holiday-list" style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}>
            Holiday List
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="leave-history" style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}>
            Leave History
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default EmployeeSidebar;
