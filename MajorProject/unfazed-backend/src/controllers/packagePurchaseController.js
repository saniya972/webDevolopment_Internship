const Package = require("../models/Package");
const PackagePurchase = require("../models/PackagePurchase");

const createPackagePurchase = async (req, res) => {
    try {
        const {
            packageId,
            clientName,
            clientEmail
        } = req.body;

        const packageData = await Package.findById(packageId);

        if (!packageData) {
            return res.status(404).json({
                message: "Package not found"
            });
        }

        const purchaseDate = new Date();

        const expiryDate = new Date(purchaseDate);

        expiryDate.setDate(
            expiryDate.getDate() + packageData.validityDays
        );

        const purchase = await PackagePurchase.create({
            therapistId: packageData.therapistId,
            packageId: packageData._id,
            clientName,
            clientEmail,
            purchaseDate,
            expiryDate,
            totalSessions: packageData.sessions,
            remainingSessions: packageData.sessions,
            status: "active"
        });

        res.status(201).json({
            message: "Package purchased successfully",
            purchase
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to purchase package"
        });
    }
};

module.exports = {
    createPackagePurchase
};