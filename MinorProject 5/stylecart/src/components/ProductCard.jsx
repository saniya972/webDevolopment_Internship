import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { addToCart } from "../store/cartSlice";
import { toggleWishlist } from "../store/wishlistSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );

  const isWishlisted = wishlistItems.some(
    (item) => item.id === product.id
  );

  return (
    <div className="product-card">

      <button
        className="wishlist-btn"
        onClick={() => dispatch(toggleWishlist(product))}
      >
        {isWishlisted ? "❤️" : "♡"}
      </button>

      <Link
        to={`/product/${product.id}`}
        className="product-link"
      >
        <div className="product-image">
          <img
            src={product.thumbnail}
            alt={product.title}
          />
        </div>

        <div className="product-info">
          <p className="product-category">
            {product.category}
          </p>

          <h3>{product.title}</h3>

          <p className="rating">
            ⭐ {product.rating}
          </p>

          <div className="product-bottom">
            <span className="price">
              ${product.price}
            </span>
          </div>
        </div>
      </Link>

      <button
        onClick={() => dispatch(addToCart(product))}
      >
        🛒 Add
      </button>

    </div>
  );
}

export default ProductCard;