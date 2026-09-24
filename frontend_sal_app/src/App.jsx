import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import "./App.css";
import Dashboard from "./pages/Dashboard.jsx";

function App() {
  return (
      <div className="app-container">

        <Sidebar />

        <div className="main-content">

          <Header />

            <div className="page-content">
                <Dashboard />
            </div>

        </div>

      </div>
  );
}

export default App;