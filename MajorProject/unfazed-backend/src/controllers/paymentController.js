const Razorpay = require("razorpay");
const Package = require("../models/Package");
const Payment = require("../models/Payment");
const PackagePurchase = require("../models/PackagePurchase");

let razorpay = null;

if (
    process.env.RAZORPAY_KEY_ID &&
    process.env.RAZORPAY_KEY_SECRET
) {
    razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    });
}

const createPaymentOrder = async (req, res) => {
    try {
        if (!razorpay) {
    return res.status(503).json({
        message: "Online payment is not configured yet. Please use test payment."
    });
}
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

        const amount = packageData.price;

        const platformFee = 0;

        const netAmount = amount - platformFee;

        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        };

        const order = await razorpay.orders.create(options);

        const payment = await Payment.create({
            therapistId: packageData.therapistId,
            packageId: packageData._id,
            clientName,
            clientEmail,
            amount,
            platformFee,
            netAmount,
            gatewayTransactionId: order.id,
            razorpayOrderId: order.id,
            status: "created"
        });

        res.status(201).json({
            message: "Payment order created",
            order,
            paymentId: payment._id,
            keyId: process.env.RAZORPAY_KEY_ID
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to create payment order"
        });
    }
};

const getInvoice = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.paymentId);

        if (!payment) {
            return res.status(404).json({
                message: "Payment not found"
            });
        }

        const generateInvoice = require("../utils/invoiceGenerator");

        generateInvoice(payment, res);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to generate invoice"
        });
    }
};

const paymentWebhook = async (req, res) => {
    try {
        const event = req.body;

        if (event.event === "payment.captured") {
            const paymentData = event.payload.payment.entity;

            const payment = await Payment.findOne({
                razorpayOrderId: paymentData.order_id
            });

            if (payment) {
                payment.status = "paid";
                payment.razorpayPaymentId = paymentData.id;
                payment.gatewayTransactionId = paymentData.id;

                await payment.save();

                console.log("Payment marked as paid");
            }
        }

        res.status(200).json({
            message: "Webhook received"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Webhook failed"
        });
    }
};

const createTestPayment = async (req, res) => {
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

        const amount = packageData.price;

        const platformFee = 0;

        const netAmount = amount - platformFee;

        const payment = await Payment.create({
            therapistId: packageData.therapistId,
            packageId: packageData._id,
            clientName,
            clientEmail,
            amount,
            platformFee,
            netAmount,
            gatewayTransactionId: `TEST_${Date.now()}`,
            razorpayOrderId: `TEST_ORDER_${Date.now()}`,
            razorpayPaymentId: `TEST_PAYMENT_${Date.now()}`,
            status: "paid"
        });

        //const PackagePurchase = require("../models/PackagePurchase");

const purchaseDate = new Date();

const expiryDate = new Date(purchaseDate);

expiryDate.setDate(
    expiryDate.getDate() + packageData.validityDays
);

const packagePurchase = await PackagePurchase.create({
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
    message: "Test payment and package purchase created successfully",
    paymentId: payment._id,
    payment,
    packagePurchase
});

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to create test payment"
        });
    }
};

module.exports = {
    createPaymentOrder,
    getInvoice,
    paymentWebhook,
    createTestPayment
};