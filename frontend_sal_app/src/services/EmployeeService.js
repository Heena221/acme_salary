import axios from "axios";

const API_URL = "http://localhost:8080/api/employees";

// Get all employees
const getAllEmployees = () => {
    return axios.get(API_URL);
};

// Add employee
const addEmployee = (employee) => {
    return axios.post(API_URL, employee);
};

// Get employee by ID
const getEmployeeById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

// Update employee
const updateEmployee = (id, employee) => {
    return axios.put(`${API_URL}/${id}`, employee);
};

const deleteEmployee = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

// Keep this AFTER all function declarations
const EmployeeService = {
    getAllEmployees,
    addEmployee,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
};

export default EmployeeService;