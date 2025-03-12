import axios from "axios";

const placeOrder = async () => {
    try {
        const response = await axios.post("/api/orders/place-order", {
            currentUser: {
                _id: user._id,
                email: user.email
            },
            restaurantId: restaurantId, // Ensure this exists
            cartItems: cart,
            totalAmount: cartTotal,
            transactionId: paymentIntent.id,
            paymentId: paymentIntent.id
        });

        if (response.status === 201) {
            alert("Order placed successfully!");
        }
    } catch (error) {
        console.error("Order placement failed:", error.response?.data || error.message);
        alert("Error placing order!");
    }
};
export const placeOrderAction = (orderData) => async (dispatch) => {
    try {
        if (!orderData.restaurantId) {
            console.error("❌ ERROR: restaurantId is missing in orderData:", orderData);
            return;
        }

        dispatch({ type: "PLACE_ORDER_REQUEST" });

        const { data } = await axios.post("http://localhost:5000/api/orders/place-order", orderData);

        dispatch({ type: "PLACE_ORDER_SUCCESS", payload: data });
    } catch (error) {
        dispatch({
            type: "PLACE_ORDER_FAILED",
            payload: error.response?.data?.error || error.message,
        });
    }
};

module.exports=placeOrder
