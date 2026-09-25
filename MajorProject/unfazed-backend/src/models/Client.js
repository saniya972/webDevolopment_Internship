const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
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

        email: {
            type: String,
            required: true
        },

        phone: {
            type: String,
            default: ""
        },
           
        age: {
    type: Number,
    default: null
},

reasonForConsultation: {
    type: String,
    default: ""
},

        notes: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Client", clientSchema);