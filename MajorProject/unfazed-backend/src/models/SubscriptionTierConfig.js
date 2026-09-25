const mongoose = require("mongoose");

const subscriptionTierConfigSchema = new mongoose.Schema(
    {
        plan: {
            type: String,
            enum: ["free", "basic", "pro"],
            required: true,
            unique: true
        },

        caps: {
            activeClients: {
                type: Number,
                default: 5
            },

            analyticsDepth: {
                type: String,
                enum: ["none", "basic", "advanced"],
                default: "none"
            }
        },

        features: {
            profile: {
                type: Boolean,
                default: true
            },

            availability: {
                type: Boolean,
                default: true
            },

            clients: {
                type: Boolean,
                default: true
            },

            bookings: {
                type: Boolean,
                default: false
            },

            packages: {
                type: Boolean,
                default: false
            },

            sessionNotes: {
                type: Boolean,
                default: false
            },

            messages: {
                type: Boolean,
                default: false
            },

            analytics: {
                type: Boolean,
                default: false
            }
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "SubscriptionTierConfig",
    subscriptionTierConfigSchema
);