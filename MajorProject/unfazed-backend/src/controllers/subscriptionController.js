const Subscription = require("../models/Subscription");

const createSubscription = async (req, res) => {
    try {
        const { plan } = req.body;

        const subscription = await Subscription.create({
            therapistId: req.therapistId,
            plan: plan || "free",
            status: "active"
        });

        res.status(201).json({
            message: "Subscription created successfully",
            subscription
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to create subscription"
        });
    }
};

const getSubscription = async (req, res) => {
    try {
        const subscription = await Subscription.findOne({
            therapistId: req.therapistId
        }).sort({ createdAt: -1 });

        res.json({
            subscription
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to get subscription"
        });
    }
};

module.exports = {
    createSubscription,
    getSubscription
};