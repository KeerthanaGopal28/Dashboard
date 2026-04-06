import { Link, useLocation } from "react-router-dom";
import './styles/Sidebar.css';

function Sidebar() {
  const location = useLocation();
  
  const navItems = [
    { to: "/", label: "Dashboard", icon: "📊" },
    { to: "/transactions", label: "Transactions", icon: "💳" },
    { to: "/insights", label: "Insights", icon: "📈" }
  ];

  return (
    <nav className="side-bar">
      {navItems.map((item) => (
        <Link 
          key={item.to}
          to={item.to}
          className={`sidebar-link ${location.pathname === item.to ? 'active' : ''}`}
        >
          <span className="sidebar-icon">{item.icon}</span>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export default Sidebar;