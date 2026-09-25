const express = require("express");

const {
    getMessages
} = require("../controllers/messageController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:clientId", authMiddleware, getMessages);

module.exports = router;