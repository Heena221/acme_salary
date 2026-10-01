import axios from "axios";

const AUTH_API_URL =
    "http://localhost:8080/api/auth";

const login = (username, password) => {
    return axios.post(
        `${AUTH_API_URL}/login`,
        {
            username,
            password
        }
    );
};

const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
};

const AuthService = {
    login,
    logout
};

export default AuthService;