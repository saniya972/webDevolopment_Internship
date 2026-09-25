const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
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

        amount: {
            type: Number,
            required: true
        },

        razorpayOrderId: {
            type: String,
            default: ""
        },

        razorpayPaymentId: {
            type: String,
            default: ""
        },

        status: {
            type: String,
            default: "created"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Payment", paymentSchema);