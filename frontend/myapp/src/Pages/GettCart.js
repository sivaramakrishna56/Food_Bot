import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import Ct from "./Ct";
import Checkout from "./Checkout";

const GettCart = () => {
  const [cart, setCart] = useState([]);
  const [ctotal, setCtotal] = useState(0);
  const obj = useContext(Ct);
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const restaurantId = cart.length > 0 ? cart[0].restaurantId : null;

  useEffect(() => {
    if (!obj.state?._id) {
      navigate("/api/login");
      return;
    }

    axios
      .get(`http://localhost:5000/api/gettcart/${obj.state._id}`, {
        headers: { Authorization: obj.state.token },
      })
      .then((res) => {
        setCart(res.data);
        obj.updstate({ cartlength: res.data.length });

        const total = res.data.reduce((acc, item) => acc + item.qty * item.price, 0);
        setCtotal(total);
      })
      .catch((err) => console.error("Error fetching cart:", err));
  }, [obj.state._id, refresh]);

  const updateCart = () => setRefresh((prev) => !prev);

  const modifyQuantity = (cid, qty, action) => {
    if (action === "decrease" && qty === 1) {
      deleteItem(cid);
      return;
    }

    const endpoint = action === "increase" ? "inc" : "dec";
    axios
      .get(`http://localhost:5000/api/${endpoint}/${cid}`, {
        headers: { Authorization: obj.state.token },
      })
      .then(updateCart);
  };

  const deleteItem = (cid) => {
    axios
      .delete(`http://localhost:5000/api/del/${cid}`, {
        headers: { Authorization: obj.state.token },
      })
      .then(updateCart);
  };

  return (
    <div className="cart-container">
      {cart.length === 0 ? (
        <div>Your cart is empty</div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cart.map((prod) => (
              <div className="cart-row" key={prod._id}>
                <img
                  src={`http://localhost:5000/prdimg/${prod.pimg}`}
                  alt={prod.name}
                  className="cart-img"
                />
                <div className="cart-details">
                  <h5 className="cart-title">{prod.name.toUpperCase()}</h5>
                  <p>Price: ₹{prod.price}</p>
                  <div className="item-row">
                    <button onClick={() => modifyQuantity(prod._id, prod.qty, "decrease")}>-</button>
                    {prod.qty}
                    <button onClick={() => modifyQuantity(prod._id, prod.qty, "increase")}>+</button>
                    <p>Total: ₹{prod.price * prod.qty}</p>
                    <button onClick={() => deleteItem(prod._id)}>🗑</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="checkout-section">
            <h5>🛒 Cart Total: ₹{ctotal}</h5>
            
            <Checkout
              ctotal={ctotal}
              currentUser={obj.state}
              cartItems={cart}
              restaurantId={restaurantId}
            />;

          </div>
        </div>
      )}
    </div>
  );
};

export default GettCart;
