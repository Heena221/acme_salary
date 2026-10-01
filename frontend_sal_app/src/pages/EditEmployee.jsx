import {
    useEffect,
    useState
} from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import EmployeeService
    from "../services/EmployeeService";

function EditEmployee() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [employee, setEmployee] =
        useState({
            name: "",
            country: "",
            department: "",
            salary: "",
            currency: ""
        });

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [error, setError] =
        useState("");


    useEffect(() => {

        EmployeeService
            .getEmployeeById(id)

            .then((response) => {
                setEmployee(
                    response.data
                );
            })

            .catch((error) => {

                console.error(
                    "Employee load failed:",
                    error
                );

                setError(
                    "Unable to load employee."
                );

            })

            .finally(() => {
                setLoading(false);
            });

    }, [id]);


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
                .updateEmployee(
                    id,
                    employee
                );

            navigate("/employees");

        } catch (error) {

            console.error(
                "Update failed:",
                error
            );

            setError(
                "Unable to update employee."
            );

        } finally {

            setSaving(false);

        }
    };


    if (loading) {

        return (
            <div className="page-loading">

                <div className="spinner-border text-primary" />

                <p>
                    Loading employee...
                </p>

            </div>
        );
    }


    return (
        <div>

            <div className="page-heading">

                <h2>
                    Edit Employee
                </h2>

                <p>
                    Update employee information
                </p>

            </div>


            <div className="form-card">

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="row g-3">

                        <div className="col-md-6">

                            <label className="form-label">
                                Name
                            </label>

                            <input
                                name="name"
                                className="form-control"
                                value={
                                    employee.name
                                    || ""
                                }
                                onChange={
                                    handleChange
                                }
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
                                value={
                                    employee.country
                                    || ""
                                }
                                onChange={
                                    handleChange
                                }
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
                                value={
                                    employee.department
                                    || ""
                                }
                                onChange={
                                    handleChange
                                }
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
                                value={
                                    employee.salary
                                    ?? ""
                                }
                                onChange={
                                    handleChange
                                }
                                min="0"
                                required
                            />

                        </div>


                        <div className="col-md-6">

                            <label className="form-label">
                                Currency
                            </label>

                            <select
                                name="currency"
                                className="form-select"
                                value={
                                    employee.currency
                                    || ""
                                }
                                onChange={
                                    handleChange
                                }
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


                    <div className="d-flex gap-2 mt-4">

                        <button
                            className="btn btn-primary"
                            disabled={saving}
                        >
                            {saving
                                ? "Updating..."
                                : "Update Employee"}
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

export default EditEmployee;