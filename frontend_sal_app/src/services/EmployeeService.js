import axios from "axios";

const API_URL = "http://localhost:8080/api/employees";

const getAuthConfig = () => {
    const token = localStorage.getItem("token");

    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

const getAllEmployees = () => {
    return axios.get(API_URL, getAuthConfig());
};

const getEmployeeById = (id) => {
    return axios.get(
        `${API_URL}/${id}`,
        getAuthConfig()
    );
};

const addEmployee = (employee) => {
    return axios.post(
        API_URL,
        employee,
        getAuthConfig()
    );
};

const updateEmployee = (id, employee) => {
    return axios.put(
        `${API_URL}/${id}`,
        employee,
        getAuthConfig()
    );
};

const deleteEmployee = (id) => {
    return axios.delete(
        `${API_URL}/${id}`,
        getAuthConfig()
    );
};

const EmployeeService = {
    getAllEmployees,
    getEmployeeById,
    addEmployee,
    updateEmployee,
    deleteEmployee
};

export default EmployeeService;