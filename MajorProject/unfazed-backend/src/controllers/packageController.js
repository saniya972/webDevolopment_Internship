const Package = require("../models/Package");

// CREATE PACKAGE
const createPackage = async (req, res) => {
    try {
        const {
            name,
            description,
            sessions,
            price,
            validityDays
        } = req.body;

        const packageData = await Package.create({
            therapistId: req.therapistId,
            name,
            description,
            sessions,
            price,
            validityDays
        });

        res.status(201).json({
            message: "Package created successfully",
            package: packageData
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to create package"
        });
    }
};


// GET ALL PACKAGES
const getPackages = async (req, res) => {
    try {
        const packages = await Package.find({
            therapistId: req.therapistId
        });

        res.json({
            packages
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to get packages"
        });
    }
};

// GET PUBLIC PACKAGES
const getPublicPackages = async (req, res) => {
    try {
        const packages = await Package.find({
            therapistId: req.params.therapistId
        });

        res.json({
            packages
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to get public packages"
        });
    }
};


module.exports = {
    createPackage,
    getPackages,
    getPublicPackages
};