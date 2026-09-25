const mongoose = require("mongoose");

const packagePurchaseSchema = new mongoose.Schema(
    {
        therapistId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Therapist",
            required: true
        },

        packageId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Package",
            required: true
        },

        clientName: {
            type: String,
            required: true
        },

        clientEmail: {
            type: String,
            required: true
        },

        purchaseDate: {
            type: Date,
            default: Date.now
        },

        expiryDate: {
            type: Date,
            required: true
        },

        totalSessions: {
            type: Number,
            required: true
        },

        remainingSessions: {
            type: Number,
            required: true
        },

        status: {
            type: String,
            enum: ["active", "expired", "completed"],
            default: "active"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "PackagePurchase",
    packagePurchaseSchema
);