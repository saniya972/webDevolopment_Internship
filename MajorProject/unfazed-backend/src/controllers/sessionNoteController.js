const SessionNote = require("../models/SessionNote");
const { canAccess } = require("../services/entitlementService");

const createSessionNote = async (req, res) => {
    try {
        const { clientId, bookingId, content, type } = req.body;

        const allowed = await canAccess(
            req.therapistId,
            "sessionNotes"
        );

        if (!allowed) {
            return res.status(403).json({
                message: "Session notes are not available on your current plan. Please upgrade."
            });
        }

        const note = await SessionNote.create({
            therapistId: req.therapistId,
            clientId,
            bookingId,
            content,
            type
        });

        res.status(201).json({
            message: "Session note created successfully",
            note
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to create session note"
        });
    }
};

const getTherapistNotes = async (req, res) => {
    try {
        const notes = await SessionNote.find({
            therapistId: req.therapistId
        }).sort({ createdAt: -1 });

        res.json({ notes });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to get session notes"
        });
    }
};

const getClientSharedNotes = async (req, res) => {
    try {
        const notes = await SessionNote.find({
            clientId: req.params.clientId,
            type: "shared"
        }).sort({ createdAt: -1 });

        res.json({ notes });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to get shared notes"
        });
    }
};

module.exports = {
    createSessionNote,
    getTherapistNotes,
    getClientSharedNotes
};