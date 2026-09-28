const { canAccess } = require("../services/entitlementService");

const requireFeature = (featureKey) => {
    return async (req, res, next) => {
        try {
            const therapistId = req.therapistId;

            const allowed = await canAccess(
                therapistId,
                featureKey
            );

            if (!allowed) {
                return res.status(403).json({
                    message: "Upgrade your subscription to access this feature"
                });
            }

            next();

        } catch (error) {
            console.log("Feature access error:", error);

            return res.status(500).json({
                message: "Failed to check feature access"
            });
        }
    };
};

module.exports = requireFeature;