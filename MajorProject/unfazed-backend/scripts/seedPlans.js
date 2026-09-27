
const mongoose = require("mongoose");
require("dotenv").config();

const SubscriptionTierConfig = require("../src/models/SubscriptionTierConfig");

const seedPlans = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        const plans = [
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
                    bookings: true,
                    packages: false,
                    sessionNotes: false,
                    messages: false,
                    analytics: false
                }
            },
            {
                plan: "basic",
                caps: {
                    activeClients: 25,
                    analyticsDepth: "basic"
                },
                features: {
                    profile: true,
                    availability: true,
                    clients: true,
                    bookings: true,
                    packages: true,
                    sessionNotes: true,
                    messages: false,
                    analytics: true
                }
            },
            {
                plan: "pro",
                caps: {
                    activeClients: 100,
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

        for (const planData of plans) {
            await SubscriptionTierConfig.findOneAndUpdate(
                { plan: planData.plan },
                { $set: planData },
                { upsert: true, new: true, runValidators: true }
            );

            console.log(`${planData.plan} plan saved`);
        }

        console.log("All plans initialized successfully");

    } catch (error) {
        console.error("Error initializing plans:", error.message);
    } finally {
        await mongoose.disconnect();
    }
};

seedPlans();