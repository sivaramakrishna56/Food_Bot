import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const userId = localStorage.getItem("userEmail");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/uorder/${userId}`);
                if (!Array.isArray(response.data)) {
                    throw new Error("Invalid response format");
                }
                setData(response.data);
            } catch (err) {
                console.error("❌ Error fetching orders:", err);
                setError("Failed to load orders. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchOrders();
        }
    }, [userId]);

    return (
        <div className="orders-container">
            <h2>Your Orders</h2>

            {loading && <p className="loading-text">⏳ Loading orders...</p>}
            {error && <p className="error-text">❌ {error}</p>}
            {!loading && data.length === 0 && <p className="no-orders">No orders found.</p>}

            {!loading && data.length > 0 && (
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Restaurant</th>
                            <th>Total Amount (₹)</th>
                            <th>Status</th>
                            <th>Created At</th>
                            <th>Items</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((order) => (
                            <tr key={order._id}>
                                <td>{order.orderId}</td>
                                <td>{order.restaurantId}</td>
                                <td>₹{order.totalAmount}</td>
                                <td className="status">{order.orderStatus || "Preparing"}</td>
                                <td>{new Date(order.createdAt).toLocaleString()}</td>
                                <td>
                                    <ul>
                                        {order.cartItems.map((item) => (
                                            <li key={item._id}>
                                                {item.name} - {item.qty} x ₹{item.price}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Orders;
