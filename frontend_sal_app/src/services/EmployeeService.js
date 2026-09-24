import axios from "axios";

const API_URL = "http://localhost:8080/api/employees";

const getAllEmployees = () => {
    return axios.get(API_URL);
};

const EmployeeService = {
    getAllEmployees,
};

export default EmployeeService;