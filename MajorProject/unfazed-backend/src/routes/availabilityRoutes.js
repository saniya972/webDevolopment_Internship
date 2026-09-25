const express = require("express");

const {
    addAvailability,
    getAvailability,
    deleteAvailability,
    getPublicAvailability
} = require("../controllers/availabilityController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, addAvailability);

router.get("/", authMiddleware, getAvailability);
router.delete("/:id", authMiddleware, deleteAvailability);
router.get("/public/:slug", getPublicAvailability);

module.exports = router;