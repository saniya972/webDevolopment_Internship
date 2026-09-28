const express = require("express");

const {
    getAnalytics
} = require("../controllers/analyticsController");

const authMiddleware = require("../middleware/authMiddleware");

const requireFeature = require("../middleware/requireFeature");

const router = express.Router();

router.get(
    "/",
    authMiddleware,
    requireFeature("analytics"),
    getAnalytics
);

module.exports = router;