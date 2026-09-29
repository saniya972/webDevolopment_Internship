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

        console.log("Plan:", subscription.plan);
console.log("Feature:", featureKey);
console.log("Tier config:", tierConfig);

        if (!tierConfig) {
            return false;
        }

        // Check whether feature is enabled
       //return tierConfig.features[featureKey] === true;
       const result = tierConfig.features[featureKey] === true;
console.log("Feature allowed:", result);
return result;

    } catch (error) {
        console.log("Entitlement check failed:", error.message);
        return false;
    }
};

module.exports = {
    canAccess
};