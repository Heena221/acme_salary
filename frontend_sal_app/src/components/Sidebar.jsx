import React from "react";
import {NavLink} from "react-router-dom";

function Sidebar() {
    return (
        <div className="sidebar">
            <h4 className="sidebar-title">Salary Manager</h4>

            <ul className="sidebar-menu">
                <li>
                    <NavLink to="/" className="sidebar-link">
                        📊 Dashboard
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/employees" className="sidebar-link">
                        👥 Employees
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/employees/add"
                        className="sidebar-link"
                    >
                        ➕ Add Employee
                    </NavLink>
                </li>

                <li>
          <span className="sidebar-link">
            📄 Reports
          </span>
                </li>

            </ul>
        </div>
    );
}

export default Sidebar;
