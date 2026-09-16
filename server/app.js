const express = require("express");
const cors = require("cors");
require("dotenv").config();

const customerRoutes = require("./routes/customerRoutes");
const garmentRoutes = require("./routes/garmentRoutes");
const measurementRoutes = require("./routes/measurementRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend Running");
});

app.use("/api/customers", customerRoutes);
app.use("/api/garments", garmentRoutes);
app.use("/api/measurements", measurementRoutes);

// Test Route
app.get("/test", (req, res) => {
    res.send("Test Route Working");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});