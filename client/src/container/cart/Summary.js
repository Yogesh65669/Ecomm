import React, { useState, useEffect } from 'react';
import Header from '../../component/Header';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../navigation/Route';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import '../../styles/Summary.css';

const stripePromise = loadStripe('pk_test_51QAPYuA9rIfqkqdh1WKQN5UkcXpNhsVCS4ENOEBJryS2PWLvHqerWeh8i0J41lMUgBHQHUcPbb8nCAmhX6H39Asl0076nhWLfZ');

function SummaryComponent() {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [currentAddress, setCurrentAddress] = useState({
        name: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        postalCode: '',
    });
    const [message, setMessage] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('stripe'); // 'stripe', 'paypal', 'razorpay'
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        setSelectedProducts(JSON.parse(localStorage.getItem('selectedProducts')) || []);
        setAddresses(JSON.parse(localStorage.getItem('addresses')) || []);
    }, []);

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setCurrentAddress({ ...currentAddress, [name]: value });
    };

    const handleAddressSelect = (e) => {
        const selectedAddress = JSON.parse(e.target.value);
        setCurrentAddress(selectedAddress);
    };

    const validateAddress = () => {
        const { name, phone, street, city, state, postalCode } = currentAddress;
        return name && phone && street && city && state && postalCode;
    };

    const handlePlaceOrder = async () => {
        if (!validateAddress()) {
            setMessage('Please fill in all address fields.');
            setTimeout(() => setMessage(''), 5000);
            return;
        }

        setIsProcessing(true);
       
        const totalAmount = selectedProducts.reduce((total, item) => total + (item.price * item.qty), 0) * 100;
 
        try {
            if (paymentMethod === 'stripe') {
                const { clientSecret } = await fetch('http://localhost:8082/create-payment-intent', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ amount: totalAmount }),
                }).then((res) => res.json());

                const cardElement = elements.getElement(CardElement);
                const result = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: cardElement,
                        billing_details: {
                            name: currentAddress.name,
                            address: {
                                line1: currentAddress.street,
                                city: currentAddress.city,
                                state: currentAddress.state,
                                postal_code: currentAddress.postalCode,
                            },
                        },
                    },
                });

                if (result.error) {
                    setMessage(result.error.message);
                } else if (result.paymentIntent.status === 'succeeded') {
                    updateOrderData();
                    navigate(ROUTES.orderSuccess.name);
                }
            } else if (paymentMethod === 'paypal') {
                setMessage('PayPal payment processing is not implemented yet.');
                updateOrderData();
                navigate(ROUTES.orderSuccess.name);
            } else if (paymentMethod === 'razorpay') {
                const options = {
                    key: 'YOUR_RAZORPAY_KEY', 
                    amount: totalAmount,
                    currency: 'INR',
                    name: 'Your Store Name',
                    description: 'Purchase Description',
                    handler: async (response) => {
                        try {
                            updateOrderData();
                            navigate(ROUTES.orderSuccess.name);
                        } catch (error) {
                            setMessage('Payment verification failed.');
                        }
                    },
                    prefill: {
                        name: currentAddress.name,
                        email: 'user@example.com',
                        contact: currentAddress.phone,
                    },
                };
                const rzp = new window.Razorpay(options);
                rzp.open();
            }
        } catch (error) {
            setMessage('An error occurred while processing your order.');
        } finally {
            setIsProcessing(false);
        }
    };

    const updateOrderData = () => {
        localStorage.setItem('addresses', JSON.stringify([currentAddress, ...addresses.slice(0, 2)]));
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const remainingItems = cartItems.filter((item) => !selectedProducts.some((p) => p._id === item._id));
        localStorage.setItem('cart', JSON.stringify(remainingItems));
        localStorage.setItem('selectedProducts', JSON.stringify([]));
    };

    return (
        <div>
            <div className='summary-container'>
                <Header />
                <div className="container mt-4 text-info">
                    <div className="row">
                        <div className="col-md-6">
                            <h3>Pickup Details</h3>
                            <select className="form-control mb-3" onChange={handleAddressSelect}>
                                <option value="">Select Your Delivery Address</option>
                                {addresses.map((address, index) => (
                                    <option key={index} value={JSON.stringify(address)}>{address.street}, {address.city}</option>
                                ))}
                            </select>

                            {['name', 'phone', 'street', 'city', 'state', 'postalCode'].map((field) => (
                                <div key={field}>
                                    <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                                    <input type="text" name={field} value={currentAddress[field]} onChange={handleAddressChange} className="form-control mb-2" required />
                                </div>
                            ))}
                        </div>

                        <div className="col-md-6">
                            <h3>Order Summary</h3>
                            {selectedProducts.map((item) => (
                                <div className="card mb-3 text-success" key={item._id}>
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name}</h5>
                                        <p className="card-text">Price: {item.price}</p>
                                        <p className="card-text">Quantity: {item.qty}</p>
                                        <p className="card-text">Total: {item.price * item.qty}</p>
                                    </div>
                                </div>
                            ))}
                            <h4>Total: {selectedProducts.reduce((total, item) => total + (item.price * item.qty), 0)}</h4>
                            <br />
                            <div className="mb-3">
                                <label>Select Payment Method:</label>
                                <select className="form-control" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                                    <option value="stripe">Stripe (Credit Card)</option>
                                    <option value="paypal">PayPal</option>
                                    <option value="razorpay">Razorpay</option>
                                </select>
                            </div>
                            {paymentMethod === 'stripe' || paymentMethod === 'paypal' || paymentMethod === 'razorpay' ? (
                             <>
                             {paymentMethod === 'stripe' ? (
                            <p className="text-info text-left">Pay Via Stripe</p>
                            ) : paymentMethod === 'paypal' ? (
                           <p className="text-info text-left">Pay Via Paypal</p>
                           ) : (
                           <p className="text-info text-left">Pay Via Razorpay</p>
                            )}
                            <CardElement className="form-control mb-3" />
                             </>
                            ) : null}
                            <button className="btn btn-primary" onClick={handlePlaceOrder} disabled={isProcessing}>
                                Place Order
                            </button>
                            {message && <div className="alert alert-danger mt-3">{message}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Summary() {
    return (
        <Elements stripe={stripePromise}>
            <SummaryComponent />
        </Elements>
    );
}