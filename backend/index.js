const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

// ✅ Load environment variables at the very top
dotenv.config();

const rt = require("./route/rt");
const rrt = require("./route/rrt");
const om = require("./model/Order");

// ✅ Check if the Stripe secret key is loaded
if (!process.env.STRIPE_SECRET_KEY) {
  console.error("❌ ERROR: STRIPE_SECRET_KEY is missing in .env file");
  process.exit(1); // Stop the server if no key is found
}

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/fddb")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000" }));
app.put("/auth/updateOrderStatus", async (req, res) => {
  try {
      const { orderId, newStatus } = req.body;

      if (!orderId || !newStatus) {
          return res.status(400).json({ success: false, message: "Missing required fields" });
      }

      const order = await om.findOneAndUpdate(
          { orderId },
          { orderStatus: newStatus },
          { new: true }
      );

      if (!order) {
          return res.status(404).json({ success: false, message: "Order not found" });
      }

      res.json({ success: true, message: "Order status updated", order });
  } catch (error) {
      console.error("❌ Server error:", error.message);
      res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});



// ✅ Define routes
app.use("/api", rt);
app.use("/auth", rrt);
app.use("/resimg", express.static("./restimgs"));
app.use("/prdimg", express.static("./prodimgs"));

// Default route
app.get("/", (req, res) => {
  res.send("✅ Server is running!");
});
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));