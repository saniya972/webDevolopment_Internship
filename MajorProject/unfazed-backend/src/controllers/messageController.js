const Message = require("../models/Message");
const { canAccess } = require("../services/entitlementService");

const getMessages = async (req, res) => {
    try {
        const { clientId } = req.params;

        // Check message entitlement
        const allowed = await canAccess(
            req.therapistId,
            "messages"
        );

        if (!allowed) {
            return res.status(403).json({
                message: "Messages are not available on your current plan. Please upgrade.",
                upgradeRequired: true
            });
        }

        const messages = await Message.find({
            therapistId: req.therapistId,
            clientId: clientId
        }).sort({ createdAt: 1 });

        res.json({
            messages
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to get messages"
        });
    }
};

module.exports = {
    getMessages
};