

import React, { useState, useEffect } from 'react';
import Header from '../../component/Header';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../navigation/Route';
import '../../styles/Cart.css'

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let items = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(items);
  }, []);

  function increaseQty(index) {
    let items = [...cartItems];
    items[index].qty += 1;
    setCartItems(items);
    localStorage.setItem('cart', JSON.stringify(items));
  }

  function decreaseQty(index) {
    let items = [...cartItems];
    if (items[index].qty > 1) {
      items[index].qty -= 1;
      setCartItems(items);
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }

  function removeItem(index) {
    let items = [...cartItems];
    items.splice(index, 1);
    setCartItems(items);
    localStorage.setItem('cart', JSON.stringify(items));
    // Trigger storage event to update cart count
    window.dispatchEvent(new Event('storage'));
    setSelectedItems(selectedItems.filter(i => i !== index)); // Remove from selected items
  }

  function handleCheckboxChange(index) {
    let items = [...selectedItems];
    if (items.includes(index)) {
      items = items.filter(i => i !== index);
    } else {
      items.push(index);
    }
    setSelectedItems(items);
    localStorage.setItem('selectedProducts', JSON.stringify(cartItems.filter((item, i) => items.includes(i))));
  }

  function getTotal() {
    return selectedItems.reduce((total, index) => total + (cartItems[index].price * cartItems[index].qty), 0);
  }

  function handleSummaryClick() {
    if (selectedItems.length === 0) {
      setMessage('Please select any item to buy.');
      setTimeout(() => setMessage(''), 2000); 
    } else {
      navigate(ROUTES.summary.name);
    }
  }

  return (
    <div>
      <div className='cart-container'>
      <Header />
      <div className="container mt-4">
        <button className="btn btn-primary mt-3" onClick={() => navigate(ROUTES.home.name)}>Continue Shopping</button>
        <h2>Your Cart</h2>
        {cartItems.length > 0 ? (
          <div>
            {cartItems.map((item, index) => (
              <div className="card mb-3" key={item._id}>
                <div className="row no-gutters align-items-center">
                  <div className="col-md-1">
                    <input 
                      type="checkbox" 
                      checked={selectedItems.includes(index)} 
                      onChange={() => handleCheckboxChange(index)} 
                    />
                  </div>
                  <div className="col-md-3">
                    <img src={"http://localhost:8082/" + item.images[0]} className="card-img" alt="Product" style={{ height: "100px", width: "auto" }} />
                  </div>
                  <div className="col-md-5">
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">Price: {item.price}</p>
                      <div className="d-flex align-items-center">
                        <button className="btn btn-outline-secondary" onClick={() => decreaseQty(index)}>-</button>
                        <span className="mx-2">{item.qty}</span>
                        <button className="btn btn-outline-secondary" onClick={() => increaseQty(index)}>+</button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <button className="btn btn-danger mt-2" onClick={() => removeItem(index)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
            <h3>Total: {getTotal()}</h3>
            <button className="btn btn-secondary mt-3 float-right" onClick={handleSummaryClick}>Summary</button>
            {message && <div className="alert alert-danger mt-3">{message}</div>}
          </div>
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
    </div>
    </div>
  );
}

export default Cart;
