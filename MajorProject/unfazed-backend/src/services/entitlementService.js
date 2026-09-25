const Subscription = require("../models/Subscription");

const SubscriptionTierConfig = require(
    "../models/SubscriptionTierConfig"
);

const canAccess = async (therapistId, featureKey) => {
    try {
        // Get therapist's latest subscription
        const subscription = await Subscription.findOne({
            therapistId,
            status: "active"
        }).sort({ createdAt: -1 });

        if (!subscription) {
            return false;
        }

        // Get plan configuration from MongoDB
        const tierConfig = await SubscriptionTierConfig.findOne({
            plan: subscription.plan
        });

        if (!tierConfig) {
            return false;
        }

        // Check whether feature is enabled
       return tierConfig.features[featureKey] === true;

    } catch (error) {
        console.log("Entitlement check failed:", error.message);
        return false;
    }
};

module.exports = {
    canAccess
};