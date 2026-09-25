require("dotenv").config();

const express = require("express");
const cors = require("cors");
const authRoutes = require("./src/routes/authRoutes");
const availabilityRoutes = require("./src/routes/availabilityRoutes");
const bookingRoutes = require("./src/routes/bookingRoutes");
const clientRoutes = require("./src/routes/clientRoutes");
const packageRoutes = require("./src/routes/packageRoutes");
const paymentRoutes = require("./src/routes/paymentRoutes");
const packagePurchaseRoutes = require("./src/routes/packagePurchaseRoutes");
const sessionNoteRoutes = require("./src/routes/sessionNoteRoutes");
const messageRoutes = require("./src/routes/messageRoutes");
const subscriptionRoutes = require("./src/routes/subscriptionRoutes");
const entitlementRoutes = require("./src/routes/entitlementRoutes");
const analyticsRoutes = require("./src/routes/analyticsRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/package-purchases", packagePurchaseRoutes);
app.use("/api/session-notes", sessionNoteRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/entitlements", entitlementRoutes);
app.use("/api/analytics", analyticsRoutes);


app.get("/", (req, res) => {
    res.json({
        message: "Unfazed API is running"
    });
});

module.exports = app;