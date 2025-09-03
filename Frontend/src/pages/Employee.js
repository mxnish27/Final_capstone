import React from "react";
import { Routes, Route } from "react-router-dom";
import EmployeeSidebar from "../components/EmployeeSidebar";
import ApplyLeave from "../components/ApplyLeave";
import HolidayList from "../components/HolidayList";
import LeaveHistory from "../components/LeaveHistory";
import GetEmployee from "../components/GetEmployee"; // My Profile page

const Employee = () => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <EmployeeSidebar />

      {/* Content area */}
      <div className="flex-grow-1 p-3">
        <Routes>
          <Route path="" element={<GetEmployee />} />        {/* My Profile */}
          <Route path="apply-leave" element={<ApplyLeave />} />
          <Route path="holiday-list" element={<HolidayList />} />
          <Route path="leave-history" element={<LeaveHistory />} />
        </Routes>
      </div>
    </div>
  );
};

export default Employee;
