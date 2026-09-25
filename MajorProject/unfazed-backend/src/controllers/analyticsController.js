const Client = require("../models/Client");
const Booking = require("../models/Booking");
const Payment = require("../models/Payment");
const mongoose = require("mongoose");

const { canAccess } = require("../services/entitlementService");

const getAnalytics = async (req, res) => {
    try {
        const therapistId = req.therapistId;

        // Check analytics entitlement
        const allowed = await canAccess(
            therapistId,
            "analytics"
        );

        if (!allowed) {
            return res.status(403).json({
                message:
                    "Analytics are not available on your current plan. Please upgrade."
            });
        }

        // 1. Total clients
        const totalClients = await Client.countDocuments({
            therapistId
        });

        // 2. Total bookings
        const totalBookings = await Booking.countDocuments({
            therapistId
        });

        
        // 3. Active clients
        const therapistObjectId = new mongoose.Types.ObjectId(
            therapistId
        );

        const activeClientsResult = await Booking.aggregate([
            {
                $match: {
                    therapistId: therapistObjectId,
                    status: "booked"
                }
            },
            {
                $group: {
                    _id: "$clientEmail"
                }
            },
            {
                $count: "activeClients"
            }
        ]);

        const activeClients =
            activeClientsResult.length > 0
                ? activeClientsResult[0].activeClients
                : 0;
        // 4. No-show rate
      const noShowResult = await Booking.aggregate([
    {
        $match: {
            therapistId: therapistObjectId
        }
    },
    {
        $group: {
            _id: null,
            total: { $sum: 1 },
            noShows: {
                $sum: {
                    $cond: [
                        { $eq: ["$status", "no-show"] },
                        1,
                        0
                    ]
                }
            }
        }
    }
]);

let noShowRate = 0;

if (noShowResult.length > 0) {
    const total = noShowResult[0].total;
    const noShows = noShowResult[0].noShows;

    if (total > 0) {
        noShowRate = (noShows / total) * 100;
    }
}

        // 5. Revenue trend
        const revenueTrend = await Payment.aggregate([
            {
                $match: {
                   therapistId: therapistObjectId,
                    status: "paid"
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" }
                    },
                    revenue: {
                        $sum: "$amount"
                    }
                }
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1
                }
            }
        ]);

        res.json({
            totalClients,
            totalBookings,
            activeClients,
            noShowRate: Number(noShowRate.toFixed(2)),
            revenueTrend
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to get analytics"
        });
    }
};

module.exports = {
    getAnalytics
};