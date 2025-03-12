import React, { useEffect, useState } from "react";
import axios from "axios";

const R_orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const restaurantId = localStorage.getItem("restEmail");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/auth/restaurantorders/${restaurantId}`)
                if (!Array.isArray(response.data)) {
                    throw new Error("Invalid response format");
                }
                setOrders(response.data);
            } catch (err) {
                console.error("❌ Error fetching orders:", err);
                setError("Failed to load restaurant orders. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        if (restaurantId) {
            fetchOrders();
        }
    }, [restaurantId]);

    // 🔹 Function to update order status
    const handleStatusChange = async (orderId, newStatus) => {
      try {
          
          const response = await axios.put("http://localhost:5000/auth/updateOrderStatus", {
              orderId,
              newStatus
          });
          console.log("✅ Status updated:", response.data);
  
          setOrders((orders) =>
              orders.map((order) =>
                  order.orderId === orderId ? { ...order, orderStatus: newStatus } : order
              )
          );
      } catch (error) {
          console.error("❌ Error updating order status:", error);
          alert("Failed to update order status. Please try again.");
      }
  };

    return (
        <div className="orders-container">
            <h2>Orders for Your Restaurant</h2>

            {loading && <p className="loading-text">⏳ Loading orders...</p>}
            {error && orders.length>0 &&<p className="error-text">❌ {error}</p>}
            {!loading && orders.length === 0 && <p className="no-orders">No orders received.</p>}

            {!loading && orders.length > 0 && (
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>User</th>
                            <th>Total Amount (₹)</th>
                            <th>Status</th>
                            <th>Created At</th>
                            <th>Items</th>
                            <th>Progress</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order.orderId}</td>
                                <td>{order.userId}</td>
                                <td>₹{order.totalAmount}</td>
                                <td className={order.paymentStatus.toLowerCase()}>{order.paymentStatus}</td>
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
                                <td>
                                    {/* Dropdown to change status */}
                                    <select
                                        value={order.orderStatus}
                                        onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                                    >
                                        <option value="preparing">Preparing</option>
                                        <option value="out for delivery">Out for Delivery</option>
                                        <option value="delivered">Delivered</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default R_orders;
