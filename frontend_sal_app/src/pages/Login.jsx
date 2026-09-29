import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response =
                await AuthService.login(
                    username,
                    password
                );

            const {
                token,
                username: loggedInUsername,
                role
            } = response.data;

            // Store authentication information
            localStorage.setItem("token", token);
            localStorage.setItem(
                "username",
                loggedInUsername
            );
            localStorage.setItem("role", role);

            navigate("/");

        } catch (error) {

            console.error(
                "Login failed:",
                error
            );

            setError(
                "Invalid username or password."
            );

        } finally {

            setLoading(false);

        }
    };

    return (

        <div
            className="container-fluid d-flex justify-content-center align-items-center"
            style={{
                minHeight: "100vh",
                backgroundColor: "#f5f6fa"
            }}
        >

            <div
                className="card shadow border-0"
                style={{ width: "400px" }}
            >

                <div className="card-body p-5">

                    <div className="text-center mb-4">

                        <h2>
                            Salary Manager
                        </h2>

                        <p className="text-muted">
                            Sign in to your account
                        </p>

                    </div>

                    {error && (

                        <div className="alert alert-danger">
                            {error}
                        </div>

                    )}

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <label className="form-label">
                                Username
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(event) =>
                                    setUsername(
                                        event.target.value
                                    )
                                }
                                required
                            />

                        </div>

                        <div className="mb-4">

                            <label className="form-label">
                                Password
                            </label>

                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(event) =>
                                    setPassword(
                                        event.target.value
                                    )
                                }
                                required
                            />

                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={loading}
                        >

                            {loading
                                ? "Signing in..."
                                : "Login"}

                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default Login;