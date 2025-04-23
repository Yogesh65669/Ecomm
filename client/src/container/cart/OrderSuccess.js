import React from 'react';
import Header from '../../component/Header';
import successImage from '../../assets/success.png'; // Add your success image here
import '../../styles/OrderSuccess.css';

function OrderSuccess() {
  return (
    <div>
      <div className='orderSuccess-container'>
      <Header />
      <div className="container mt-4 text-center">
        <h2>Your Order Was Submitted Successfully!</h2>
        <img src={successImage} alt="Order Success" style={{ width: "200px", marginTop: "20px" }} />
        <p>Thank you for your purchase!</p>
        <a href="/" className="btn btn-primary mt-3">Continue Shopping</a>
      </div>
    </div>
    </div>
  );
}

export default OrderSuccess;
