const mongoose = require("mongoose");
require("dotenv").config();

const SubscriptionTierConfig = require(
    "../models/SubscriptionTierConfig"
);

const tiers = [
    {
        plan: "free",

        caps: {
            activeClients: 5,
            analyticsDepth: "none"
        },

        features: {
            profile: true,
            availability: true,
            clients: true,
            bookings: false,
            packages: false,
            sessionNotes: false,
            messages: false,
            analytics: false
        }
    },

    {
        plan: "basic",

        caps: {
            activeClients: 20,
            analyticsDepth: "basic"
        },

        features: {
            profile: true,
            availability: true,
            clients: true,
            bookings: true,
            packages: true,
            sessionNotes: true,
            messages: true,
            analytics: false
        }
    },

    {
        plan: "pro",

        caps: {
            activeClients: -1,
            analyticsDepth: "advanced"
        },

        features: {
            profile: true,
            availability: true,
            clients: true,
            bookings: true,
            packages: true,
            sessionNotes: true,
            messages: true,
            analytics: true
        }
    }
];

const seedTiers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        for (const tier of tiers) {
            await SubscriptionTierConfig.findOneAndUpdate(
                { plan: tier.plan },
                tier,
                {
                    upsert: true,
                    new: true,
                    runValidators: true
                }
            );
        }

        console.log("Subscription tiers saved successfully");

    } catch (error) {
        console.log("Error:", error.message);

    } finally {
        await mongoose.disconnect();
    }
};

seedTiers();