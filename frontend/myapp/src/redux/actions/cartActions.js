export const addToCart = (product) => async (dispatch, getState) => {
    const cartItem = {
        _id: product._id,
        uid: product.uid,
        pid: product.pid,
        name: product.name,
        qty: product.qty,
        price: product.price,
        pimg: product.pimg,
        restaurantId: product.restaurantId || product.resId // Ensure `restaurantId` is added!
    };

    dispatch({ type: "ADD_TO_CART", payload: cartItem });

    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

export default cartActions