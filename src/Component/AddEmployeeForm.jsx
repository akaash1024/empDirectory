import { useState, useEffect } from "react";
import { useEMP } from "../empDetails/empProvide";
import { departments, roles } from "../EmployeesData";

export const AddEmployeeForm = () => {

  const { 
    editingEmployee, 
    addEmployee, 
    updateEmployee, 
    clearForm, 
    showForm 
  } = useEMP();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    role: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when editing employee changes
  useEffect(() => {
    if (editingEmployee) {
      setFormData({
        firstName: editingEmployee.firstName,
        lastName: editingEmployee.lastName,
        email: editingEmployee.email,
        department: editingEmployee.department,
        role: editingEmployee.role
      });
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        department: "",
        role: ""
      });
    }
    setErrors({});
  }, [editingEmployee]);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsSubmitting(true);

    try {
      if (editingEmployee) {
        // Update existing employee
        updateEmployee({
          ...editingEmployee,
          ...formData
        });
      } else {
        // Add new employee
        addEmployee(formData);
      }
    } catch (error) {
      console.error("Error saving employee:", error);
      setErrors({ submit: "Failed to save employee. Please try again." });
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

          {errors.submit && (
            <div className="error-message global-error">
              {errors.submit}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="firstName">First Name *</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className={errors.firstName ? "error" : ""}
              placeholder="Enter first name"
            />
            {errors.firstName && (
              <span className="error-message">{errors.firstName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name *</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className={errors.lastName ? "error" : ""}
              placeholder="Enter last name"
            />
            {errors.lastName && (
              <span className="error-message">{errors.lastName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? "error" : ""}
              placeholder="Enter email address"
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="department">Department *</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className={errors.department ? "error" : ""}
            >
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            {errors.department && (
              <span className="error-message">{errors.department}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="role">Role *</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className={errors.role ? "error" : ""}
            >
              <option value="">Select Role</option>
              {roles.map(role => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            {errors.role && (
              <span className="error-message">{errors.role}</span>
            )}
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
                ? (editingEmployee ? "Updating..." : "Adding...") 
                : (editingEmployee ? "Update Employee" : "Add Employee")
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
