const mongoose = require("mongoose");

const therapistSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        password_hash: {
            type: String,
            required: true
        },

        slug: {
            type: String,
            required: true,
            unique: true
        },

        bio: {
            type: String,
            default: ""
        },

        specializations: {
            type: [String],
            default: []
        },

        languages: {
            type: [String],
            default: []
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Therapist", therapistSchema);