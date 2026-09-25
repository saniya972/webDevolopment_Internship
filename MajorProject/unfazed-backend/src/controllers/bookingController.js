const Booking = require("../models/Booking");

// CREATE BOOKING
const createBooking = async (req, res) => {
    try {
        const {
            clientName,
            clientEmail,
            date,
            startTime,
            endTime
        } = req.body;

        // Check if slot is already booked
        const existingBooking = await Booking.findOne({
    therapistId: req.therapistId,
    date,
    status: "booked",
    startTime: { $lt: endTime },
    endTime: { $gt: startTime }
});

        if (existingBooking) {
            return res.status(400).json({
                message: "This time slot is already booked"
            });
        }

        const booking = await Booking.create({
            therapistId: req.therapistId,
            clientName,
            clientEmail,
            date,
            startTime,
            endTime
        });

        res.status(201).json({
            message: "Booking created successfully",
            booking
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to create booking"
        });
    }
};


// GET BOOKINGS
const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({
            therapistId: req.therapistId
        });

        res.json({
            bookings
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to get bookings"
        });
    }
};


// CANCEL BOOKING
const cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findOneAndUpdate(
            {
                _id: req.params.id,
                therapistId: req.therapistId
            },
            {
                status: "cancelled"
            },
            {
                new: true
            }
        );

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        res.json({
            message: "Booking cancelled successfully",
            booking
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to cancel booking"
        });
    }
};



// PUBLIC CREATE BOOKING
const createPublicBooking = async (req, res) => {
    try {
        const {
    therapistId,
    clientName,
    clientEmail,
    clientTimezone,
    date,
    startTime,
    endTime
} = req.body;

        // Check for overlapping booking
        const existingBooking = await Booking.findOne({
            therapistId,
            date,
            status: "booked",
            startTime: { $lt: endTime },
            endTime: { $gt: startTime }
        });

        if (existingBooking) {
            return res.status(400).json({
                message: "This time slot is already booked"
            });
        }

        const booking = await Booking.create({
    therapistId,
    clientName,
    clientEmail,
    clientTimezone,
    date,
    startTime,
    endTime
});

        res.status(201).json({
            message: "Booking created successfully",
            booking
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to create booking"
        });
    }
};

// GET PUBLIC BOOKINGS
const getPublicBookings = async (req, res) => {
    try {
        const { therapistId, date } = req.query;

        const bookings = await Booking.find({
            therapistId,
            date,
            status: "booked"
        });

        res.json({
            bookings
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to get bookings"
        });
    }
};

// MARK BOOKING AS NO-SHOW
const markNoShow = async (req, res) => {
    try {
        const booking = await Booking.findOneAndUpdate(
            {
                _id: req.params.id,
                therapistId: req.therapistId,
                status: "booked"
            },
            {
                status: "no-show"
            },
            {
                new: true
            }
        );

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found or already updated"
            });
        }

        res.json({
            message: "Booking marked as no-show",
            booking
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to mark no-show"
        });
    }
};

module.exports = {
    createBooking,
    getBookings,
    createPublicBooking,
    getPublicBookings,
    cancelBooking,
    markNoShow
};