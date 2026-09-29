const Therapist = require("../models/Therapist");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
const registerTherapist = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters"
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existingTherapist = await Therapist.findOne({
            email: normalizedEmail
        });

        if (existingTherapist) {
            return res.status(400).json({
                message: "Email already registered"
            });
        }

        const password_hash = await bcrypt.hash(password, 10);

        const baseSlug = name
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "") || "therapist";

        const slug = `${baseSlug}-${Date.now()}`;

        const therapist = await Therapist.create({
            name: name.trim(),
            email: normalizedEmail,
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
        console.log("Registration error:", error.message);

        res.status(500).json({
            message: "Registration failed"
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