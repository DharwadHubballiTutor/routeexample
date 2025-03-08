import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Footer from "./footer";
import Cart from "./Cart";

function Home() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleFilter = (e) => {
    setCategoryFilter(e.target.value);
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.
      find((item) => item.id === product.id);

      if (existingItem) {
        // If the product is already in the cart, increment its quantity
        return prevCart.map((item) =>
          item.id === product.id ? 
        { ...item, quantity: item.quantity + 1 } 
        : item
        );
      } else {
        // If it's a new product, add it with quantity 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  

  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((product) =>
      categoryFilter ? product.category === categoryFilter : true
    )
    .sort((a, b) => (sortOrder === "asc" ? a.price - b.price : b.price - a.price));

  return (
    <>
      <div className="container my-3">
        <div className="mt-4 p-5 bg-primary text-white rounded">
          <h1>Welcome to Ecommerce</h1>
          <p>Shop the best products at unbeatable prices.</p>
        </div>
      </div>
      <div className="container py-4">
        <h1 className="text-center mb-4">Product List</h1>
        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <button onClick={handleSort} className="btn btn-primary w-100">
              Sort by Price ({sortOrder})
            </button>
          </div>
          <div className="col-md-3">
            <select onChange={handleFilter} className="form-select">
              <option value="">All Categories</option>
              {[...new Set(products.map((p) => p.category))].map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row">
          {filteredProducts.map((product) => (
            <div key={product.id} className="col-md-4 mb-4">
              <div className="card h-100">
                <img
                  src={product.image}
                  alt={product.title}
                  className="card-img-top w-50 mx-auto d-block"
                />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text text-muted">{product.category}</p>
                  <p className="card-text text-success fw-bold">${product.price}</p>
                  <button onClick={() => addToCart(product)} 
                  className="btn btn-success w-100">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
