import { Outlet } from "react-router-dom";
import Header from "./components/Header.jsx";
import Sidebar from "./Sidebar";
import { useState } from "react";
import './styles/Layout.css'; // Import CSS

function Layout() {
  const [role, setRole] = useState("viewer");
  return (
    <div className="layout-container">
      <Header role={role} setRole={setRole}/>
      <div className="main-content">
        <div className="sidebar-container">
          <Sidebar />
        </div>
        <div className="content-area">
          <Outlet context={{ role}} />
        </div>
      </div>
    </div>
  );
}

export default Layout;