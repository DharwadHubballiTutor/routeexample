import React, { useState, useEffect } from "react";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Function to remove item from cart
  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
  };

  return (
    <div className="container my-4">
      <h2 className="text-center">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div className="row">
          {cart.map((item) => (
            <div key={item.id} className="col-md-4 mb-3">
              <div className="card h-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="card-img-top w-50 mx-auto d-block"
                />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>

                  <p className="card-text text-success fw-bold">{item.quantity} X ${item.price}={item.quantity*item.price}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove from Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;
