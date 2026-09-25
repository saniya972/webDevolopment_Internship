const express = require("express");

const {
    createPackagePurchase
} = require("../controllers/packagePurchaseController");

const router = express.Router();

router.post("/", createPackagePurchase);

module.exports = router;