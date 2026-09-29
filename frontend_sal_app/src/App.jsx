import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import "./App.css";
import Dashboard from "./pages/Dashboard.jsx";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee.jsx";
import Reports from "./pages/Reports.jsx";
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute";

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
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/employees"
                        element={
                            <ProtectedRoute>
                                <Employees />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/employees/add"
                        element={
                            <ProtectedRoute>
                                <AddEmployee />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/employees/edit/:id"
                        element={
                            <ProtectedRoute>
                                <EditEmployee />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/reports"
                        element={
                            <ProtectedRoute>
                                <Reports />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/login"
                        element={<Login />}
                    />


                </Routes>
            </div>

        </div>

      </div>
  );
}

export default App;