import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchProducts } from "../store/productSlice";
import { addToCart } from "../store/cartSlice";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { items, loading, error } = useSelector(
    (state) => state.products
  );

  const product = items.find(
    (item) => item.id === Number(id)
  );

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

  if (loading) {
    return (
      <div className="message">
        <h2>Loading product... ⏳</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="message">
        <h2>Something went wrong ❌</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="message">
        <h2>Product not found 😔</h2>
      </div>
    );
  }

  return (
    <div className="product-details">

      <div className="details-image">
        <img
          src={product.thumbnail}
          alt={product.title}
        />
      </div>

      <div className="details-info">

        <p className="product-category">
          {product.category}
        </p>

        <h1>{product.title}</h1>

        <p className="details-rating">
          ⭐ {product.rating}
        </p>

        <h2>${product.price}</h2>

        <p className="details-description">
          {product.description}
        </p>

        <p>
          <strong>Brand:</strong>{" "}
          {product.brand || "Not available"}
        </p>

        <p>
          <strong>Stock:</strong> {product.stock}
        </p>

        <button
          className="add-cart-btn"
          onClick={() => dispatch(addToCart(product))}
        >
          🛒 Add to Cart
        </button>

      </div>

    </div>
  );
}

export default ProductDetails;