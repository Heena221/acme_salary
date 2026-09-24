import { useEffect } from "react";
import EmployeeService from "../services/EmployeeService";

function Dashboard() {

    useEffect(() => {

        EmployeeService.getAllEmployees()
            .then((response) => {
                console.log("Employees from Spring Boot:");
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error fetching employees:", error);
            });

    }, []);
    return (
        <div>
            <h2 className="mb-4">Dashboard</h2>

            <div className="row g-4">

                <div className="col-md-3">
                    <div className="card shadow-sm border-0">
                        <div className="card-body">
                            <h6 className="text-muted">Total Employees</h6>
                            <h2>15</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow-sm border-0">
                        <div className="card-body">
                            <h6 className="text-muted">Total Salary</h6>
                            <h2>$850K</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow-sm border-0">
                        <div className="card-body">
                            <h6 className="text-muted">Departments</h6>
                            <h2>6</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow-sm border-0">
                        <div className="card-body">
                            <h6 className="text-muted">Average Salary</h6>
                            <h2>$56K</h2>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;