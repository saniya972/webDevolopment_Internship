const express = require("express");
const router = express.Router();

const {
    createSubscription,
    getSubscription
} = require("../controllers/subscriptionController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createSubscription);

router.get("/", authMiddleware, getSubscription);

module.exports = router;