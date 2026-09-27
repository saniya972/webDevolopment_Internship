
require("dotenv").config();
const mongoose = require("mongoose");

const Therapist = require("../src/models/Therapist");
const Subscription = require("../src/models/Subscription");

const createFreeSubscription = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");

        const therapist = await Therapist.findOne({
            email: "drsharma@example.com"
        });

        if (!therapist) {
            console.log("Therapist account not found");
            return;
        }

        const existingSubscription = await Subscription.findOne({
            therapistId: therapist._id
        }).sort({ createdAt: -1 });

        if (existingSubscription) {
            console.log("Subscription already exists");
            console.log("Plan:", existingSubscription.plan);
            console.log("Status:", existingSubscription.status);
            return;
        }

        const subscription = await Subscription.create({
            therapistId: therapist._id,
            plan: "free",
            status: "active"
        });

        console.log("Free subscription created successfully");
        console.log("Plan:", subscription.plan);
        console.log("Status:", subscription.status);

    } catch (error) {
        console.error("Error:", error.message);
    } finally {
        await mongoose.disconnect();
    }
};

createFreeSubscription();