import {
    useEffect,
    useState
} from "react";

import EmployeeService
    from "../services/EmployeeService";

function Reports() {

    const [employees, setEmployees] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    useEffect(() => {

        EmployeeService
            .getAllEmployees()

            .then(response => {
                setEmployees(
                    response.data
                );
            })

            .catch(error => {

                console.error(
                    "Report error:",
                    error
                );

                setError(
                    "Unable to load report data."
                );

            })

            .finally(() => {
                setLoading(false);
            });

    }, []);


    const departmentReport = {};

    employees.forEach(employee => {

        const department =
            employee.department
            || "Unknown";

        if (!departmentReport[department]) {

            departmentReport[department] = {
                count: 0
            };
        }

        departmentReport[
            department
            ].count++;
    });


    const countryReport = {};

    employees.forEach(employee => {

        const country =
            employee.country
            || "Unknown";

        countryReport[country] =
            (countryReport[country] || 0)
            + 1;
    });


    const salaryReport = {};

    employees.forEach(employee => {

        const currency =
            employee.currency
            || "Unknown";

        const salary =
            Number(employee.salary)
            || 0;

        if (!salaryReport[currency]) {

            salaryReport[currency] = {
                count: 0,
                total: 0
            };
        }

        salaryReport[currency].count++;

        salaryReport[currency].total +=
            salary;
    });


    if (loading) {

        return (
            <div className="page-loading">

                <div className="spinner-border text-primary" />

                <p>
                    Loading reports...
                </p>

            </div>
        );
    }


    return (
        <div>

            <div className="page-heading">

                <h2>
                    Reports
                </h2>

                <p>
                    Employee and salary summary reports
                </p>

            </div>


            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}


            <ReportTable
                title="Department Summary"
                headers={[
                    "Department",
                    "Employees"
                ]}
                rows={
                    Object.entries(
                        departmentReport
                    ).map(
                        ([department, data]) => [
                            department,
                            data.count
                        ]
                    )
                }
            />


            <ReportTable
                title="Country Summary"
                headers={[
                    "Country",
                    "Employees"
                ]}
                rows={
                    Object.entries(
                        countryReport
                    ).map(
                        ([country, count]) => [
                            country,
                            count
                        ]
                    )
                }
            />


            <ReportTable
                title="Salary Summary"
                headers={[
                    "Currency",
                    "Employees",
                    "Total Salary",
                    "Average Salary"
                ]}
                rows={
                    Object.entries(
                        salaryReport
                    ).map(
                        ([currency, data]) => [

                            currency,

                            data.count,

                            data.total
                                .toLocaleString(),

                            Math.round(
                                data.total /
                                data.count
                            ).toLocaleString()

                        ]
                    )
                }
            />

        </div>
    );
}


function ReportTable({
                         title,
                         headers,
                         rows
                     }) {

    return (
        <div className="report-card mb-4">

            <h5 className="mb-3">
                {title}
            </h5>

            <div className="table-responsive">

                <table className="table table-hover">

                    <thead>

                    <tr>

                        {headers.map(header => (
                            <th key={header}>
                                {header}
                            </th>
                        ))}

                    </tr>

                    </thead>

                    <tbody>

                    {rows.map(
                        (row, rowIndex) => (

                            <tr key={rowIndex}>

                                {row.map(
                                    (value, index) => (

                                        <td key={index}>
                                            {value}
                                        </td>

                                    ))}

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default Reports;