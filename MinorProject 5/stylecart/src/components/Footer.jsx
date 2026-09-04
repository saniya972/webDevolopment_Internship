import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-section">
          <h2>🛍️ StyleCart</h2>
          <p>
            Discover amazing products at
            affordable prices.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/wishlist">Wishlist ❤️</Link>
          <Link to="/cart">Cart 🛒</Link>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>📧 support@stylecart.com</p>
          <p>📞 +91 98765 43210</p>
          <p>📍 Hyderabad, India</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © 2026 StyleCart. All Rights Reserved.
        </p>
      </div>

    </footer>
  );
}

export default Footer;