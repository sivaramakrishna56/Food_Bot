const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const om = require("../model/Order");
dotenv.config();
const { v4: uuidv4 } = require("uuid");

exports.createPaymentIntent = async (req, res) => {
    try {
        const { amount } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: "INR",
            payment_method_types: ["card"],
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.userorders = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            console.warn("⚠️ Missing userId in request!");
            return res.status(400).json({ message: "User ID is required" });
        }

        const orders = await om.find({ userId }); 
        res.json(orders);
    } catch (error) {
        console.error("❌ Error fetching orders:", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.restorders= async (req, res) => {
    try {
        const { restaurantId } = req.params;

        if (!restaurantId) {
            return res.status(400).json({ message: "Restaurant ID is required" });
        }

        const orders = await om.find({ restaurantId });

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found for this restaurant" });
        }
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Place Order After Payment
exports.placeOrder = async (req, res) => {
    try {
        const { currentUser, restaurantId, cartItems, totalAmount, transactionId, paymentId } = req.body;

        if (!currentUser || !currentUser._id) {
            return res.status(400).json({ message: "Invalid user data" });
        }

        if (!restaurantId) {
            return res.status(400).json({ message: "Invalid restaurant data" });
        }

        const newOrder = new om({
            _id: uuidv4(),
            orderId: uuidv4(),
            userId: currentUser._id,
            restaurantId: restaurantId,
            cartItems,
            totalAmount,
            transactionId,
            paymentId,
            paymentStatus: "Paid",
            createdAt: new Date(),
        });

        await newOrder.save();

        // ✅ Send Email Notification
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        /*const userEmail = currentUser.email || currentUser._id;*/
        const userEmail = process.env.EMAIL_USER
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: "Order Confirmation",
            text: `Your order has been placed successfully! Order ID: ${newOrder._id}`,
        };
        await transporter.sendMail(mailOptions);
        res.status(201).json({ message: "Order placed successfully", order: newOrder });
    } catch (error) {
        console.error("❌ Order Processing Error:", error);
        res.status(500).json({ error: error.message });
    }
};
