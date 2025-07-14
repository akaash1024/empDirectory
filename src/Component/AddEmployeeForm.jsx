import { useState, useEffect } from "react";
import { useEMP } from "../empDetails/empProvide";
import { departments, roles } from "../EmployeesData";

export const AddEmployeeForm = () => {
  const { editingEmployee, addEmployee, updateEmployee, clearForm, showForm } =
    useEMP();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    role: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when editing employee changes
  useEffect(() => {
    if (editingEmployee) {
      setFormData({
        firstName: editingEmployee.firstName,
        lastName: editingEmployee.lastName,
        email: editingEmployee.email,
        department: editingEmployee.department,
        role: editingEmployee.role,
      });
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        department: "",
        role: "",
      });
    }
  }, [editingEmployee]);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }; 

    const handleSubmit = async (e) => {
      e.preventDefault();

      setIsSubmitting(true);

      try {
        if (editingEmployee) {
          // Update existing employee
          updateEmployee({
            ...editingEmployee,
            ...formData,
          });
        } else {
          // Add new employee
          addEmployee(formData);
        }
      } finally {
        setIsSubmitting(false);
      }
    };

    const handleCancel = () => {
      clearForm();
    };

    if (!showForm) {
      return null;
    }

    return (
      <div className="form-overlay">
        <div className="form-container">
          <form className="emp-form" onSubmit={handleSubmit}>
            <div className="form-header">
              <h2>{editingEmployee ? "Edit Employee" : "Add New Employee"}</h2>
              <button
                type="button"
                className="close-btn"
                onClick={handleCancel}
                aria-label="Close form"
              >
                ×
              </button>
            </div>

            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter first name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter last name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
              />
            </div>

            <div className="form-group">
              <label htmlFor="department">Department *</label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="role">Role *</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
              >
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? editingEmployee
                    ? "Updating..."
                    : "Adding..."
                  : editingEmployee
                  ? "Update Employee"
                  : "Add Employee"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

