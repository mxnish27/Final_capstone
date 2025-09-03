import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import toast from "react-hot-toast";

const GetEmployee = () => {
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const logedinUser = sessionStorage.getItem("employee");
    if (logedinUser) {
      const employeeData = JSON.parse(logedinUser);
      setEmployee(employeeData);
      toast.success(`Welcome Back ${employeeData.firstName}`);
    }
  }, []);

  if (!employee) return <p>Loading employee details...</p>;

  return (
    <div className="employee-card">
      <h2>{employee.job === 'Manager' ? "Manager" : "Employee"} Profile</h2>
      <div className="employee-details">
        <p>
          <strong>Name:</strong> {employee.firstName} {employee.lastName}
        </p>
        <p>
          <strong>Email:</strong> {employee.email}
        </p>
        <p>
          <strong>Role:</strong> {employee.job}
        </p>
        <p>
          <strong>Mobile No:</strong> {employee.mobile}
        </p>
      </div>
    </div>
  );
};

export default GetEmployee;