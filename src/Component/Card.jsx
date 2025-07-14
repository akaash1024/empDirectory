import { useState } from "react";
import { useEMP } from "../empDetails/empProvide";

export const CardComponent = ({ empData }) => {
  const { firstName, lastName, email, department, role, empProfile, id } =
    empData;
  const { editEmployee, deleteEmployee } = useEMP();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleEdit = () => {
    editEmployee(empData);
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    deleteEmployee(id);
    setShowDeleteConfirm(false);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <div className="card emp-card">
        {/* <div className="emp-card--imgName" style={{border:"1px solid red"}}> */}
        <div className="emp-card--imgName">
          <div className="card-Container--img">
            <img src={empProfile} alt={`${firstName} ${lastName}`} />
          </div>

          <div className="card-Container--details">
            <div className="employee-id">
              <span className="id-label">ID:</span> {id}
            </div>

            <h3 className="employee-name">
              {firstName} {lastName}
            </h3>

            <p className="employee-email">
              {email.length > 20 ? email.slice(0,20) + "..." : "false"}
            </p>

            <div className="employee-info">
              <p className="info-item">
                <span className="label">Department:</span> {department.length > 15 ? department.slice(0,10) + "..." : department}
              </p>
              <p className="info-item">
                <span className="label">Role:</span> {role}
              </p>
            </div>

            <div className="card-btn--group">
              <button
                className="btn btn-edit"
                onClick={handleEdit}
                title="Click to edit this employee"
              >
                Edit
              </button>
              <button
                className="btn btn-delete"
                onClick={handleDelete}
                title="Click to delete this employee"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Confirm Delete</h3>
            </div>
            <div className="modal-body">
              <p>
                Are you sure you want to delete{" "}
                <strong>
                  {firstName} {lastName}
                </strong>
                ?
              </p>
              <p className="warning-text">This action cannot be undone.</p>
            </div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={cancelDelete}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
