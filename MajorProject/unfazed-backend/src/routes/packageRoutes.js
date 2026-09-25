const express = require("express");

const {
    createPackage,
    getPackages,
    getPublicPackages
} = require("../controllers/packageController");

const {
    createPaymentOrder,
     getInvoice
} = require("../controllers/paymentController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create package
router.post("/", authMiddleware, createPackage);

// Get therapist packages
router.get("/", authMiddleware, getPackages);

// Get packages for clients
router.get("/public/:therapistId", getPublicPackages);

// Create Razorpay payment order
router.post("/payment/order", createPaymentOrder);

router.get("/payment/invoice/:paymentId", getInvoice);

module.exports = router;