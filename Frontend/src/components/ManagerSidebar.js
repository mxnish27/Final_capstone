import React from "react";
import { NavLink } from "react-router-dom";

const ManagerSidebar = () => {
  const links = [
    { to: "", label: "Notification" },
    { to: "view-employee", label: "View Employees" },
    { to: "holiday-list", label: "Holiday List" },
    { to: "addemployee", label: "Add Employee" },
  ];

  return (
    <div className="d-flex flex-column vh-100 p-3 bg-light border-end" style={{ width: "220px" }}>
      <ul className="nav nav-pills flex-column gap-2">
        {links.map((link) => (
          <li className="nav-item" key={link.to}>
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active fw-bold" : " text-primary")
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManagerSidebar;
