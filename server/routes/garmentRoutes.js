const express = require("express");
const router = express.Router();

const garmentController = require("../controllers/garmentController");

console.log(garmentController);
console.log(typeof garmentController.getGarments);

router.post("/", garmentController.addGarment);
router.get("/", garmentController.getGarments);
router.get("/:id", garmentController.getGarmentById);
router.put("/:id", garmentController.updateGarment);
router.delete("/:id", garmentController.deleteGarment);

module.exports = router;