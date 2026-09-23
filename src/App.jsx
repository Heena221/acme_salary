import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
      <div className="app-container">

        <Sidebar />

        <div className="main-content">

          <Header />

          <div className="page-content">
            <h2>Dashboard</h2>
            <p>Welcome to the Salary Management System.</p>
          </div>

        </div>

      </div>
  );
}

export default App;