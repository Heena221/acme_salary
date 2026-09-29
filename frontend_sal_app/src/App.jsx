import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import "./App.css";
import Dashboard from "./pages/Dashboard.jsx";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee.jsx";
import Reports from "./pages/Reports.jsx";

function App() {
  return (
      <div className="app-container">

        <Sidebar />

        <div className="main-content">

          <Header />

            <div className="page-content">
                <Routes>

                    <Route
                        path="/"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/employees"
                        element={<Employees />}
                    />

                    <Route
                        path="/employees/add"
                        element={<AddEmployee />}
                    />

                    <Route
                        path="/employees/edit/:id"
                        element={<EditEmployee />}
                    />
                    <Route
                        path="/reports"
                        element={<Reports />}
                    />

                </Routes>
            </div>

        </div>

      </div>
  );
}

export default App;