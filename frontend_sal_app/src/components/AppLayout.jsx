import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

function AppLayout() {
    return (
        <div className="d-flex">

            <Sidebar />

            <div
                className="flex-grow-1"
                style={{ minHeight: "100vh" }}
            >
                <Header />

                <main
                    className="p-4 flex-grow-1"
                    style={{ backgroundColor: "#f8fafc" }}
                >
                    <Outlet />
                </main>

            </div>

        </div>
    );
}

export default AppLayout;