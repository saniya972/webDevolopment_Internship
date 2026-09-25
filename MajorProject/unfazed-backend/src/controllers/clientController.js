const Client = require("../models/Client");
const Subscription = require("../models/Subscription");
const SubscriptionTierConfig = require(
    "../models/SubscriptionTierConfig"
);

// ADD CLIENT
const addClient = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            age,
            reasonForConsultation,
            notes
        } = req.body;

        // Get therapist's active subscription
        const subscription = await Subscription.findOne({
            therapistId: req.therapistId,
            status: "active"
        }).sort({ createdAt: -1 });

        if (!subscription) {
            return res.status(403).json({
                message: "Please activate a subscription first."
            });
        }

        // Get plan configuration from MongoDB
        const tierConfig = await SubscriptionTierConfig.findOne({
            plan: subscription.plan
        });

        if (!tierConfig) {
            return res.status(403).json({
                message: "Subscription configuration not found."
            });
        }

        // Get active-client limit
        const clientLimit = tierConfig.caps.activeClients;

        // Count existing clients
        const clientCount = await Client.countDocuments({
            therapistId: req.therapistId
        });

        // -1 means unlimited
        if (
            clientLimit !== -1 &&
            clientCount >= clientLimit
        ) {
            return res.status(403).json({
                message: `Your ${subscription.plan} plan allows only ${clientLimit} clients. Please upgrade to add more clients.`,
                upgradeRequired: true
            });
        }

        // Create client
        const client = await Client.create({
            therapistId: req.therapistId,
            name,
            email,
            phone,
            age,
            reasonForConsultation,
            notes
        });

        res.status(201).json({
            message: "Client added successfully",
            client
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to add client"
        });
    }
};


// GET ALL CLIENTS
const getClients = async (req, res) => {
    try {
        const clients = await Client.find({
            therapistId: req.therapistId
        });

        res.json({
            clients
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to get clients"
        });
    }
};


// GET ONE CLIENT
const getClient = async (req, res) => {
    try {
        const client = await Client.findOne({
            _id: req.params.id,
            therapistId: req.therapistId
        });

        if (!client) {
            return res.status(404).json({
                message: "Client not found"
            });
        }

        res.json({
            client
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to get client"
        });
    }
};


// PUBLIC INTAKE FORM
const submitIntakeForm = async (req, res) => {
    try {
        const {
            therapistId,
            name,
            email,
            phone,
            age,
            reasonForConsultation,
            notes
        } = req.body;

        // Check therapist subscription
        const subscription = await Subscription.findOne({
            therapistId,
            status: "active"
        }).sort({ createdAt: -1 });

        if (!subscription) {
            return res.status(403).json({
                message: "Therapist has no active subscription."
            });
        }

        // Get plan configuration
        const tierConfig = await SubscriptionTierConfig.findOne({
            plan: subscription.plan
        });

        if (!tierConfig) {
            return res.status(403).json({
                message: "Subscription configuration not found."
            });
        }

        // Check client limit
        const clientLimit = tierConfig.caps.activeClients;

        const clientCount = await Client.countDocuments({
            therapistId
        });

        if (
            clientLimit !== -1 &&
            clientCount >= clientLimit
        ) {
            return res.status(403).json({
                message: "This therapist has reached the client limit.",
                upgradeRequired: true
            });
        }

        // Create client
        const client = await Client.create({
            therapistId,
            name,
            email,
            phone,
            age,
            reasonForConsultation,
            notes
        });

        res.status(201).json({
            message: "Intake form submitted successfully",
            client
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to submit intake form"
        });
    }
};
module.exports = {
    addClient,
    getClients,
    getClient,
    submitIntakeForm
};