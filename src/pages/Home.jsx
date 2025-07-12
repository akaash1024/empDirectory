import { AddEmployeeForm } from "../Component/AddEmployeeForm";
import { CardComponent } from "../Component/Card";
import { SearchAndFilter } from "../Component/SearchAndFilter";
import { useEMP } from "../empDetails/empProvide";

export const Home = () => {
  const { currentEmployees, filteredEmployees } = useEMP();

  return (
    <main className="dashboard">
      <div className="container">
        <section className="dashboardSection">
          <div className="dashboard-header">
            <h1>Employee Directory</h1>
            <p className="dashboard-subtitle">
              Manage and view all employees in your organization
            </p>
          </div>

          {/* Search and Filter Section */}
          <SearchAndFilter />

          {/* Employee List */}
          <div className="employee-list-section">
            {filteredEmployees.length === 0 ? (
              <div className="no-results">
                <div className="no-results-icon">👥</div>
                <h3>No employees found</h3>
                <p>
                  {currentEmployees.length === 0 &&
                  filteredEmployees.length === 0
                    ? "No employees have been added yet."
                    : "Try adjusting your search or filter criteria."}
                </p>
              </div>
            ) : (
              <div className="emp--list grid grid_Col_Four">
                {currentEmployees.map((emp) => (
                  <CardComponent key={emp.id} empData={emp} />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};
