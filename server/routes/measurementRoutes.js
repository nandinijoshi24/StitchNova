const express = require("express");
const router = express.Router();

const measurementController = require("../controllers/measurementController");

router.post("/", measurementController.addMeasurement);
router.get("/", measurementController.getMeasurements);
module.exports = router;