import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const totalItems = useSelector((state) =>
    state.cart.items.reduce(
      (total, item) => total + item.quantity,
      0
    )
  );
  const [darkMode, setDarkMode] = useState(
  localStorage.getItem("darkMode") === "true"
);

useEffect(() => {
  if (darkMode) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }

  localStorage.setItem("darkMode", darkMode);
}, [darkMode]);

const toggleDarkMode = () => {
  setDarkMode(!darkMode);
};

  return (
    <nav className="navbar">
      <div className="logo">
        🛍️ StyleCart
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/products">
          Products
        </Link>

        <Link to="/cart">
          Cart 🛒 ({totalItems})
        </Link>
        <Link to="/wishlist">
            Wishlist ❤️
         </Link>
         <button
  className="theme-btn"
  onClick={toggleDarkMode}
>
  {darkMode ? "☀️" : "🌙"}
</button>
      </div>
    </nav>
  );
}

export default Navbar;