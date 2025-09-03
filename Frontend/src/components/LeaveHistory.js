import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  viewLeaveHistoryOfEmployee,
  cancelLeave,
  withdrawLeave,
} from "../service/ApiServices";
import { useNavigate } from "react-router-dom";

const LeaveHistory = ({ refreshTrigger }) => {
  const [leaveData, setLeaveData] = useState([]);
  const [message, setMessage] = useState("");
  const today = new Date();
  const navigate = useNavigate();

  useEffect(() => {
    fetchLeaveHistory();
  }, [refreshTrigger]);

  const fetchLeaveHistory = async () => {
    const storedEmployee = sessionStorage.getItem("employee");
    if (!storedEmployee) {
      alert("Session expired. Please login again.");
      navigate("/login");
      return;
    }

    const { empId } = JSON.parse(storedEmployee);

    try {
      const { data } = await viewLeaveHistoryOfEmployee(empId);
      setLeaveData(data);
      if (data.length > 0) {
        setMessage("Your applied leaves are shown below 👇");
      } else {
        setMessage("No leave history found yet.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to fetch leave history.");
    }
  };

  const handleCancel = async (id) => {
    try {
      await cancelLeave(id);
      alert("Leave cancelled successfully!");
      fetchLeaveHistory();
    } catch (error) {
      console.error(error);
      alert("Failed to cancel leave.");
    }
  };

  const handleWithdraw = async (id) => {
    try {
      await withdrawLeave(id);
      alert("Leave withdrawn successfully!");
      fetchLeaveHistory();
    } catch (error) {
      console.error(error);
      alert("Failed to withdraw leave.");
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "APPROVED":
        return "text-success fw-bold";
      case "APPLIED":
        return "text-warning fw-bold";
      case "REJECTED":
        return "text-danger fw-bold";
      default:
        return "";
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-3 text-center text-primary">Leave History</h2>
      {message && <p className="text-center text-muted">{message}</p>}

      <div className="table-responsive">
        <table className="table table-bordered table-hover text-center">
          <thead className="table-dark">
            <tr>
              <th>From Date</th>
              <th>To Date</th>
              <th>Leave Type</th>
              <th>Status</th>
              <th>Total Days</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {leaveData.length > 0 ? (
              leaveData.map((leave) => {
                const leaveStart = new Date(leave.fromDate);
                const isFuture = leaveStart > today;

                return (
                  <tr key={leave.id || leave.leaveId || leave._id}>
                    <td>{leave.fromDate}</td>
                    <td>{leave.toDate}</td>
                    <td>{leave.leaveType}</td>
                    <td className={getStatusClass(leave.leaveStatus)}>
                      {leave.leaveStatus}
                    </td>
                    <td>{leave.numberOfDays}</td>
                    <td>
                      {isFuture && leave.leaveStatus === "APPROVED" && (
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleCancel(leave.id)}
                        >
                          Cancel
                        </button>
                      )}
                      {isFuture && leave.leaveStatus === "APPLIED" && (
                        <button
                          className="btn btn-outline-warning btn-sm"
                          onClick={() => handleWithdraw(leave.id)}
                        >
                          Withdraw
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="text-muted">
                  No leave history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveHistory;
