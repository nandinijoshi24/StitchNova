import { useEffect, useState } from "react";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    gender: "",
  });

  const fetchCustomers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/customers");
      const data = await response.json();
      setCustomers(data.data || []);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/customers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to add customer");
        return;
      }

      alert("Customer added successfully!");

      setFormData({
        name: "",
        phone: "",
        email: "",
        address: "",
        gender: "",
      });

      setShowForm(false);
      fetchCustomers();
    } catch (error) {
      console.error("Error adding customer:", error);
      alert("Unable to connect to backend");
    }
  };

  return (
    <div className="customers-page">
      <div className="page-header">
        <div>
          <h2>Customers</h2>
          <p>Manage your StitchNova customers.</p>
        </div>

        <button
          className="add-button"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "+ Add Customer"}
        </button>
      </div>

      {showForm && (
        <form className="customer-form" onSubmit={handleSubmit}>
          <h3>Add New Customer</h3>

          <div className="form-grid">
            <input
              type="text"
              name="name"
              placeholder="Customer Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="save-button">
            Save Customer
          </button>
        </form>
      )}

      <div className="customer-list">
        {customers.length === 0 ? (
          <div className="empty-state">
            <p>No customers found.</p>
          </div>
        ) : (
          customers.map((customer) => (
            <div className="customer-card" key={customer.id}>
              <div>
                <h3>{customer.name}</h3>
                <p>📞 {customer.phone}</p>
                <p>✉️ {customer.email || "No email"}</p>
                <p>📍 {customer.address || "No address"}</p>
              </div>

              <span className="gender">
                {customer.gender || "Not specified"}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Customers;