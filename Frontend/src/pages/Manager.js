import React from "react";
import { Routes, Route } from "react-router-dom";
import ManagerSidebar from "../components/ManagerSidebar";
import AddEmployee from "../components/AddEmployee";
import ManagerEmployees from "../components/ManagerEmployees";
import HolidayList from "../components/HolidayList";
import ManagerNotification from "../components/ManagerNotification";

const Manager = () => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <ManagerSidebar />

      {/* Content area */}
      <div className="flex-grow-1 p-3">
        <Routes>
          <Route path="view-employee" element={<ManagerEmployees />} />
          <Route path="holiday-list" element={<HolidayList />} />
          <Route path="addemployee" element = {<AddEmployee />} />
          <Route path="*" element={<ManagerNotification />} />
        </Routes>
      </div>
    </div>
  );
};

export default Manager;
