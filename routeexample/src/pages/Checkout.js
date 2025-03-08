import React, { useState, useEffect } from "react";

function Checkout() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Increase quantity
  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    alert("Proceeding to Checkout!");
    localStorage.removeItem("cart");
    setCart([]);
  };

  return (
    <div className="container my-4">
      <h2 className="text-center">Checkout</h2>
      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div>
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
                    <p className="card-text text-success fw-bold">
                      ${item.price} x {item.quantity} = ${item.price * item.quantity}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <button
                          className="btn btn-sm btn-secondary me-2"
                          onClick={() => decreaseQuantity(item.id)}
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          className="btn btn-sm btn-secondary ms-2"
                          onClick={() => increaseQuantity(item.id)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <h4 className="text-center mt-3">Total: ${totalPrice.toFixed(2)}</h4>
          <div className="text-center">
            <button className="btn btn-success mt-3" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
