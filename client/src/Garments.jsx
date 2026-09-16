import { useEffect, useState } from "react";

function Garments() {
  const [garments, setGarments] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    basePrice: "",
    description: "",
  });

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
        "http://localhost:5000/api/garments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            basePrice: Number(formData.basePrice),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to add garment");
        return;
      }

      alert("Garment added successfully!");

      setFormData({
        name: "",
        category: "",
        basePrice: "",
        description: "",
      });

      setShowForm(false);
      fetchGarments();
    } catch (error) {
      console.error("Error adding garment:", error);
      alert("Unable to connect to backend");
    }
  };

  return (
    <div className="customers-page">
      <div className="page-header">
        <div>
          <h2>Garments</h2>
          <p>Manage your StitchNova garment types.</p>
        </div>

        <button
          className="add-button"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "+ Add Garment"}
        </button>
      </div>

      {showForm && (
        <form className="customer-form" onSubmit={handleSubmit}>
          <h3>Add New Garment</h3>

          <div className="form-grid">
            <input
              type="text"
              name="name"
              placeholder="Garment Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="basePrice"
              placeholder="Base Price"
              value={formData.basePrice}
              onChange={handleChange}
              min="0"
              required
            />

            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="save-button">
            Save Garment
          </button>
        </form>
      )}

      <div className="customer-list">
        {garments.length === 0 ? (
          <div className="empty-state">
            <p>No garments found.</p>
          </div>
        ) : (
          garments.map((garment) => (
            <div className="customer-card" key={garment.id}>
              <div>
                <h3>{garment.name}</h3>
                <p>📂 Category: {garment.category}</p>
                <p>💰 Base Price: ₹{garment.basePrice}</p>
                <p>
                  📝 {garment.description || "No description"}
                </p>
              </div>

              <span className="gender">
                {garment.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Garments;