import "./Footer.css";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Employee Directory</h3>
            <p>A modern solution for managing your organization's workforce efficiently and effectively.</p>
          </div>
          
          <div className="footer-section">
            <h4>Features</h4>
            <ul>
              <li>Employee Management</li>
              <li>Search & Filter</li>
              <li>Pagination</li>
              <li>Responsive Design</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact</h4>
            <p>For support or inquiries:</p>
            <p>Email: support@empdirectory.com</p>
            <p>Phone: +1 (555) 123-4567</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Employee Directory. All rights reserved.</p>
          
        </div>
      </div>
    </footer>
  );
};
