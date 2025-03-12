import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe("pk_test_51QuBATFpQxuXs331PI2BUZefDgaHqP8O83xQEFQGMnZmqRMmfZqAZO2o8WEKQqletpWF6G8xTfhLIGQaLv2KQH1u00YeJpcKoN");

const Checkout = ({ ctotal, currentUser, cartItems, restaurantId }) => {

  if (!restaurantId) {
    console.error("❌ ERROR: restaurantId is undefined! Check cartItems:", cartItems);
  }

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm 
        amount={ctotal} 
        currentUser={currentUser} 
        cartItems={cartItems} 
        restaurantId={restaurantId} 
      />
    </Elements>
  );
};


export default Checkout;