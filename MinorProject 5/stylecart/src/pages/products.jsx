import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productSlice";
import ProductCard from "../components/ProductCard";

function Products() {

  const dispatch = useDispatch();

  const { items, loading, error } = useSelector(
    (state) => state.products
  );
  const [searchParams] = useSearchParams();

const categoryFromURL =
  searchParams.get("category");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(
  categoryFromURL || "all"
);
  const [sort, setSort] = useState("default");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Get unique categories
  const categories = [
    "all",
    ...new Set(items.map((product) => product.category))
  ];

  // Search + Filter
  let filteredProducts = items.filter((product) => {

    const searchText = search.toLowerCase();

const matchesSearch =
  product.title.toLowerCase().includes(searchText) ||
  product.description.toLowerCase().includes(searchText) ||
  product.category.toLowerCase().includes(searchText) ||
  (product.brand &&
    product.brand.toLowerCase().includes(searchText));

    const matchesCategory =
      category === "all" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  // Sort
  if (sort === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  if (loading) {
    return (
      <div className="message">
        <h2>Loading products... ⏳</h2>
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

  return (
    <div className="products-page">

      <div className="products-header">
        <h1>Explore Products</h1>

        <p>
          Find the perfect products for you
        </p>
      </div>

      {/* Search and Filters */}

      <div className="filters">

        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "all"
                ? "All Categories"
                : cat}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="default">
            Sort Products
          </option>

          <option value="low">
            Price: Low to High
          </option>

          <option value="high">
            Price: High to Low
          </option>
        </select>

      </div>

      {/* Product Count */}

      <p className="product-count">
        {filteredProducts.length} products found
      </p>

      {/* Products */}

      {filteredProducts.length === 0 ? (

        <div className="message">
          <h2>No products found 😔</h2>
          <p>Try another search or category.</p>
        </div>

      ) : (

        <div className="product-grid">

          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>

      )}

    </div>
  );
}

export default Products;