import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { API_URL } from "../config";


const CheckoutForm = ({ amount, currentUser, cartItems }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!amount || amount <= 0) {
      setErrorMessage("Invalid payment amount.");
      return;
    }

    const fetchClientSecret = async () => {
      try {
        const { data } = await axios.post(`${API_URL}/api/payments/create-payment-intent`, { amount });
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("❌ Error fetching clientSecret:", error.response?.data || error);
        setErrorMessage("Failed to fetch payment details. Try again later.");
      }
    };

    fetchClientSecret();
  }, [amount]);

  // Group cart items by restaurantId
  const groupByRestaurant = (items) => {
    return items.reduce((acc, item) => {
      if (!item.restaurantId) {
        console.error("❌ ERROR: Missing restaurantId in item:", item);
      }
      if (!acc[item.restaurantId]) {
        acc[item.restaurantId] = [];
      }
      acc[item.restaurantId].push(item);
      return acc;
    }, {});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);
    setErrorMessage("");

    try {
      const card = elements.getElement(CardElement);
      if (!card) {
        setErrorMessage("❌ Card details are missing.");
        setLoading(false);
        return;
      }

      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card },
      });

      if (error) {
        setErrorMessage(error.message);
        console.error("❌ Payment failed:", error.message);
        setLoading(false);
        return;
      }

      setSuccess(true);

      if (paymentIntent?.status === "succeeded") {
        console.log("✅ Payment successful:", paymentIntent);

        // Group orders by restaurantId
        const groupedOrders = groupByRestaurant(cartItems);

        const orderPromises = Object.keys(groupedOrders).map(async (restaurantId) => {
          const orderData = {
            token: paymentIntent.id,
            totalAmount: groupedOrders[restaurantId].reduce((sum, item) => sum + item.price * item.qty, 0),
            currentUser: { _id: currentUser._id, email: currentUser.email },
            cartItems: groupedOrders[restaurantId], 
            restaurantId,
            paymentId: paymentIntent.id,
          };

          try {
            const response = await axios.post(`${API_URL}/api/orders/place-order`, orderData);
            console.log(`✅ Order Placed for Restaurant ${restaurantId}:`, response.data);
          } catch (orderError) {
            console.error(`❌ Order Processing Error for Restaurant ${restaurantId}:`, orderError.response?.data || orderError);
          }
        });

        // Wait for all orders to be processed
        await Promise.all(orderPromises);

        alert("Payment Successful! Orders placed.");
      }
    } catch (err) {
      console.error("❌ Error processing payment:", err);
      setErrorMessage("Payment failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <h3>Complete Payment</h3>
      <CardElement className="card-element" />
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <button type="submit" disabled={!stripe || loading} className="pay-button">
        {loading ? "Processing..." : "Pay Now"}
      </button>
      {success && <p className="success-message">Payment Successful!</p>}
    </form>
  );
};

export default CheckoutForm;