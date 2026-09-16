const express = require("express");
const router = express.Router();

const garmentController = require("../controllers/garmentController");

router.post("/", garmentController.addGarment);
router.get("/", garmentController.getGarments);
router.get("/:id", garmentController.getGarmentById);
router.put("/:id", garmentController.updateGarment);
router.delete("/:id", garmentController.deleteGarment);

module.exports = router;