import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { applyLeave } from "../service/ApiServices"; 

const ApplyLeave = () => {
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    empId: "",
    managerId: "",
    fromDate: "",
    toDate: "",
    leaveType: "CASUAL",
  });

  useEffect(() => {
    const storedEmployee = sessionStorage.getItem("employee");
    if (storedEmployee) {
      const employee = JSON.parse(storedEmployee);
      setFormData((prev) => ({
        ...prev,
        empId: employee.empId,
        managerId: employee.managerId || "",
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Leave Applied:", formData);
    applyLeave(formData);
    alert("Leave applied successfully!");
    setFormData((prev) => ({
      ...prev,
      fromDate: "",
      toDate: "",
      leaveType: "CASUAL",
    }));
  };

  return (
    <div className="applyleave-container">
      <h2>Apply Leave</h2>
      <form className="applyleave-form" onSubmit={handleSubmit}>
        <label>Employee ID</label>
        <input type="text" name="empId" value={formData.empId} readOnly />

        <label>Manager ID</label>
        <input type="text" name="managerId" value={formData.managerId} readOnly />

        <label>From Date</label>
        <input
          type="date"
          name="fromDate"
          value={formData.fromDate}
          onChange={handleChange}
          min={today}
          required
        />

        <label>To Date</label>
        <input
          type="date"
          name="toDate"
          value={formData.toDate}
          onChange={handleChange}
          min={formData.fromDate || today}
          required
        />

        <label>Leave Type</label>
        <select name="leaveType" value={formData.leaveType} onChange={handleChange}>
          <option value="CASUAL">CASUAL</option>
          <option value="MEDICAL">MEDICAL</option>
        </select>

        <button type="submit">Apply</button>
      </form>
    </div>
  );
};

export default ApplyLeave;
