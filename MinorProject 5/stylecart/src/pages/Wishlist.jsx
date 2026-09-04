import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../store/wishlistSlice";

function Wishlist() {
  const dispatch = useDispatch();

  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );

  if (wishlistItems.length === 0) {
    return (
      <div className="message">
        <h2>Your Wishlist is Empty ❤️</h2>
        <p>Click ♡ on a product to add it to your wishlist.</p>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>My Wishlist ❤️</h1>
        <p>{wishlistItems.length} items saved</p>
      </div>

      <div className="product-grid">
        {wishlistItems.map((product) => (
          <div className="product-card" key={product.id}>

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

                <button
                  onClick={() =>
                    dispatch(toggleWishlist(product))
                  }
                >
                  Remove ❤️
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;