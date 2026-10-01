import {
    Routes,
    Route
} from "react-router-dom";

import Login
    from "./pages/Login";

import Dashboard
    from "./pages/Dashboard";

import Employees
    from "./pages/Employees";

import AddEmployee
    from "./pages/AddEmployee";

import EditEmployee
    from "./pages/EditEmployee";

import Reports
    from "./pages/Reports";

import ProtectedRoute
    from "./components/ProtectedRoute";

import AppLayout
    from "./components/AppLayout";

import "./App.css";

function App() {

    return (
        <Routes>

            {/* PUBLIC */}

            <Route
                path="/login"
                element={<Login />}
            />


            {/* PROTECTED */}

            <Route
                element={
                    <ProtectedRoute>
                        <AppLayout />
                    </ProtectedRoute>
                }
            >

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

            </Route>


            {/* UNKNOWN URL */}

            <Route
                path="*"
                element={<Login />}
            />

        </Routes>
    );
}

export default App;