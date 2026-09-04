import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../store/cartSlice";

function Cart() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="message">
        <h2>Your cart is empty 🛒</h2>
        <p>Add some products to your cart.</p>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Shopping Cart 🛒</h1>

      {cartItems.map((item) => (
        <div className="cart-item" key={item.id}>
          <img src={item.thumbnail} alt={item.title} />

          <div className="cart-item-info">
            <h3>{item.title}</h3>

            <p>${item.price}</p>

            <div className="quantity">
              <button
                onClick={() => dispatch(decreaseQuantity(item.id))}
              >
                −
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() => dispatch(increaseQuantity(item.id))}
              >
                +
              </button>
            </div>

            <button
              className="remove-btn"
              onClick={() => dispatch(removeFromCart(item.id))}
            >
              Remove ❌
            </button>
          </div>
        </div>
      ))}

      <div className="cart-summary">
        <h2>Cart Summary</h2>

        <p>Total Items: {totalItems}</p>

        <p>
          Total Price: ${totalPrice.toFixed(2)}
        </p>

        <Link
  to="/checkout"
  className="checkout-btn"
>
  Proceed to Checkout
</Link>
      </div>
    </div>
  );
}

export default Cart;