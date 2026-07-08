const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customerController");   

router.post("/", customerController.addCustomer);
router.get("/", customerController.getCustomers);
router.get("/:id", customerController.getCustomerById);

module.exports = router;