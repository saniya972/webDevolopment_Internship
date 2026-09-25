const express = require("express");

const {
    registerTherapist,
    loginTherapist
} = require("../controllers/authController");

const {
    getProfile,
    updateProfile,
    getPublicProfile
} = require("../controllers/therapistController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerTherapist);

router.post("/login", loginTherapist);

router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);
router.get("/public/:slug", getPublicProfile);

module.exports = router;