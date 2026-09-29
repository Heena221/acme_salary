import { useEffect, useState } from "react";
import EmployeeService from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

function Employees() {

    const [employees, setEmployees] = useState([]);
    const [filters, setFilters] = useState({
        id: "",
        name: "",
        country: "",
        department: "",
        salary: "",
        currency: ""
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: "asc"
    });

    useEffect(() => {

        EmployeeService.getAllEmployees()
            .then((response) => {
                setEmployees(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching employees:", error);
                setError("Unable to load employees.");
                setLoading(false);
            });

    }, []);

    if (loading) {
        return <p>Loading employees...</p>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }


    const handleDelete = (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this employee?"
        );

        if (!confirmDelete) {
            return;
        }

        EmployeeService.deleteEmployee(id)
            .then(() => {

                console.log("Employee deleted successfully");

                setEmployees(
                    employees.filter(
                        (employee) => employee.employeeId !== id
                    )
                );

            })
            .catch((error) => {

                console.error("Error deleting employee:", error);

                alert("Failed to delete employee.");

            });
    };

    const handleFilterChange = (event) => {
        const { name, value } = event.target;

        setFilters({
            ...filters,
            [name]: value
        });
    };

    const filteredEmployees = employees.filter((employee) => {

        return (
            employee.employeeId
                ?.toString()
                .includes(filters.id) &&

            employee.name
                ?.toLowerCase()
                .includes(filters.name.toLowerCase()) &&

            employee.country
                ?.toLowerCase()
                .includes(filters.country.toLowerCase()) &&

            employee.department
                ?.toLowerCase()
                .includes(filters.department.toLowerCase()) &&

            employee.salary
                ?.toString()
                .includes(filters.salary) &&

            employee.currency
                ?.toLowerCase()
                .includes(filters.currency.toLowerCase())
        );
    });

    const sortedEmployees = [...filteredEmployees].sort((a, b) => {

        if (!sortConfig.key) {
            return 0;
        }

        const valueA = a[sortConfig.key];
        const valueB = b[sortConfig.key];

        if (typeof valueA === "string") {

            const result = valueA.localeCompare(valueB);

            return sortConfig.direction === "asc"
                ? result
                : -result;
        }

        if (valueA < valueB) {
            return sortConfig.direction === "asc" ? -1 : 1;
        }

        if (valueA > valueB) {
            return sortConfig.direction === "asc" ? 1 : -1;
        }

        return 0;
    });


    const handleSort = (key) => {

        let direction = "asc";

        if (
            sortConfig.key === key &&
            sortConfig.direction === "asc"
        ) {
            direction = "desc";
        }

        setSortConfig({
            key,
            direction
        });
    };

    return (
        <div>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Employees</h2>

                <button
                    className="btn btn-primary"
                    onClick={() => navigate("/employees/add")}
                >
                    + Add Employee
                </button>
            </div>

            <div className="card shadow-sm border-0">

                <div className="card-body">

                    <div className="table-responsive">

                        <table className="table table-hover align-middle">

                            <thead className="table-dark">

                            {/* Column Names */}

                            <tr>

                                <th
                                    onClick={() => handleSort("employeeId")}
                                    style={{ cursor: "pointer" }}
                                >
                                    ID ↕
                                </th>

                                <th
                                    onClick={() => handleSort("name")}
                                    style={{ cursor: "pointer" }}
                                >
                                    Name ↕
                                </th>

                                <th
                                    onClick={() => handleSort("country")}
                                    style={{ cursor: "pointer" }}
                                >
                                    Country ↕
                                </th>

                                <th
                                    onClick={() => handleSort("department")}
                                    style={{ cursor: "pointer" }}
                                >
                                    Department ↕
                                </th>

                                <th
                                    onClick={() => handleSort("salary")}
                                    style={{ cursor: "pointer" }}
                                >
                                    Salary ↕
                                </th>

                                <th
                                    onClick={() => handleSort("currency")}
                                    style={{ cursor: "pointer" }}
                                >
                                    Currency ↕
                                </th>

                                <th>Actions</th>

                            </tr>

                            {/* Column Search */}

                            <tr>

                                <th>
                                    <input
                                        type="text"
                                        name="id"
                                        className="form-control form-control-sm"
                                        placeholder="ID"
                                        value={filters.id}
                                        onChange={handleFilterChange}
                                    />
                                </th>

                                <th>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control form-control-sm"
                                        placeholder="Search name"
                                        value={filters.name}
                                        onChange={handleFilterChange}
                                    />
                                </th>

                                <th>
                                    <input
                                        type="text"
                                        name="country"
                                        className="form-control form-control-sm"
                                        placeholder="Search country"
                                        value={filters.country}
                                        onChange={handleFilterChange}
                                    />
                                </th>

                                <th>
                                    <input
                                        type="text"
                                        name="department"
                                        className="form-control form-control-sm"
                                        placeholder="Search dept"
                                        value={filters.department}
                                        onChange={handleFilterChange}
                                    />
                                </th>

                                <th>
                                    <input
                                        type="text"
                                        name="salary"
                                        className="form-control form-control-sm"
                                        placeholder="Salary"
                                        value={filters.salary}
                                        onChange={handleFilterChange}
                                    />
                                </th>

                                <th>
                                    <input
                                        type="text"
                                        name="currency"
                                        className="form-control form-control-sm"
                                        placeholder="Currency"
                                        value={filters.currency}
                                        onChange={handleFilterChange}
                                    />
                                </th>

                                <th></th>

                            </tr>

                            </thead>

                            <tbody>

                            {filteredEmployees.length > 0 ? (

                                filteredEmployees.map((employee) => (

                                    <tr key={employee.employeeId}>

                                        <td>{employee.employeeId}</td>

                                        <td>{employee.name}</td>

                                        <td>{employee.country}</td>

                                        <td>{employee.department}</td>

                                        <td>
                                            {Number(employee.salary).toLocaleString()}
                                        </td>

                                        <td>{employee.currency}</td>

                                        <td>

                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() =>
                                                    navigate(`/employees/edit/${employee.employeeId}`)
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDelete(employee.employeeId)}
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>
                                    <td colSpan="7" className="text-center">
                                        No employees found
                                    </td>
                                </tr>

                            )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Employees;