import { NavLink } from "react-router-dom";

function Sidebar() {

    const getLinkClass = ({ isActive }) =>
        `sidebar-link ${
            isActive ? "active" : ""
        }`;

    return (
        <aside className="sidebar">

            <div className="sidebar-brand">

                <div className="brand-icon">
                    ₹
                </div>

                <div>
                    <h5>
                        Salary Manager
                    </h5>

                    <small>
                        Employee Portal
                    </small>
                </div>

            </div>

            <div className="sidebar-menu">

                <p className="sidebar-title">
                    MAIN MENU
                </p>

                <NavLink
                    to="/"
                    end
                    className={getLinkClass}
                >
                    <span>📊</span>
                    Dashboard
                </NavLink>

                <NavLink
                    to="/employees"
                    className={getLinkClass}
                >
                    <span>👥</span>
                    Employees
                </NavLink>

                <NavLink
                    to="/employees/add"
                    className={getLinkClass}
                >
                    <span>➕</span>
                    Add Employee
                </NavLink>

                <NavLink
                    to="/reports"
                    className={getLinkClass}
                >
                    <span>📄</span>
                    Reports
                </NavLink>

            </div>

            <div className="sidebar-footer">
                <small>
                    Salary Management System
                </small>
            </div>

        </aside>
    );
}

export default Sidebar;