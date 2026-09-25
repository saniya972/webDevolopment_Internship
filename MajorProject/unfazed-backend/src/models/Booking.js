const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        therapistId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Therapist",
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
         
           clientTimezone: {
    type: String,
    default: ""
},

        date: {
            type: String,
            required: true
        },

        startTime: {
            type: String,
            required: true
        },

        endTime: {
            type: String,
            required: true
        },

        status: {
            type: String,
            default: "booked"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Booking", bookingSchema);