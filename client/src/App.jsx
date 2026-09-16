import { useEffect, useState } from "react";
import "./App.css";
import Customers from "./Customers";
import Garments from "./Garments";
import Measurements from "./Measurements";
import Orders from "./Orders";

function App() {
  const [customers, setCustomers] = useState([]);
  const [garments, setGarments] = useState([]);
  const [measurements, setMeasurements] = useState([]);
  const [activePage, setActivePage] = useState("dashboard");

  useEffect(() => {
    fetch("http://localhost:5000/api/customers")
      .then((res) => res.json())
      .then((data) => setCustomers(data.data || []))
      .catch((error) => console.error("Customer API error:", error));

    fetch("http://localhost:5000/api/garments")
      .then((res) => res.json())
      .then((data) => setGarments(data.data || []))
      .catch((error) => console.error("Garment API error:", error));

    fetch("http://localhost:5000/api/measurements")
      .then((res) => res.json())
      .then((data) => setMeasurements(data.data || []))
      .catch((error) =>
        console.error("Measurement API error:", error)
      );
  }, []);

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          <h2>StitchNova</h2>
          <p>Tailor Management</p>
        </div>

        <nav>
          <button
            className={`nav-item ${
              activePage === "dashboard" ? "active" : ""
            }`}
            onClick={() => setActivePage("dashboard")}
          >
            Dashboard
          </button>

          <button
            className={`nav-item ${
              activePage === "customers" ? "active" : ""
            }`}
            onClick={() => setActivePage("customers")}
          >
            Customers
          </button>

          <button
            className={`nav-item ${
              activePage === "garments" ? "active" : ""
            }`}
            onClick={() => setActivePage("garments")}
          >
            Garments
          </button>

          <button
  className={`nav-item ${
    activePage === "measurements" ? "active" : ""
  }`}
  onClick={() => setActivePage("measurements")}
>
  Measurements
</button>
<button
  className={`nav-item ${
    activePage === "orders" ? "active" : ""
  }`}
  onClick={() => setActivePage("orders")}
>
  Orders
</button>
        </nav>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <h1>
              {activePage === "dashboard"
                ? "Dashboard"
                : activePage === "customers"
                ? "Customers"
                : activePage === "garments"
                ? "Garments"
                : activePage === "orders"
                ? "Orders"
                : "Measurements" }
            </h1>

            <p>
              {activePage === "dashboard"
                ? "Welcome to StitchNova"
                : "Manage your tailoring business"}
            </p>
          </div>

          <div className="profile">
            <span>Admin</span>
          </div>
        </header>

        {/* DASHBOARD */}
        {activePage === "dashboard" && (
          <>
            <section className="stats">
              <div className="stat-card">
                <span>👥</span>
                <div>
                  <p>Total Customers</p>
                  <h2>{customers.length}</h2>
                </div>
              </div>

              <div className="stat-card">
                <span>👗</span>
                <div>
                  <p>Total Garments</p>
                  <h2>{garments.length}</h2>
                </div>
              </div>

              <div className="stat-card">
                <span>📏</span>
                <div>
                  <p>Measurements</p>
                  <h2>{measurements.length}</h2>
                </div>
              </div>
            </section>

            <section className="welcome-card">
              <h2>Welcome to StitchNova 👋</h2>

              <p>
                Manage your customers, garments and measurements
                from one place.
              </p>

              <div className="quick-actions">
                <button onClick={() => setActivePage("customers")}>
                  View Customers
                </button>

                <button onClick={() => setActivePage("garments")}>
                  Manage Garments
                </button>

                <button>
                  View Measurements
                </button>
              </div>
            </section>
          </>
        )}

        {/* CUSTOMERS */}
        {activePage === "customers" && <Customers />}

        {/* GARMENTS */}
        {activePage === "garments" && <Garments />}

        {/* MEASUREMENTS */}
{activePage === "measurements" && <Measurements />}

{activePage === "orders" && <Orders />}

      </main>
    </div>
  );
}

export default App;