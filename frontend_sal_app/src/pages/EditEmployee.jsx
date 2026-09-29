import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

function EditEmployee() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [employee, setEmployee] = useState({
        name: "",
        country: "",
        department: "",
        salary: "",
        currency: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        EmployeeService.getEmployeeById(id)
            .then((response) => {

                setEmployee(response.data);
                setLoading(false);

            })
            .catch((error) => {

                console.error("Error fetching employee:", error);
                setError("Unable to load employee.");
                setLoading(false);

            });

    }, [id]);

    const handleChange = (event) => {

        const { name, value } = event.target;

        setEmployee({
            ...employee,
            [name]: value
        });

    };

    const handleSubmit = (event) => {

        event.preventDefault();

        EmployeeService.updateEmployee(id, employee)
            .then(() => {

                console.log("Employee updated successfully");

                navigate("/employees");

            })
            .catch((error) => {

                console.error("Error updating employee:", error);

                setError("Failed to update employee.");

            });

    };

    if (loading) {
        return <p>Loading employee...</p>;
    }

    return (
        <div>

            <h2 className="mb-4">
                Edit Employee
            </h2>

            <div className="card shadow-sm border-0">

                <div className="card-body">

                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <label className="form-label">
                                Employee Name
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={employee.name || ""}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Country
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                name="country"
                                value={employee.country || ""}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Department
                            </label>

                            <select
                                className="form-select"
                                name="department"
                                value={employee.department || ""}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select Department
                                </option>

                                <option value="Engineering">
                                    Engineering
                                </option>

                                <option value="Finance">
                                    Finance
                                </option>

                                <option value="HR">
                                    HR
                                </option>

                                <option value="Marketing">
                                    Marketing
                                </option>

                                <option value="Sales">
                                    Sales
                                </option>

                                <option value="Operations">
                                    Operations
                                </option>

                            </select>

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Salary
                            </label>

                            <input
                                type="number"
                                className="form-control"
                                name="salary"
                                value={employee.salary || ""}
                                onChange={handleChange}
                                min="0"
                                required
                            />

                        </div>

                        <div className="mb-4">

                            <label className="form-label">
                                Currency
                            </label>

                            <select
                                className="form-select"
                                name="currency"
                                value={employee.currency || ""}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select Currency
                                </option>

                                <option value="INR">INR</option>
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="GBP">GBP</option>

                            </select>

                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary me-2"
                        >
                            Update Employee
                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate("/employees")}
                        >
                            Cancel
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default EditEmployee;