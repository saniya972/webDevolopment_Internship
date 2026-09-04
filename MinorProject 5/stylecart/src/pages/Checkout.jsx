import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart } from "../store/cartSlice";

function Checkout() {
  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 0 ? 10 : 0;

  const total = subtotal + shipping;
  const dispatch = useDispatch();

const handlePlaceOrder = () => {
  alert("Order placed successfully! 🎉");

  dispatch(clearCart());
};
  if (cartItems.length === 0) {
    return (
      <div className="message">
        <h2>Your Cart is Empty 🛒</h2>
        <p>Add products before checkout.</p>

        <Link to="/products" className="shop-btn">
          Continue Shopping →
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1>Checkout 🛍️</h1>

      <div className="checkout-container">

        <div className="checkout-products">
          <h2>Order Summary</h2>

          {cartItems.map((item) => (
            <div
              className="checkout-item"
              key={item.id}
            >
              <img
                src={item.thumbnail}
                alt={item.title}
              />

              <div>
                <h3>{item.title}</h3>

                <p>
                  Quantity: {item.quantity}
                </p>

                <p>
                  ${item.price} × {item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="checkout-summary">
          <h2>Price Details</h2>

          <div className="price-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="price-row">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>

          <hr />

          <div className="price-row total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button
  className="checkout-btn"
  onClick={handlePlaceOrder}
>
  Place Order 🎉
</button>
        </div>

      </div>
    </div>
  );
}

export default Checkout;