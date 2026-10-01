import {
    useEffect,
    useState
} from "react";

import EmployeeService
    from "../services/EmployeeService";

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

    const [employees, setEmployees] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {

        EmployeeService
            .getAllEmployees()

            .then((response) => {

                setEmployees(
                    response.data
                );

            })

            .catch((error) => {

                console.error(
                    "Dashboard error:",
                    error
                );

                setError(
                    "Unable to load dashboard data."
                );

            })

            .finally(() => {
                setLoading(false);
            });

    }, []);

    const totalEmployees =
        employees.length;

    const totalDepartments =
        new Set(
            employees
                .map(e => e.department)
                .filter(Boolean)
        ).size;

    const totalCountries =
        new Set(
            employees
                .map(e => e.country)
                .filter(Boolean)
        ).size;

    const totalCurrencies =
        new Set(
            employees
                .map(e => e.currency)
                .filter(Boolean)
        ).size;


    const departmentCounts = {};

    employees.forEach((employee) => {

        const department =
            employee.department
            || "Unknown";

        departmentCounts[department] =
            (departmentCounts[department] || 0)
            + 1;

    });

    const departmentData =
        Object.entries(
            departmentCounts
        ).map(([department, count]) => ({
            department,
            employees: count
        }));


    const countryCounts = {};

    employees.forEach((employee) => {

        const country =
            employee.country
            || "Unknown";

        countryCounts[country] =
            (countryCounts[country] || 0)
            + 1;

    });

    const countryData =
        Object.entries(
            countryCounts
        ).map(([country, count]) => ({
            country,
            employees: count
        }));


    const COLORS = [
        "#0d6efd",
        "#198754",
        "#ffc107",
        "#dc3545",
        "#6f42c1",
        "#0dcaf0",
        "#fd7e14"
    ];


    if (loading) {

        return (
            <div className="page-loading">

                <div
                    className="spinner-border text-primary"
                />

                <p>
                    Loading dashboard...
                </p>

            </div>
        );
    }


    if (error) {

        return (
            <div className="alert alert-danger">
                {error}
            </div>
        );
    }


    return (
        <div>

            <div className="page-heading">

                <h2>
                    Dashboard
                </h2>

                <p>
                    Overview of your employee and
                    salary management system
                </p>

            </div>


            <div className="row g-4 mb-4">

                <KpiCard
                    title="Total Employees"
                    value={totalEmployees}
                    text="Active employee records"
                    icon="👥"
                />

                <KpiCard
                    title="Departments"
                    value={totalDepartments}
                    text="Across organization"
                    icon="🏢"
                />

                <KpiCard
                    title="Countries"
                    value={totalCountries}
                    text="Employee locations"
                    icon="🌍"
                />

                <KpiCard
                    title="Currencies"
                    value={totalCurrencies}
                    text="Salary currencies"
                    icon="💰"
                />

            </div>


            <div className="row g-4">

                <div className="col-lg-7">

                    <div className="chart-card">

                        <h5>
                            Employees by Department
                        </h5>

                        <p className="chart-subtitle">
                            Distribution across departments
                        </p>

                        <ResponsiveContainer
                            width="100%"
                            height={300}
                        >

                            <BarChart
                                data={departmentData}
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
                                    radius={[
                                        6,
                                        6,
                                        0,
                                        0
                                    ]}
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                </div>


                <div className="col-lg-5">

                    <div className="chart-card">

                        <h5>
                            Employees by Country
                        </h5>

                        <p className="chart-subtitle">
                            Employee distribution by location
                        </p>

                        <ResponsiveContainer
                            width="100%"
                            height={300}
                        >

                            <PieChart>

                                <Pie
                                    data={countryData}
                                    dataKey="employees"
                                    nameKey="country"
                                    outerRadius={90}
                                    label
                                >

                                    {countryData.map(
                                        (_, index) => (

                                            <Cell
                                                key={index}
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

                    </div>

                </div>

            </div>

        </div>
    );
}


function KpiCard({
                     title,
                     value,
                     text,
                     icon
                 }) {

    return (
        <div className="col-md-6 col-xl-3">

            <div className="dashboard-card">

                <div>

                    <p>
                        {title}
                    </p>

                    <h2>
                        {value}
                    </h2>

                    <small>
                        {text}
                    </small>

                </div>

                <div className="dashboard-icon">
                    {icon}
                </div>

            </div>

        </div>
    );
}

export default Dashboard;