import { useEffect, useState } from "react";
import EmployeeService from "../services/EmployeeService";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from "recharts";

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
                    "Error fetching dashboard data:",
                    error
                );

                setError(
                    "Unable to load dashboard data."
                );

                setLoading(false);

            });

    }, []);


    // --------------------------------------------------
    // KPI STATISTICS
    // --------------------------------------------------

    const totalEmployees = employees.length;

    const totalDepartments =
        new Set(
            employees
                .map(employee => employee.department)
                .filter(Boolean)
        ).size;

    const totalCountries =
        new Set(
            employees
                .map(employee => employee.country)
                .filter(Boolean)
        ).size;

    const totalCurrencies =
        new Set(
            employees
                .map(employee => employee.currency)
                .filter(Boolean)
        ).size;


    // --------------------------------------------------
    // DEPARTMENT CHART DATA
    // --------------------------------------------------

    const departmentCounts = {};

    employees.forEach((employee) => {

        const department =
            employee.department || "Unknown";

        departmentCounts[department] =
            (departmentCounts[department] || 0) + 1;

    });

    const departmentData =
        Object.entries(departmentCounts)
            .map(([department, count]) => ({
                department,
                employees: count
            }));


    // --------------------------------------------------
    // COUNTRY CHART DATA
    // --------------------------------------------------

    const countryCounts = {};

    employees.forEach((employee) => {

        const country =
            employee.country || "Unknown";

        countryCounts[country] =
            (countryCounts[country] || 0) + 1;

    });

    const countryData =
        Object.entries(countryCounts)
            .map(([country, count]) => ({
                country,
                employees: count
            }));


    // Pie chart colors
    const COLORS = [
        "#0d6efd",
        "#198754",
        "#ffc107",
        "#dc3545",
        "#6f42c1",
        "#0dcaf0",
        "#fd7e14",
        "#20c997"
    ];


    // --------------------------------------------------
    // LOADING
    // --------------------------------------------------

    if (loading) {

        return (
            <div className="text-center py-5">

                <div
                    className="spinner-border text-primary"
                    role="status"
                >
                    <span className="visually-hidden">
                        Loading...
                    </span>
                </div>

                <p className="text-muted mt-3">
                    Loading dashboard...
                </p>

            </div>
        );
    }


    // --------------------------------------------------
    // ERROR
    // --------------------------------------------------

    if (error) {

        return (
            <div className="alert alert-danger">
                {error}
            </div>
        );
    }


    // --------------------------------------------------
    // DASHBOARD
    // --------------------------------------------------

    return (

        <div>

            {/* PAGE HEADER */}

            <div className="mb-4">

                <h2 className="mb-1">
                    Dashboard
                </h2>

                <p className="text-muted mb-0">
                    Overview of your employee and salary
                    management system
                </p>

            </div>


            {/* KPI CARDS */}

            <div className="row g-4 mb-4">


                {/* TOTAL EMPLOYEES */}

                <div className="col-md-6 col-xl-3">

                    <div className="dashboard-card">

                        <div>

                            <p>
                                Total Employees
                            </p>

                            <h2>
                                {totalEmployees}
                            </h2>

                            <small>
                                Active employee records
                            </small>

                        </div>

                        <div className="dashboard-icon">
                            👥
                        </div>

                    </div>

                </div>


                {/* DEPARTMENTS */}

                <div className="col-md-6 col-xl-3">

                    <div className="dashboard-card">

                        <div>

                            <p>
                                Departments
                            </p>

                            <h2>
                                {totalDepartments}
                            </h2>

                            <small>
                                Across organization
                            </small>

                        </div>

                        <div className="dashboard-icon">
                            🏢
                        </div>

                    </div>

                </div>


                {/* COUNTRIES */}

                <div className="col-md-6 col-xl-3">

                    <div className="dashboard-card">

                        <div>

                            <p>
                                Countries
                            </p>

                            <h2>
                                {totalCountries}
                            </h2>

                            <small>
                                Employee locations
                            </small>

                        </div>

                        <div className="dashboard-icon">
                            🌍
                        </div>

                    </div>

                </div>


                {/* CURRENCIES */}

                <div className="col-md-6 col-xl-3">

                    <div className="dashboard-card">

                        <div>

                            <p>
                                Currencies
                            </p>

                            <h2>
                                {totalCurrencies}
                            </h2>

                            <small>
                                Salary currencies
                            </small>

                        </div>

                        <div className="dashboard-icon">
                            💰
                        </div>

                    </div>

                </div>

            </div>


            {/* CHARTS */}

            <div className="row g-4">


                {/* DEPARTMENT BAR CHART */}

                <div className="col-lg-7">

                    <div className="chart-card">

                        <div className="chart-header">

                            <h5>
                                Employees by Department
                            </h5>

                            <small>
                                Distribution across departments
                            </small>

                        </div>

                        <div className="chart-container">

                            {departmentData.length === 0 ? (

                                <div className="text-muted text-center py-5">
                                    No department data available.
                                </div>

                            ) : (

                                <ResponsiveContainer
                                    width="100%"
                                    height={300}
                                >

                                    <BarChart
                                        data={departmentData}
                                        margin={{
                                            top: 10,
                                            right: 20,
                                            left: 0,
                                            bottom: 20
                                        }}
                                    >

                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                        />

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
                                            radius={[6, 6, 0, 0]}
                                        />

                                    </BarChart>

                                </ResponsiveContainer>

                            )}

                        </div>

                    </div>

                </div>


                {/* COUNTRY PIE CHART */}

                <div className="col-lg-5">

                    <div className="chart-card">

                        <div className="chart-header">

                            <h5>
                                Employees by Country
                            </h5>

                            <small>
                                Employee distribution by location
                            </small>

                        </div>

                        <div className="chart-container">

                            {countryData.length === 0 ? (

                                <div className="text-muted text-center py-5">
                                    No country data available.
                                </div>

                            ) : (

                                <ResponsiveContainer
                                    width="100%"
                                    height={300}
                                >

                                    <PieChart>

                                        <Pie
                                            data={countryData}
                                            dataKey="employees"
                                            nameKey="country"
                                            cx="50%"
                                            cy="45%"
                                            outerRadius={90}
                                            label
                                        >

                                            {countryData.map(
                                                (entry, index) => (

                                                    <Cell
                                                        key={
                                                            `cell-${index}`
                                                        }
                                                        fill={
                                                            COLORS[
                                                            index %
                                                            COLORS.length
                                                                ]
                                                        }
                                                    />

                                                )
                                            )}

                                        </Pie>

                                        <Tooltip />

                                        <Legend />

                                    </PieChart>

                                </ResponsiveContainer>

                            )}

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;