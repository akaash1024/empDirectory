import { useEMP } from "../../empDetails/empProvide";
import "./Header.css";

export const Header = () => {
  const { empCount } = useEMP();
  //console.log(empCount)
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <div className="logo-section">
            <h1 className="logo">Employee Directory</h1>
            <p className="tagline">Manage your workforce efficiently</p>
          </div>

          <div className="header-actions">
            <div className="stats">
              <span className="stat-item">
                <span className="stat-number">{empCount}</span>
                <span className="stat-label">Employees</span>
              </span>
              <span className="stat-item">
                <span className="stat-number">8</span>
                <span className="stat-label">Departments</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
