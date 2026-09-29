import { useEffect, useState } from "react";
import EmployeeService from "../services/EmployeeService";

function Reports() {

    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        EmployeeService.getAllEmployees()
            .then((response) => {
                setEmployees(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error loading reports:", error);
                setError("Unable to load report data.");
                setLoading(false);
            });

    }, []);

    if (loading) {
        return <p>Loading reports...</p>;
    }

    if (error) {
        return (
            <div className="alert alert-danger">
                {error}
            </div>
        );
    }

    // Department Report

    const departmentReport = {};

    employees.forEach((employee) => {

        const department =
            employee.department || "Unknown";

        if (!departmentReport[department]) {
            departmentReport[department] = 0;
        }

        departmentReport[department]++;
    });

    // Country Report

    const countryReport = {};

    employees.forEach((employee) => {

        const country =
            employee.country || "Unknown";

        if (!countryReport[country]) {
            countryReport[country] = 0;
        }

        countryReport[country]++;
    });

    // Salary Report by Currency

    const salaryReport = {};

    employees.forEach((employee) => {

        const currency =
            employee.currency || "Unknown";

        const salary =
            Number(employee.salary) || 0;

        if (!salaryReport[currency]) {
            salaryReport[currency] = {
                count: 0,
                total: 0
            };
        }

        salaryReport[currency].count++;
        salaryReport[currency].total += salary;
    });

    return (
        <div>

            <div className="mb-4">
                <h2>Reports</h2>

                <p className="text-muted">
                    Employee and salary summary reports
                </p>
            </div>

            {/* Department Report */}

            <div className="card shadow-sm border-0 mb-4">

                <div className="card-body">

                    <h5 className="mb-3">
                        Department Summary
                    </h5>

                    <div className="table-responsive">

                        <table className="table table-hover">

                            <thead className="table-dark">
                            <tr>
                                <th>Department</th>
                                <th>Employees</th>
                            </tr>
                            </thead>

                            <tbody>

                            {Object.entries(
                                departmentReport
                            ).map(([department, count]) => (

                                <tr key={department}>
                                    <td>{department}</td>
                                    <td>{count}</td>
                                </tr>

                            ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

            {/* Country Report */}

            <div className="card shadow-sm border-0 mb-4">

                <div className="card-body">

                    <h5 className="mb-3">
                        Country Summary
                    </h5>

                    <div className="table-responsive">

                        <table className="table table-hover">

                            <thead className="table-dark">
                            <tr>
                                <th>Country</th>
                                <th>Employees</th>
                            </tr>
                            </thead>

                            <tbody>

                            {Object.entries(
                                countryReport
                            ).map(([country, count]) => (

                                <tr key={country}>
                                    <td>{country}</td>
                                    <td>{count}</td>
                                </tr>

                            ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

            {/* Salary Report */}

            <div className="card shadow-sm border-0">

                <div className="card-body">

                    <h5 className="mb-3">
                        Salary Summary
                    </h5>

                    <div className="table-responsive">

                        <table className="table table-hover">

                            <thead className="table-dark">

                            <tr>
                                <th>Currency</th>
                                <th>Employees</th>
                                <th>Total Salary</th>
                                <th>Average Salary</th>
                            </tr>

                            </thead>

                            <tbody>

                            {Object.entries(
                                salaryReport
                            ).map(([currency, data]) => (

                                <tr key={currency}>

                                    <td>{currency}</td>

                                    <td>
                                        {data.count}
                                    </td>

                                    <td>
                                        {data.total.toLocaleString()}
                                    </td>

                                    <td>
                                        {Math.round(
                                            data.total / data.count
                                        ).toLocaleString()}
                                    </td>

                                </tr>

                            ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Reports;