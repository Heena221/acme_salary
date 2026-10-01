import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

function AddEmployee() {

    const navigate = useNavigate();

    const [employee, setEmployee] =
        useState({
            name: "",
            country: "",
            department: "",
            salary: "",
            currency: ""
        });

    const [saving, setSaving] =
        useState(false);

    const [error, setError] =
        useState("");


    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;

        setEmployee({
            ...employee,
            [name]: value
        });
    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        setSaving(true);
        setError("");

        try {

            await EmployeeService
                .addEmployee(employee);

            navigate("/employees");

        } catch (error) {

            console.error(
                "Add employee failed:",
                error
            );

            setError(
                "Unable to add employee."
            );

        } finally {

            setSaving(false);

        }
    };


    return (
        <div>

            <div className="page-heading">

                <h2>
                    Add Employee
                </h2>

                <p>
                    Create a new employee record
                </p>

            </div>


            <div className="form-card">

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <EmployeeFields
                        employee={employee}
                        handleChange={handleChange}
                    />

                    <div className="d-flex gap-2 mt-4">

                        <button
                            className="btn btn-primary"
                            disabled={saving}
                        >
                            {saving
                                ? "Saving..."
                                : "Save Employee"}
                        </button>

                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() =>
                                navigate(
                                    "/employees"
                                )
                            }
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}


function EmployeeFields({
                            employee,
                            handleChange
                        }) {

    return (
        <div className="row g-3">

            <div className="col-md-6">

                <label className="form-label">
                    Name
                </label>

                <input
                    name="name"
                    className="form-control"
                    value={employee.name}
                    onChange={handleChange}
                    required
                />

            </div>


            <div className="col-md-6">

                <label className="form-label">
                    Country
                </label>

                <input
                    name="country"
                    className="form-control"
                    value={employee.country}
                    onChange={handleChange}
                    required
                />

            </div>


            <div className="col-md-6">

                <label className="form-label">
                    Department
                </label>

                <input
                    name="department"
                    className="form-control"
                    value={employee.department}
                    onChange={handleChange}
                    required
                />

            </div>


            <div className="col-md-6">

                <label className="form-label">
                    Salary
                </label>

                <input
                    type="number"
                    name="salary"
                    className="form-control"
                    value={employee.salary}
                    onChange={handleChange}
                    required
                    min="0"
                />

            </div>


            <div className="col-md-6">

                <label className="form-label">
                    Currency
                </label>

                <select
                    name="currency"
                    className="form-select"
                    value={employee.currency}
                    onChange={handleChange}
                    required
                >

                    <option value="">
                        Select currency
                    </option>

                    <option value="INR">
                        INR
                    </option>

                    <option value="USD">
                        USD
                    </option>

                    <option value="EUR">
                        EUR
                    </option>

                    <option value="GBP">
                        GBP
                    </option>

                </select>

            </div>

        </div>
    );
}

export default AddEmployee;