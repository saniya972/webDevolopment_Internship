const Availability = require("../models/Availability");

// ADD AVAILABILITY
const addAvailability = async (req, res) => {
    try {
        const { day, startTime, endTime } = req.body;

        const availability = await Availability.create({
            therapistId: req.therapistId,
            day,
            startTime,
            endTime
        });

        res.status(201).json({
            message: "Availability added successfully",
            availability
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to add availability"
        });
    }
};


// GET AVAILABILITY
const getAvailability = async (req, res) => {
    try {
        const availability = await Availability.find({
            therapistId: req.therapistId
        });

        res.json({
            availability
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to get availability"
        });
    }
};


// DELETE AVAILABILITY
const deleteAvailability = async (req, res) => {
    try {
        const availability = await Availability.findOneAndDelete({
            _id: req.params.id,
            therapistId: req.therapistId
        });

        if (!availability) {
            return res.status(404).json({
                message: "Availability not found"
            });
        }

        res.json({
            message: "Availability deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete availability"
        });
    }
};
// PUBLIC GET AVAILABILITY
const getPublicAvailability = async (req, res) => {
    try {
        const Availability = require("../models/Availability");
        const Therapist = require("../models/Therapist");

        const therapist = await Therapist.findOne({
            slug: req.params.slug
        });

        if (!therapist) {
            return res.status(404).json({
                message: "Therapist not found"
            });
        }

        const availability = await Availability.find({
            therapistId: therapist._id
        });

        res.json({
            availability
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to get availability"
        });
    }
};

module.exports = {
    addAvailability,
    getAvailability,
    deleteAvailability,
    getPublicAvailability
};