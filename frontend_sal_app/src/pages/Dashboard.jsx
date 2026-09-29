import { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from "recharts";

import EmployeeService from "../services/EmployeeService";

function Dashboard() {

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

                console.error(
                    "Error loading dashboard data:",
                    error
                );

                setError("Unable to load dashboard data.");
                setLoading(false);

            });

    }, []);

    if (loading) {
        return <p>Loading dashboard...</p>;
    }

    if (error) {
        return (
            <div className="alert alert-danger">
                {error}
            </div>
        );
    }

    // -------------------------
    // Dashboard Statistics
    // -------------------------

    const totalEmployees = employees.length;

    const departments = [
        ...new Set(
            employees
                .map((employee) => employee.department)
                .filter(Boolean)
        )
    ];

    const totalDepartments = departments.length;

    // -------------------------
    // Employees by Department
    // -------------------------

    const departmentCounts = {};

    employees.forEach((employee) => {

        const department =
            employee.department || "Unknown";

        departmentCounts[department] =
            (departmentCounts[department] || 0) + 1;

    });

    const departmentData =
        Object.entries(departmentCounts).map(
            ([department, count]) => ({
                department,
                employees: count
            })
        );

    // -------------------------
    // Employees by Country
    // -------------------------

    const countryCounts = {};

    employees.forEach((employee) => {

        const country =
            employee.country || "Unknown";

        countryCounts[country] =
            (countryCounts[country] || 0) + 1;

    });

    const countryData =
        Object.entries(countryCounts).map(
            ([country, count]) => ({
                name: country,
                value: count
            })
        );

    // -------------------------
    // Salary grouped by currency
    // -------------------------

    const salaryByCurrency = {};

    employees.forEach((employee) => {

        const currency =
            employee.currency || "Unknown";

        const salary =
            Number(employee.salary) || 0;

        if (!salaryByCurrency[currency]) {

            salaryByCurrency[currency] = {
                total: 0,
                count: 0
            };

        }

        salaryByCurrency[currency].total += salary;
        salaryByCurrency[currency].count += 1;

    });

    return (
        <div>

            <h2 className="mb-4">
                Dashboard
            </h2>

            {/* Statistics */}

            <div className="row g-4 mb-4">

                <div className="col-md-4">

                    <div className="card shadow-sm border-0 h-100">

                        <div className="card-body">

                            <h6 className="text-muted">
                                Total Employees
                            </h6>

                            <h2>
                                {totalEmployees}
                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card shadow-sm border-0 h-100">

                        <div className="card-body">

                            <h6 className="text-muted">
                                Departments
                            </h6>

                            <h2>
                                {totalDepartments}
                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card shadow-sm border-0 h-100">

                        <div className="card-body">

                            <h6 className="text-muted">
                                Countries
                            </h6>

                            <h2>
                                {
                                    new Set(
                                        employees.map(
                                            (employee) =>
                                                employee.country
                                        )
                                    ).size
                                }
                            </h2>

                        </div>

                    </div>

                </div>

            </div>

            {/* Salary Statistics */}

            <div className="card shadow-sm border-0 mb-4">

                <div className="card-body">

                    <h5 className="mb-3">
                        Salary Summary
                    </h5>

                    <div className="row">

                        {Object.entries(
                            salaryByCurrency
                        ).map(([currency, data]) => (

                            <div
                                className="col-md-3 mb-3"
                                key={currency}
                            >

                                <div className="border rounded p-3">

                                    <h6>
                                        {currency}
                                    </h6>

                                    <div>
                                        <strong>Total:</strong>{" "}
                                        {data.total.toLocaleString()}
                                    </div>

                                    <div>
                                        <strong>Average:</strong>{" "}
                                        {Math.round(
                                            data.total / data.count
                                        ).toLocaleString()}
                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

            {/* Charts */}

            <div className="row g-4">

                {/* Department Chart */}

                <div className="col-lg-7">

                    <div className="card shadow-sm border-0">

                        <div className="card-body">

                            <h5 className="mb-4">
                                Employees by Department
                            </h5>

                            <div
                                style={{
                                    width: "100%",
                                    height: "350px"
                                }}
                            >

                                <ResponsiveContainer>

                                    <BarChart
                                        data={departmentData}
                                    >

                                        <XAxis
                                            dataKey="department"
                                        />

                                        <YAxis
                                            allowDecimals={false}
                                        />

                                        <Tooltip />

                                        <Bar
                                            dataKey="employees"
                                            fill="#0d6efd"
                                        />

                                    </BarChart>

                                </ResponsiveContainer>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Country Chart */}

                <div className="col-lg-5">

                    <div className="card shadow-sm border-0">

                        <div className="card-body">

                            <h5 className="mb-4">
                                Employees by Country
                            </h5>

                            <div
                                style={{
                                    width: "100%",
                                    height: "350px"
                                }}
                            >

                                <ResponsiveContainer>

                                    <PieChart>

                                        <Pie
                                            data={countryData}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={100}
                                            label
                                        >

                                            {countryData.map(
                                                (_, index) => (

                                                    <Cell
                                                        key={index}
                                                        fill={
                                                            [
                                                                "#0d6efd",
                                                                "#198754",
                                                                "#ffc107",
                                                                "#dc3545",
                                                                "#6f42c1",
                                                                "#0dcaf0"
                                                            ][index % 6]
                                                        }
                                                    />

                                                )
                                            )}

                                        </Pie>

                                        <Tooltip />

                                        <Legend />

                                    </PieChart>

                                </ResponsiveContainer>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;