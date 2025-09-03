import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  managerEmployees,
  viewLeaveHistoryOfEmployee,
} from "../service/ApiServices";
import toast from "react-hot-toast";

const ManagerEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [leaves, setLeaves] = useState([]);
  const [loadingLeaves, setLoadingLeaves] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const manager = JSON.parse(sessionStorage.getItem("employee"));
      const managerId = manager?.empId;
      if (!managerId) {
        toast.error("Login Again! Session Expired")
        return;
      };

      const { data } = await managerEmployees(managerId);
      setEmployees(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch employees");
    }
  };

  const handleViewLeaves = async (emp) => {
    setSelectedEmp(emp);
    setLoadingLeaves(true);

    try {
      const { data } = await viewLeaveHistoryOfEmployee(emp.empId);
      setLeaves(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch leave history");
      setLeaves([]);
    } finally {
      setLoadingLeaves(false);
    }
  };

  return (
    <div className="mgr-wrapper">
      {/* Employee List */}
      <div className="mgr-card">
        <div className="mgr-header">
          <h2>My Team</h2>
          <p className="mgr-subtitle">Employees reporting to you</p>
        </div>

        <table className="styled-table">
          <thead>
            <tr>
              <th>Emp ID</th>
              <th>Name</th>
              <th>Job</th>
              <th>Email</th>
              <th style={{ width: 160 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.length ? (
              employees.map((emp) => (
                <tr key={emp.empId}>
                  <td>{emp.empId}</td>
                  <td>{emp.firstName} {emp.lastName}</td>
                  <td>{emp.job}</td>
                  <td>{emp.email}</td>
                  <td>
                    <button
                      className="btn view-btn"
                      onClick={() => handleViewLeaves(emp)}
                    >
                      View Leave History
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Leave History */}
      <div className="mgr-card">
        <div className="mgr-header">
          <h3>
            Leave History{" "}
            {selectedEmp
              ? `— ${selectedEmp.firstName} ${selectedEmp.lastName} (${selectedEmp.empId})`
              : ""}
          </h3>
          {!selectedEmp && (
            <p className="mgr-subtitle">
              Select an employee to view their leaves
            </p>
          )}
        </div>

        {loadingLeaves ? (
          <div className="loader">Loading leaves…</div>
        ) : selectedEmp ? (
          <table className="styled-table">
            <thead>
              <tr>
                <th>#</th>
                <th>From</th>
                <th>To</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {leaves.length ? (
                leaves.map((lv, idx) => (
                  <tr key={lv.id}>
                    <td>{idx + 1}</td>
                    <td>{lv.fromDate}</td>
                    <td>{lv.toDate}</td>
                    <td>{lv.leaveType}</td>
                    <td className={`status-tag ${lv.status ? lv.status.toLowerCase() : ""}`}>
                      {lv.leaveStatus || "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-data">
                    No leave history
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        ) : null}
      </div>
    </div>
  );
};

export default ManagerEmployees;