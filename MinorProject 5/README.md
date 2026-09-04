# 🛍️ StyleCart – Modern Fashion E-Commerce

StyleCart is a modern and responsive e-commerce frontend application built using **React.js** and **Redux Toolkit**.

It allows users to browse products, search and filter products, view product details, manage their shopping cart, save products to a wishlist, switch between light and dark mode, and complete a simulated checkout process.

---

## 🚀 Live Features

### 🏠 Home Page
- Attractive hero section
- Shop Now button
- Category-based product browsing
- Featured products
- View All Products option

### 🛍️ Product Listing
- Fetches products from DummyJSON API
- Search products by name
- Filter products by category
- Sort products by price
- Responsive product grid
- Loading state
- Error handling

### 📦 Product Details
- Product image
- Product name
- Category
- Rating
- Price
- Description
- Brand
- Stock availability
- Add to Cart functionality

### 🛒 Shopping Cart
- Add products to cart
- Increase product quantity
- Decrease product quantity
- Remove products
- Total item calculation
- Total price calculation
- Proceed to Checkout

### ❤️ Wishlist
- Add products to wishlist
- Remove products from wishlist
- Wishlist data persists after refreshing the page

### 🌙 Dark Mode
- Light/Dark mode toggle
- Dark mode preference saved using LocalStorage
- Preference remains after page refresh

### 💳 Checkout
- Order summary
- Product quantities
- Subtotal calculation
- Shipping cost
- Final total
- Simulated order placement
- Cart automatically clears after placing an order

### 📱 Responsive Design
The application is designed to work across:
- Desktop
- Tablet
- Mobile devices

---

## 🛠️ Technologies Used

- **React.js**
- **Redux Toolkit**
- **React Redux**
- **React Router DOM**
- **JavaScript (ES6+)**
- **HTML5**
- **CSS3**
- **LocalStorage**
- **DummyJSON API**
- **Vite**

---

## 📂 Project Structure

```text
stylecart/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ProductCard.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Wishlist.jsx
│   │   ├── Cart.jsx
│   │   └── Checkout.jsx
│   │
│   ├── store/
│   │   ├── store.js
│   │   ├── productSlice.js
│   │   ├── cartSlice.js
│   │   └── wishlistSlice.js
│   │
│   ├── assets/
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── package-lock.json
└── README.md