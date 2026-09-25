const mongoose = require("mongoose");

const sessionNoteSchema = new mongoose.Schema(
    {
        therapistId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Therapist",
            required: true
        },

        clientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Client",
            required: true
        },

        bookingId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking",
            default: null
        },

        content: {
            type: String,
            default: ""
        },

        type: {
            type: String,
            enum: ["private", "shared"],
            default: "private"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("SessionNote", sessionNoteSchema);