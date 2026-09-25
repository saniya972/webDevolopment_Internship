const express = require("express");

const {
    paymentWebhook,
    createTestPayment
} = require("../controllers/paymentController");

const router = express.Router();

router.post("/webhook", paymentWebhook);

router.post("/test-payment", createTestPayment);

module.exports = router;