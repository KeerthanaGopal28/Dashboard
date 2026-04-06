import { useOutletContext } from "react-router-dom";
import '../styles/Header.css';

const Header = ({role, setRole}) => {
  const isAdmin = role === "admin";
  const toggleRole = () => setRole(isAdmin ? "viewer" : "admin");

  return (
    <div className="header-div">
      <h1 className="header">Financial Dashboard</h1>
      <div className="toggle-container">
        <div 
          className={`role-toggle ${isAdmin ? 'admin-mode' : ''}`}
          onClick={toggleRole}
        >
          <span className="role-text">{isAdmin ? "Admin" : "Viewer"}</span>
          <div className="toggle-knob"></div>
        </div>
      </div>
    </div>
  )
}

export default Header;