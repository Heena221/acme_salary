import React from "react";

function Sidebar() {
    return (
        <div className="sidebar">
            <h4 className="sidebar-title">Salary Manager</h4>

            <ul className="sidebar-menu">
                <li>📊 Dashboard</li>
                <li>👥 Employees</li>
                <li>➕ Add Employee</li>
                <li>📄 Reports</li>
            </ul>
        </div>
    );
}

export default Sidebar;
