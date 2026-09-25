const Therapist = require("../models/Therapist");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
const registerTherapist = async (req, res) => {
    try {
        const { name, email, password, slug } = req.body;

        const existingTherapist = await Therapist.findOne({ email });

        if (existingTherapist) {
            return res.status(400).json({
                message: "Email already registered"
            });
        }

        const password_hash = await bcrypt.hash(password, 10);

        const therapist = await Therapist.create({
            name,
            email,
            password_hash,
            slug
        });

        res.status(201).json({
            message: "Therapist registered successfully",
            therapist: {
                id: therapist._id,
                name: therapist.name,
                email: therapist.email,
                slug: therapist.slug
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Registration failed",
            error: error.message
        });
    }
};


// LOGIN
const loginTherapist = async (req, res) => {
    try {
        const { email, password } = req.body;

        const therapist = await Therapist.findOne({ email });

        if (!therapist) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            therapist.password_hash
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            { id: therapist._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            message: "Login successful",
            token: token
        });

    } catch (error) {
        res.status(500).json({
            message: "Login failed",
            error: error.message
        });
    }
};


module.exports = {
    registerTherapist,
    loginTherapist
};