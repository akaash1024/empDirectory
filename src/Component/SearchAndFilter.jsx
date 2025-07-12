import { useState } from "react";
import { useEMP } from "../empDetails/empProvide";
import { departments, roles } from "../EmployeesData";

export const SearchAndFilter = () => {
  const {
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    totalPages,
    filteredEmployees,
    resetFilters,
    setShowForm,
  } = useEMP();

  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const handleSortChange = (field) => {
    setSortBy((prev) => ({
      field,
      direction:
        prev.field === field && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getSortIcon = (field) => {
    if (sortBy.field !== field) return "↕️";
    return sortBy.direction === "asc" ? "↑" : "↓";
  };

  return (
    <div
      className="search-filter-container"
      // style={{ border: "1px solid red" }}
      
    >
      {/* Search Bar */}
      <div className="search-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="search-actions">
          <button
            className="btn btn-secondary"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>

          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            Add Employee
          </button>
        </div>
      </div>

      {/* Filters Section */}
      {showFilters && (
        <div className="filters-section">
          <div className="filters-grid">
            <div className="filter-group">
              <label htmlFor="firstNameFilter">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstNameFilter"
                value={filters.firstName}
                onChange={handleFilterChange}
                placeholder="Filter by first name"
              />
            </div>

            <div className="filter-group">
              <label htmlFor="departmentFilter">Department</label>
              <select
                id="departmentFilter"
                value={filters.department}
                name="department"
                onChange={handleFilterChange}
              >
                <option value="">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="roleFilter">Role</label>
              <select
                id="roleFilter"
                value={filters.role}
                name="role"
                onChange={handleFilterChange}
              >
                <option value="">All Roles</option>
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="sortBy">Sort By</label>
              <div className="sort-buttons">
                <button
                  className={`sort-btn ${
                    sortBy.field === "firstName" ? "active" : ""
                  }`}
                  onClick={() => handleSortChange("firstName")}
                >
                  Name {getSortIcon("firstName")}
                </button>
                <button
                  className={`sort-btn ${
                    sortBy.field === "department" ? "active" : ""
                  }`}
                  onClick={() => handleSortChange("department")}
                >
                  Department {getSortIcon("department")}
                </button>
              </div>
            </div>
          </div>

          <div className="filter-actions">
            <button className="btn btn-secondary" onClick={resetFilters}>
              Reset Filters
            </button>
          </div>
        </div>
      )}

      {/* Results Summary */}
      <div className="results-summary">
        <p>
          Showing {filteredEmployees.length} of {filteredEmployees.length}{" "}
          employees
        </p>
      </div>

      {/* Pagination Controls */}
      <div className="pagination-section">
        <div className="pagination-info">
          <label htmlFor="itemsPerPage">Items per page:</label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        {/* {totalPages > 1 && (
          <div className="pagination-controls">
            <button
              className="btn btn-secondary"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <div className="page-numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    className={`page-btn ${
                      currentPage === page ? "active" : ""
                    }`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            <button
              className="btn btn-secondary"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )} */}

        {totalPages > 1 && (
          <div className="pagination-controls">
            {/* Previous Button */}
            <button
              className="btn btn-secondary"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {/* Page Numbers */}
            <div className="page-numbers">
              {(() => {
                const buttons = [];
                for (let i = 1; i <= totalPages; i++) {
                  buttons.push(
                    <button
                      key={i}
                      className={`page-btn ${
                        currentPage === i ? "active" : ""
                      }`}
                      onClick={() => handlePageChange(i)}
                    >
                      {i}
                    </button>
                  );
                }
                return buttons;
              })()}
              
            </div>

            {/* Next Button */}
            <button
              className="btn btn-secondary"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
