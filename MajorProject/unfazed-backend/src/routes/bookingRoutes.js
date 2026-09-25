const express = require("express");

const {
    createBooking,
    getBookings,
    createPublicBooking,
    getPublicBookings,
    cancelBooking,
    markNoShow
} = require("../controllers/bookingController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/public", createPublicBooking);

router.get("/public", getPublicBookings);

router.post("/", authMiddleware, createBooking);

router.get("/", authMiddleware, getBookings);

router.delete("/:id", authMiddleware, cancelBooking);

router.patch("/:id/no-show", authMiddleware, markNoShow);

module.exports = router;