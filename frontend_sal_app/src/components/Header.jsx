import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

function Header() {

    const navigate = useNavigate();

    const username =
        localStorage.getItem("username")
        || "User";

    const role =
        localStorage.getItem("role")
        || "";

    const handleLogout = () => {

        AuthService.logout();

        navigate("/login");
    };

    return (
        <header className="app-header">

            <div>

                <h5 className="mb-0">
                    Salary Management
                </h5>

                <small className="text-muted">
                    Employee Management Portal
                </small>

            </div>

            <div className="header-user">

                <div className="user-avatar">
                    {username
                        .charAt(0)
                        .toUpperCase()}
                </div>

                <div className="user-details">

                    <strong>
                        {username}
                    </strong>

                    <small>
                        {role}
                    </small>

                </div>

                <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </header>
    );
}

export default Header;