import { useEffect, useState } from "react";

function Measurements() {
  const [measurements, setMeasurements] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    customerId: "",
    chest: "",
    waist: "",
    hip: "",
    shoulder: "",
    sleeve: "",
    length: "",
    notes: "",
  });

  const fetchMeasurements = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/measurements"
      );
      const data = await response.json();

      setMeasurements(data.data || []);
    } catch (error) {
      console.error("Error fetching measurements:", error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/customers"
      );
      const data = await response.json();

      setCustomers(data.data || []);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    fetchMeasurements();
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
        "http://localhost:5000/api/measurements",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerId: Number(formData.customerId),
            chest: formData.chest
              ? Number(formData.chest)
              : null,
            waist: formData.waist
              ? Number(formData.waist)
              : null,
            hip: formData.hip ? Number(formData.hip) : null,
            shoulder: formData.shoulder
              ? Number(formData.shoulder)
              : null,
            sleeve: formData.sleeve
              ? Number(formData.sleeve)
              : null,
            length: formData.length
              ? Number(formData.length)
              : null,
            notes: formData.notes,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to add measurement");
        return;
      }

      alert("Measurement added successfully!");

      setFormData({
        customerId: "",
        chest: "",
        waist: "",
        hip: "",
        shoulder: "",
        sleeve: "",
        length: "",
        notes: "",
      });

      setShowForm(false);
      fetchMeasurements();
    } catch (error) {
      console.error("Error adding measurement:", error);
      alert("Unable to connect to backend");
    }
  };

  return (
    <div className="customers-page">
      <div className="page-header">
        <div>
          <h2>Measurements</h2>
          <p>Manage customer body measurements.</p>
        </div>

        <button
          className="add-button"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "+ Add Measurement"}
        </button>
      </div>

      {showForm && (
        <form className="customer-form" onSubmit={handleSubmit}>
          <h3>Add New Measurement</h3>

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

            <input
              type="number"
              name="chest"
              placeholder="Chest"
              value={formData.chest}
              onChange={handleChange}
              step="0.1"
            />

            <input
              type="number"
              name="waist"
              placeholder="Waist"
              value={formData.waist}
              onChange={handleChange}
              step="0.1"
            />

            <input
              type="number"
              name="hip"
              placeholder="Hip"
              value={formData.hip}
              onChange={handleChange}
              step="0.1"
            />

            <input
              type="number"
              name="shoulder"
              placeholder="Shoulder"
              value={formData.shoulder}
              onChange={handleChange}
              step="0.1"
            />

            <input
              type="number"
              name="sleeve"
              placeholder="Sleeve"
              value={formData.sleeve}
              onChange={handleChange}
              step="0.1"
            />

            <input
              type="number"
              name="length"
              placeholder="Length"
              value={formData.length}
              onChange={handleChange}
              step="0.1"
            />

            <input
              type="text"
              name="notes"
              placeholder="Notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="save-button">
            Save Measurement
          </button>
        </form>
      )}

      <div className="customer-list">
        {measurements.length === 0 ? (
          <div className="empty-state">
            <p>No measurements found.</p>
          </div>
        ) : (
          measurements.map((measurement) => (
            <div
              className="customer-card"
              key={measurement.id}
            >
              <div>
                <h3>
                  {measurement.customer?.name ||
                    `Customer #${measurement.customerId}`}
                </h3>

                <p>
                  📏 Chest: {measurement.chest ?? "-"} | Waist:{" "}
                  {measurement.waist ?? "-"} | Hip:{" "}
                  {measurement.hip ?? "-"}
                </p>

                <p>
                  📐 Shoulder: {measurement.shoulder ?? "-"} |
                  Sleeve: {measurement.sleeve ?? "-"} | Length:{" "}
                  {measurement.length ?? "-"}
                </p>

                <p>
                  📝 {measurement.notes || "No notes"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Measurements;