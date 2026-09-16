import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [garments, setGarments] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    customerId: "",
    garmentTypeId: "",
    quantity: "",
    deliveryDate: "",
    totalAmount: "",
    status: "PENDING",
  });

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/orders");
      const data = await response.json();
      setOrders(data.data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/customers");
      const data = await response.json();
      setCustomers(data.data || []);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const fetchGarments = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/garments");
      const data = await response.json();
      setGarments(data.data || []);
    } catch (error) {
      console.error("Error fetching garments:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchCustomers();
    fetchGarments();
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
        "http://localhost:5000/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerId: Number(formData.customerId),
            garmentTypeId: Number(formData.garmentTypeId),
            quantity: Number(formData.quantity),
            deliveryDate: formData.deliveryDate,
            totalAmount: Number(formData.totalAmount),
            status: formData.status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to add order");
        return;
      }

      alert("Order added successfully!");

      setFormData({
        customerId: "",
        garmentTypeId: "",
        quantity: "",
        deliveryDate: "",
        totalAmount: "",
        status: "PENDING",
      });

      setShowForm(false);
      fetchOrders();
    } catch (error) {
      console.error("Error adding order:", error);
      alert("Unable to connect to backend");
    }
  };

  return (
    <div className="customers-page">
      <div className="page-header">
        <div>
          <h2>Orders</h2>
          <p>Manage your StitchNova customer orders.</p>
        </div>

        <button
          className="add-button"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "+ Add Order"}
        </button>
      </div>

      {showForm && (
        <form className="customer-form" onSubmit={handleSubmit}>
          <h3>Add New Order</h3>

          <div className="form-grid">
            <select
              name="customerId"
              value={formData.customerId}
              onChange={handleChange}
              required
            >
              <option value="">Select Customer</option>

              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>

            <select
              name="garmentTypeId"
              value={formData.garmentTypeId}
              onChange={handleChange}
              required
            >
              <option value="">Select Garment</option>

              {garments.map((garment) => (
                <option key={garment.id} value={garment.id}>
                  {garment.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              required
            />

            <input
              type="date"
              name="deliveryDate"
              value={formData.deliveryDate}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="totalAmount"
              placeholder="Total Amount"
              value={formData.totalAmount}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="PENDING">Pending</option>
              <option value="CUTTING">Cutting</option>
              <option value="STITCHING">Stitching</option>
              <option value="READY">Ready</option>
              <option value="DELIVERED">Delivered</option>
            </select>
          </div>

          <button type="submit" className="save-button">
            Save Order
          </button>
        </form>
      )}

      <div className="customer-list">
        {orders.length === 0 ? (
          <div className="empty-state">
            <p>No orders found.</p>
          </div>
        ) : (
          orders.map((order) => (
            <div className="customer-card" key={order.id}>
              <div>
                <h3>
                  Order #{order.id} —{" "}
                  {order.customer?.name || "Unknown Customer"}
                </h3>

                <p>
                  👕 Garment:{" "}
                  {order.garmentType?.name || "Unknown Garment"}
                </p>

                <p>📦 Quantity: {order.quantity}</p>

                <p>
                  📅 Delivery:{" "}
                  {new Date(order.deliveryDate).toLocaleDateString()}
                </p>

                <p>💰 Total: ₹{order.totalAmount}</p>
              </div>

              <span className="gender">{order.status}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Orders;