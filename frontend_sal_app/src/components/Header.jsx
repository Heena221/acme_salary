import { useNavigate } from "react-router-dom";

function Header() {

    const navigate = useNavigate();

    const username =
        localStorage.getItem("username") || "User";

    const role =
        localStorage.getItem("role") || "";

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");

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

            <div className="d-flex align-items-center gap-3">

                <div className="user-avatar">
                    {username
                        .charAt(0)
                        .toUpperCase()}
                </div>

                <div className="user-details">
                    <strong>{username}</strong>
                    <small>{role}</small>
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