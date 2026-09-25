const express = require("express");

const {
    checkEntitlement
} = require("../controllers/entitlementController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, checkEntitlement);

module.exports = router;