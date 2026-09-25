const express = require("express");

const {
    createSessionNote,
    getTherapistNotes,
    getClientSharedNotes
} = require("../controllers/sessionNoteController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createSessionNote);

router.get("/", authMiddleware, getTherapistNotes);

router.get("/client/:clientId", getClientSharedNotes);

module.exports = router;