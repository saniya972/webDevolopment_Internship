const Therapist = require("../models/Therapist");

const getProfile = async (req, res) => {
    try {
        const therapist = await Therapist.findById(req.therapistId)
            .select("-password_hash");

        if (!therapist) {
            return res.status(404).json({
                message: "Therapist not found"
            });
        }

        res.json({
            therapist
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to get profile"
        });
    }
};


const updateProfile = async (req, res) => {
    try {
        const { name, bio, specializations, languages } = req.body;

        const therapist = await Therapist.findByIdAndUpdate(
            req.therapistId,
            {
                name,
                bio,
                specializations,
                languages
            },
            { new: true }
        ).select("-password_hash");

        if (!therapist) {
            return res.status(404).json({
                message: "Therapist not found"
            });
        }

        res.json({
            message: "Profile updated successfully",
            therapist
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update profile"
        });
    }
};

const getPublicProfile = async (req, res) => {
    try {
        const therapist = await Therapist.findOne({
            slug: req.params.slug
        }).select(
            "name slug bio specializations languages"
        );

        if (!therapist) {
            return res.status(404).json({
                message: "Therapist not found"
            });
        }

        res.json({
            therapist
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to get public profile"
        });
    }
};
module.exports = {
    getProfile,
    updateProfile,
    getPublicProfile
};