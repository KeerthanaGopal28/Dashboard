import { Link, useLocation } from "react-router-dom";
import './styles/Sidebar.css';

function Sidebar() {
  const location = useLocation();
  
  const navItems = [
    { to: "/", label: "Dashboard"},
    { to: "/transactions", label: "Transactions"},
    { to: "/insights", label: "Insights"}
  ];

  return (
    <nav className="side-bar">
      {navItems.map((item) => (
        <Link 
          key={item.to}
          to={item.to}
          className={`sidebar-link ${location.pathname === item.to ? 'active' : ''}`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export default Sidebar;