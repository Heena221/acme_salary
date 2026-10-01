import {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import EmployeeService
    from "../services/EmployeeService";

function Employees() {

    const navigate = useNavigate();

    const [employees, setEmployees] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [searchName, setSearchName] =
        useState("");

    const [searchCountry, setSearchCountry] =
        useState("");

    const [
        searchDepartment,
        setSearchDepartment
    ] = useState("");

    const [sortField, setSortField] =
        useState("employeeId");

    const [sortDirection, setSortDirection] =
        useState("asc");

    const [currentPage, setCurrentPage] =
        useState(1);

    const employeesPerPage = 10;


    const loadEmployees = () => {

        setLoading(true);

        EmployeeService
            .getAllEmployees()

            .then((response) => {

                setEmployees(
                    response.data
                );

                setError("");

            })

            .catch((error) => {

                console.error(
                    "Error fetching employees:",
                    error
                );

                setError(
                    "Unable to load employees."
                );

            })

            .finally(() => {
                setLoading(false);
            });
    };


    useEffect(() => {
        loadEmployees();
    }, []);


    useEffect(() => {
        setCurrentPage(1);
    }, [
        searchName,
        searchCountry,
        searchDepartment
    ]);


    const handleSort = (field) => {

        if (sortField === field) {

            setSortDirection(
                sortDirection === "asc"
                    ? "desc"
                    : "asc"
            );

        } else {

            setSortField(field);
            setSortDirection("asc");

        }
    };


    const filteredEmployees =
        employees.filter((employee) => {

            const name =
                employee.name
                    ?.toLowerCase()
                || "";

            const country =
                employee.country
                    ?.toLowerCase()
                || "";

            const department =
                employee.department
                    ?.toLowerCase()
                || "";

            return (
                name.includes(
                    searchName.toLowerCase()
                )
                &&
                country.includes(
                    searchCountry.toLowerCase()
                )
                &&
                department.includes(
                    searchDepartment.toLowerCase()
                )
            );
        });


    const sortedEmployees =
        [...filteredEmployees]
            .sort((a, b) => {

                let first =
                    a[sortField];

                let second =
                    b[sortField];

                if (
                    typeof first === "string"
                ) {
                    first =
                        first.toLowerCase();
                }

                if (
                    typeof second === "string"
                ) {
                    second =
                        second.toLowerCase();
                }

                if (first < second) {
                    return sortDirection === "asc"
                        ? -1
                        : 1;
                }

                if (first > second) {
                    return sortDirection === "asc"
                        ? 1
                        : -1;
                }

                return 0;
            });


    const totalPages =
        Math.max(
            1,
            Math.ceil(
                sortedEmployees.length /
                employeesPerPage
            )
        );


    const indexOfLast =
        currentPage *
        employeesPerPage;

    const indexOfFirst =
        indexOfLast -
        employeesPerPage;

    const currentEmployees =
        sortedEmployees.slice(
            indexOfFirst,
            indexOfLast
        );


    const handleDelete = async (id) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this employee?"
            );

        if (!confirmed) {
            return;
        }

        try {

            await EmployeeService
                .deleteEmployee(id);

            setEmployees(
                employees.filter(
                    employee =>
                        employee.employeeId !== id
                )
            );

        } catch (error) {

            console.error(
                "Delete failed:",
                error
            );

            alert(
                "Unable to delete employee."
            );
        }
    };


    const sortIcon = (field) => {

        if (sortField !== field) {
            return " ↕";
        }

        return sortDirection === "asc"
            ? " ↑"
            : " ↓";
    };


    if (loading) {

        return (
            <div className="page-loading">

                <div
                    className="spinner-border text-primary"
                />

                <p>
                    Loading employees...
                </p>

            </div>
        );
    }


    return (
        <div>

            <div className="page-heading-row">

                <div className="page-heading">

                    <h2>
                        Employees
                    </h2>

                    <p>
                        Manage employee records and
                        salary information
                    </p>

                </div>

                <button
                    className="btn btn-primary"
                    onClick={() =>
                        navigate(
                            "/employees/add"
                        )
                    }
                >
                    + Add Employee
                </button>

            </div>


            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}


            <div className="employee-table-card">

                <div className="table-responsive">

                    <table className="table">

                        <thead>

                        <tr>

                            <th
                                onClick={() =>
                                    handleSort(
                                        "employeeId"
                                    )
                                }
                            >
                                ID
                                {sortIcon(
                                    "employeeId"
                                )}
                            </th>

                            <th
                                onClick={() =>
                                    handleSort(
                                        "name"
                                    )
                                }
                            >
                                Name
                                {sortIcon("name")}
                            </th>

                            <th
                                onClick={() =>
                                    handleSort(
                                        "country"
                                    )
                                }
                            >
                                Country
                                {sortIcon(
                                    "country"
                                )}
                            </th>

                            <th
                                onClick={() =>
                                    handleSort(
                                        "department"
                                    )
                                }
                            >
                                Department
                                {sortIcon(
                                    "department"
                                )}
                            </th>

                            <th
                                onClick={() =>
                                    handleSort(
                                        "salary"
                                    )
                                }
                            >
                                Salary
                                {sortIcon(
                                    "salary"
                                )}
                            </th>

                            <th>
                                Currency
                            </th>

                            <th>
                                Actions
                            </th>

                        </tr>


                        <tr className="search-row">

                            <th />

                            <th>

                                <input
                                    className="form-control form-control-sm"
                                    placeholder="Search name"
                                    value={searchName}
                                    onChange={(e) =>
                                        setSearchName(
                                            e.target.value
                                        )
                                    }
                                />

                            </th>

                            <th>

                                <input
                                    className="form-control form-control-sm"
                                    placeholder="Search country"
                                    value={searchCountry}
                                    onChange={(e) =>
                                        setSearchCountry(
                                            e.target.value
                                        )
                                    }
                                />

                            </th>

                            <th>

                                <input
                                    className="form-control form-control-sm"
                                    placeholder="Search department"
                                    value={
                                        searchDepartment
                                    }
                                    onChange={(e) =>
                                        setSearchDepartment(
                                            e.target.value
                                        )
                                    }
                                />

                            </th>

                            <th />
                            <th />
                            <th />

                        </tr>

                        </thead>


                        <tbody>

                        {currentEmployees
                            .map(employee => (

                                <tr
                                    key={
                                        employee.employeeId
                                    }
                                >

                                    <td>
                                        {
                                            employee.employeeId
                                        }
                                    </td>

                                    <td className="fw-semibold">
                                        {employee.name}
                                    </td>

                                    <td>
                                        {employee.country}
                                    </td>

                                    <td>
                                        {
                                            employee.department
                                        }
                                    </td>

                                    <td className="fw-semibold">
                                        {Number(
                                            employee.salary
                                        ).toLocaleString()}
                                    </td>

                                    <td>

                                        <span className="currency-badge">
                                            {
                                                employee.currency
                                            }
                                        </span>

                                    </td>

                                    <td>

                                        <div className="d-flex gap-2">

                                            <button
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={() =>
                                                    navigate(
                                                        `/employees/edit/${employee.employeeId}`
                                                    )
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() =>
                                                    handleDelete(
                                                        employee.employeeId
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))}


                        {currentEmployees.length === 0 && (

                            <tr>

                                <td
                                    colSpan="7"
                                    className="text-center py-5"
                                >

                                    <div className="fs-3">
                                        👥
                                    </div>

                                    <strong>
                                        No employees found
                                    </strong>

                                    <div className="text-muted small mt-1">
                                        Try changing your
                                        search criteria.
                                    </div>

                                </td>

                            </tr>

                        )}

                        </tbody>

                    </table>

                </div>


                <div className="table-footer">

                    <small className="text-muted">

                        Showing{" "}

                        {sortedEmployees.length === 0
                            ? 0
                            : indexOfFirst + 1}

                        {" - "}

                        {Math.min(
                            indexOfLast,
                            sortedEmployees.length
                        )}

                        {" of "}

                        {sortedEmployees.length}

                    </small>


                    <div className="pagination-controls">

                        <button
                            className="btn btn-sm btn-outline-secondary"
                            disabled={
                                currentPage === 1
                            }
                            onClick={() =>
                                setCurrentPage(
                                    currentPage - 1
                                )
                            }
                        >
                            Previous
                        </button>

                        <span>
                            Page {currentPage}
                            {" of "}
                            {totalPages}
                        </span>

                        <button
                            className="btn btn-sm btn-outline-secondary"
                            disabled={
                                currentPage >=
                                totalPages
                            }
                            onClick={() =>
                                setCurrentPage(
                                    currentPage + 1
                                )
                            }
                        >
                            Next
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Employees;