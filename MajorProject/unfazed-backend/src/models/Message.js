const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
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

        sender: {
            type: String,
            enum: ["therapist", "client"],
            required: true
        },

        message: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Message", messageSchema);