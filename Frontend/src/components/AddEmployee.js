import React, { useState } from "react";

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    empId: "",
    firstName: "",
    lastName: "",
    job: "",
    managerId: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.empId.trim()) newErrors.empId = "Employee ID is required";
    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required";
    if (!formData.job.trim()) newErrors.job = "Job is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccessMessage("");
      return;
    }

    console.log("Employee Data:", formData);
    setSuccessMessage("Employee added successfully!");

    // Reset form
    setFormData({
      empId: "",
      firstName: "",
      lastName: "",
      job: "",
      managerId: "",
      email: "",
    });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow">
            <h3 className="text-center mb-4">Add Employee</h3>

            {successMessage && <div className="alert alert-success">{successMessage}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Employee ID</label>
                <input
                  type="text"
                  name="empId"
                  value={formData.empId}
                  onChange={handleChange}
                  className={`form-control ${errors.empId ? "is-invalid" : ""}`}
                />
                {errors.empId && <div className="invalid-feedback">{errors.empId}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                />
                {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Job</label>
                <input
                  type="text"
                  name="job"
                  value={formData.job}
                  onChange={handleChange}
                  className={`form-control ${errors.job ? "is-invalid" : ""}`}
                />
                {errors.job && <div className="invalid-feedback">{errors.job}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Manager ID</label>
                <input
                  type="text"
                  name="managerId"
                  value={formData.managerId}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Add Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
