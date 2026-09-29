import { useNavigate } from "react-router-dom";

function Header() {

    const navigate = useNavigate();

    const username = localStorage.getItem("username");

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");

        navigate("/login");
    };

    return (
        <header className="bg-white shadow-sm p-3">

            <div className="d-flex justify-content-between align-items-center">

                <h5 className="mb-0">
                    Salary Management
                </h5>

                <div className="d-flex align-items-center gap-3">

                    <span>
                        Welcome,{" "}
                        <strong>{username}</strong>
                    </span>

                    <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </div>

        </header>
    );
}

export default Header;