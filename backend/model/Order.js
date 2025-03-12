const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    _id: { type: String },
    orderId: { type: String, unique: true }, 
    userId: { type: String, required: true },
    restaurantId: { type: String, required: true },
    cartItems: { type: Array, required: true },
    totalAmount: { type: Number, required: true },
    paymentStatus: { type: String, default: "Pending" },
    orderStatus: { type: String, default: "preparing" },
    transactionId: { type: String },
    createdAt: { type: Date, default: Date.now },
});

let om = mongoose.model("Order", OrderSchema);
module.exports = om;
