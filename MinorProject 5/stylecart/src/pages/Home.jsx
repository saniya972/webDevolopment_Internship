import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchProducts } from "../store/productSlice";
import ProductCard from "../components/ProductCard";

function Home() {
  const dispatch = useDispatch();

  const { items, loading } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

  const featuredProducts = items.slice(0, 8);

  return (
    <div className="home">

      {/* Hero Section */}

      <section className="hero">
        <div className="hero-content">
          <p>WELCOME TO STYLECART</p>

          <h1>
            Upgrade Your
            <br />
            Style ✨
          </h1>

          <p>
            Discover the latest products at amazing prices.
          </p>

          <Link to="/products" className="shop-btn">
            Shop Now →
          </Link>
        </div>
      </section>


      {/* Categories */}

      <section className="categories">
  <h2>Shop By Category</h2>

  <div className="category-container">

    <Link
      to="/products?category=mens-shirts"
      className="category-card"
    >
      👕
      <h3>Men's Fashion</h3>
    </Link>

    <Link
      to="/products?category=womens-dresses"
      className="category-card"
    >
      👗
      <h3>Women's Fashion</h3>
    </Link>

    <Link
      to="/products?category=mens-shoes"
      className="category-card"
    >
      👟
      <h3>Men's Shoes</h3>
    </Link>

    <Link
      to="/products?category=womens-shoes"
      className="category-card"
    >
      👠
      <h3>Women's Shoes</h3>
    </Link>

  </div>
</section>
      {/* Featured Products */}

      <section className="featured">

        <div className="section-header">
          <div>
            <h2>Featured Products ✨</h2>

            <p>
              Check out some of our popular products
            </p>
          </div>

          <Link to="/products">
            View All →
          </Link>
        </div>


        {loading ? (
          <div className="message">
            <h2>Loading products... ⏳</h2>
          </div>
        ) : (
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}

      </section>

    </div>
  );
}

export default Home;