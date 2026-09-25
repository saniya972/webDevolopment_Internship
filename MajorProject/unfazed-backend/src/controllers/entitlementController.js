const Subscription = require("../models/Subscription");
const { canAccess } = require("../services/entitlementService");

const checkEntitlement = async (req, res) => {
    try {
        const { feature } = req.query;

        const subscription = await Subscription.findOne({
            therapistId: req.therapistId
        }).sort({ createdAt: -1 });

        if (!subscription) {
            return res.json({
                allowed: false,
                message: "No active subscription found"
            });
        }

        const allowed = await canAccess(
            req.therapistId,
            feature
        );

        res.json({
            plan: subscription.plan,
            feature,
            allowed
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to check entitlement"
        });
    }
};

module.exports = {
    checkEntitlement
};