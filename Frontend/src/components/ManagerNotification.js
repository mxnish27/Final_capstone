import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getEmployeeWithApplied, verifyleave } from "../service/ApiServices";

const ManagerNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [rejectingId, setRejectingId] = useState(null);
  const [remark, setRemark] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const manager = JSON.parse(sessionStorage.getItem("employee"));
      const managerId = manager?.empId;

      if (!managerId) {
        setAlertMsg("Login Again! Session Expired");
        return;
      }

      const { data } = await getEmployeeWithApplied(managerId);
      console.log("API Response:", data);
      setNotifications(data); // Make sure your API returns an array of leave requests
    } catch (error) {
      console.error(error);
      setAlertMsg("Failed to fetch notifications");
    }
  };

  const handleAccept = async (id) => {
    try {
      await verifyleave(id, "APPROVED", "");
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, leaveStatus: "APPROVED" } : n
        )
      );
      setAlertMsg("Leave Approved!");
    } catch (error) {
      console.error(error);
      setAlertMsg("Failed to approve leave");
    }
  };

  const handleRejectClick = (id) => {
    setRejectingId(id);
  };

  const handleRejectSubmit = async (id) => {
    if (!remark.trim()) {
      setAlertMsg("Remarks are required for rejection.");
      return;
    }
    try {
      await verifyleave(id, "REJECTED", remark);
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, leaveStatus: "REJECTED", remarks: remark } : n
        )
      );
      setRejectingId(null);
      setRemark("");
      setAlertMsg("Leave Rejected!");
    } catch (error) {
      console.error(error);
      setAlertMsg("Failed to reject leave");
    }
  };

  return (
    <div className="container my-4">
      <h2 className="text-center text-primary mb-3">Leave Notifications</h2>

      {alertMsg && <div className="alert alert-info">{alertMsg}</div>}

      {notifications.length === 0 ? (
        <p className="text-muted text-center">No notifications available</p>
      ) : (
        <div className="list-group">
          {notifications.map((notif) => {
            const from = new Date(notif.fromDate);
            const to = new Date(notif.toDate);
            const days = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;

            return (
              <div key={notif.id} className="list-group-item">
                <p>
                  <strong>{notif.name}</strong> ({notif.empId}) applied for{" "}
                  <strong>{notif.leaveType}</strong> leave for {days}{" "}
                  {days > 1 ? "days" : "day"} from {notif.fromDate} to{" "}
                  {notif.toDate}
                </p>
                <p>
                  Status:{" "}
                  <span className="fw-bold">{notif.leaveStatus}</span>
                </p>

                {/* Approve & Reject buttons for pending leaves */}
                {notif.leaveStatus === "APPLIED" && (
                  <div>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleAccept(notif.id)}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRejectClick(notif.id)}
                    >
                      Reject
                    </button>
                  </div>
                )}

                {/* Reject form */}
                {rejectingId === notif.id && notif.leaveStatus === "APPLIED" && (
                  <div className="mt-2">
                    <textarea
                      className="form-control mb-2"
                      placeholder="Enter rejection remarks..."
                      value={remark}
                      onChange={(e) => setRemark(e.target.value)}
                    />
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleRejectSubmit(notif.id)}
                    >
                      Submit
                    </button>
                  </div>
                )}

                {/* Show remarks if rejected */}
                {notif.leaveStatus === "REJECTED" && notif.remarks && (
                  <p className="text-danger">Remarks: {notif.remarks}</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ManagerNotifications;
