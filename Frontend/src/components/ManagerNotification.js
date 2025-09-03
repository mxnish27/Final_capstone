import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getEmployeeWithApplied, verifyleave } from "../service/ApiServices";


;
import toast from "react-hot-toast";

const ManagerNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [remarks, setRemarks] = useState({});

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const manager = JSON.parse(sessionStorage.getItem("employee"));
      const managerId = manager?.empId;
      if (!managerId) {
        toast.error("Login again, session expired");
        return;
      }

      const { data } = await getEmployeeWithApplied(managerId);

      const safeData = data.map((n) => ({
        ...n,
        status: n.status || "APPLIED",
        empName: n.employee?.firstName + " " + n.employee?.lastName,
        empId: n.employee?.empId,
      }));

      setNotifications(safeData);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch notifications");
    }
  };

  const handleSubmit = async (id) => {
    const status = selectedStatus[id];
    if (!status) {
      alert("Please select Accept or Reject");
      return;
    }

    if (status === "REJECTED" && (!remarks[id] || !remarks[id].trim())) {
      alert("Please enter remarks for rejection");
      return;
    }

    try {
      await verifyleave(id, status, remarks[id] || "");
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id
            ? { ...n, status: status === "APPROVED" ? "APPROVED" : "REJECTED", remarks: remarks[id] || "" }
            : n
        )
      );

      setSelectedStatus((prev) => ({ ...prev, [id]: undefined }));
      setRemarks((prev) => ({ ...prev, [id]: "" }));

      toast.success(`Leave ${status === "APPROVED" ? "approved" : "rejected"}`);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update leave");
    }
  };

  return (
    <div className="manager-notifications">
      <h2>Leave Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications available</p>
      ) : (
        <ul>
          {notifications.map((notif) => {
            const days =
              (new Date(notif.toDate) - new Date(notif.fromDate)) /
                (1000 * 60 * 60 * 24) +
              1;

            return (
              <li key={notif.id} className="notification-card">
                <p>
                  <strong>{notif.empName || "Unknown"}</strong> (
                  {notif.empId || "N/A"}) applied for{" "}
                  <strong>{notif.leaveType}</strong> leave for {days}{" "}
                  {days > 1 ? "days" : "day"} from {notif.fromDate} to{" "}
                  {notif.toDate}
                </p>

                <p>
                  Status:{" "}
                  <span className={`status ${notif.status.toLowerCase()}`}>
                    {notif.status}
                  </span>
                </p>

                {notif.status === "APPLIED" && (
                  <div className="actions">
                    <label>
                      <input
                        type="radio"
                        name={`status-${notif.id}`}
                        checked={selectedStatus[notif.id] === "APPROVED"}
                        onChange={() =>
                          setSelectedStatus((prev) => ({ ...prev, [notif.id]: "APPROVED" }))
                        }
                      />
                      Accept
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`status-${notif.id}`}
                        checked={selectedStatus[notif.id] === "REJECTED"}
                        onChange={() =>
                          setSelectedStatus((prev) => ({ ...prev, [notif.id]: "REJECTED" }))
                        }
                      />
                      Reject
                    </label>
                  </div>
                )}

                {selectedStatus[notif.id] === "REJECTED" && (
                  <textarea
                    placeholder="Enter rejection remarks..."
                    value={remarks[notif.id] || ""}
                    onChange={(e) =>
                      setRemarks((prev) => ({ ...prev, [notif.id]: e.target.value }))
                    }
                    className="remarks-textarea"
                  />
                )}

                {notif.status === "APPLIED" && (
                  <button
                    className="submit-reject-btn"
                    onClick={() => handleSubmit(notif.id)}
                  >
                    Submit
                  </button>
                )}

                {notif.status === "REJECTED" && notif.remarks && (
                  <p className="remarks">Remarks: {notif.remarks}</p>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};



export default ManagerNotifications;
