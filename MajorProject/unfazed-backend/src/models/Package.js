const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
    {
        therapistId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Therapist",
            required: true
        },

        name: {
            type: String,
            required: true
        },

        description: {
            type: String,
            default: ""
        },

        sessions: {
            type: Number,
            required: true
        },

        price: {
            type: Number,
            required: true
        },

        validityDays: {
            type: Number,
            default: 30
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Package", packageSchema);