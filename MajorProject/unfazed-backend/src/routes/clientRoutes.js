const express = require("express");

const {
    addClient,
    getClients,
    getClient,
    submitIntakeForm
} = require("../controllers/clientController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Add client
router.post("/", authMiddleware, addClient);

// Get all clients
router.get("/", authMiddleware, getClients);
 
router.post("/intake", submitIntakeForm);

// Get one client
router.get("/:id", authMiddleware, getClient);

module.exports = router;