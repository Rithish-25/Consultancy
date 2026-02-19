import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import { useCart } from '../context/CartContext';
import API_URL from '../config/api';
import SuccessModal from '../components/SuccessModal';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, cartCount, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [step, setStep] = useState('cart'); // cart, shipping, payment, gpay, card
    const [shippingDetails, setShippingDetails] = useState({
        name: '',
        phone: '',
        address: '',
        pincode: ''
    });
    const [cardDetails, setCardDetails] = useState({
        number: '',
        expiry: '',
        cvv: ''
    });
    const [paymentMethod, setPaymentMethod] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShippingDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleCardInputChange = (e) => {
        const { name, value } = e.target;
        // Basic formatting/validation can be added here
        setCardDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleBuyNow = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please login to buy');
            navigate('/login');
            return;
        }
        setStep('shipping');
    };

    const submitOrder = async (method) => {
        const token = localStorage.getItem('token');
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify({
                    items: cart,
                    totalAmount: cartTotal,
                    shippingDetails,
                    paymentMethod: method || paymentMethod
                })
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.msg || 'Order failed');
            }

            clearCart();
            setShowSuccess(true);
        } catch (err) {
            alert('Order failed: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handlePaymentSelect = (method) => {
        setPaymentMethod(method);
        if (method === 'GPay') {
            setStep('gpay');
        } else if (method === 'Card') {
            setStep('card');
        } else {
            submitOrder(method);
        }
    };

    const handleSuccessClose = () => {
        setShowSuccess(false);
        navigate('/');
    };

    const upiID = "rithish0637@okhdfcbank";
    const upiLink = `upi://pay?pa=${upiID}&pn=CanonBall%20Fashions&am=${cartTotal}&cu=INR`;
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiLink)}`;

    return (
        <>
            <Navbar />
            <SuccessModal
                isOpen={showSuccess}
                message="Order placed successfully!"
                onClose={handleSuccessClose}
            />
            <div style={{ padding: '6rem 2rem', minHeight: '100vh', background: 'var(--color-background)' }}>
                <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 style={{ marginBottom: '2rem', fontFamily: "'Playfair Display', serif", textAlign: 'center' }}>
                            {step === 'cart' ? `Your Cart (${cartCount})` : step === 'shipping' ? 'Shipping Details' : step === 'payment' ? 'Payment Method' : step === 'card' ? 'Card Details' : 'GPay Scanner'}
                        </h1>

                        {cart.length === 0 && step === 'cart' ? (
                            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                                <p style={{ fontSize: '1.2rem', color: 'var(--color-text-light)', marginBottom: '2rem' }}>
                                    Your cart is currently empty.
                                </p>
                                <Link to="/collections">
                                    <Button variant="primary">Start Shopping</Button>
                                </Link>
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gridTemplateColumns: step === 'cart' ? '2fr 1fr' : '1fr', gap: '2rem', alignItems: 'start' }}>
                                {/* Cart Items Step */}
                                {step === 'cart' && (
                                    <>
                                        <div style={{ background: 'white', borderRadius: '1rem', padding: '1.5rem', boxShadow: 'var(--shadow-md)' }}>
                                            {cart.map(item => (
                                                <div key={item._id} style={{
                                                    display: 'flex',
                                                    gap: '1.5rem',
                                                    borderBottom: '1px solid #e2e8f0',
                                                    paddingBottom: '1.5rem',
                                                    marginBottom: '1.5rem',
                                                    alignItems: 'center'
                                                }}>
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        style={{ width: '80px', height: '100px', objectFit: 'cover', borderRadius: '0.5rem' }}
                                                    />
                                                    <div style={{ flex: 1 }}>
                                                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>{item.name}</h3>
                                                        <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                                                            {item.category}
                                                        </p>
                                                        {item.selectedSize && (
                                                            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                                                                <span style={{ fontWeight: 600 }}>Size:</span> {item.selectedSize}
                                                            </p>
                                                        )}
                                                        <p style={{ fontWeight: 600 }}>{item.price}</p>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }}>
                                                            <button
                                                                onClick={() => updateQuantity(item._id, item.quantity - 1, item.selectedSize)}
                                                                style={{ padding: '0.5rem 1rem', background: 'none', border: 'none', cursor: 'pointer' }}
                                                            >
                                                                -
                                                            </button>
                                                            <span style={{ padding: '0.5rem', fontWeight: 500 }}>{item.quantity}</span>
                                                            <button
                                                                onClick={() => {
                                                                    if (item.quantity < item.stock) {
                                                                        updateQuantity(item._id, item.quantity + 1, item.selectedSize);
                                                                    } else {
                                                                        alert(`Only ${item.stock} items in stock!`);
                                                                    }
                                                                }}
                                                                disabled={item.quantity >= item.stock}
                                                                style={{
                                                                    padding: '0.5rem 1rem',
                                                                    background: 'none',
                                                                    border: 'none',
                                                                    cursor: item.quantity >= item.stock ? 'not-allowed' : 'pointer',
                                                                    opacity: item.quantity >= item.stock ? 0.5 : 1
                                                                }}
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                        <button
                                                            onClick={() => removeFromCart(item._id, item.selectedSize)}
                                                            style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }}
                                                            aria-label="Remove item"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <polyline points="3 6 5 6 21 6"></polyline>
                                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div style={{ background: 'white', borderRadius: '1rem', padding: '1.5rem', boxShadow: 'var(--shadow-md)', position: 'sticky', top: '100px' }}>
                                            <h3 style={{ fontSize: '1.25rem', fontFamily: "'Playfair Display', serif", marginBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
                                                Order Summary
                                            </h3>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                                <span style={{ color: 'var(--color-text-light)' }}>Subtotal</span>
                                                <span style={{ fontWeight: 600 }}>₹{cartTotal.toLocaleString()}</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                                <span style={{ color: 'var(--color-text-light)' }}>Shipping</span>
                                                <span style={{ color: '#16a34a', fontSize: '0.9rem' }}>Free</span>
                                            </div>
                                            <div style={{ borderTop: '1px solid #e2e8f0', margin: '1rem 0', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Total</span>
                                                <span style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--color-primary)' }}>₹{cartTotal.toLocaleString()}</span>
                                            </div>
                                            <Button variant="primary" style={{ width: '100%' }} onClick={handleBuyNow}>
                                                Buy Now
                                            </Button>
                                        </div>
                                    </>
                                )}

                                {/* Shipping Details Step */}
                                {step === 'shipping' && (
                                    <div style={{ background: 'white', borderRadius: '1rem', padding: '2rem', boxShadow: 'var(--shadow-lg)', maxWidth: '500px', margin: '0 auto' }}>
                                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                                            <div>
                                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Full Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={shippingDetails.name}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter your name"
                                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Phone Number</label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={shippingDetails.phone}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter phone number"
                                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Address</label>
                                                <textarea
                                                    name="address"
                                                    value={shippingDetails.address}
                                                    onChange={handleInputChange}
                                                    placeholder="Flat / House no. / Street"
                                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', minHeight: '100px' }}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Pincode</label>
                                                <input
                                                    type="text"
                                                    name="pincode"
                                                    value={shippingDetails.pincode}
                                                    onChange={handleInputChange}
                                                    placeholder="6-digit pincode"
                                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
                                                    required
                                                />
                                            </div>
                                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                                <Button variant="secondary" style={{ flex: 1 }} onClick={() => setStep('cart')}>Back</Button>
                                                <Button
                                                    variant="primary"
                                                    style={{ flex: 1 }}
                                                    disabled={!shippingDetails.name || !shippingDetails.phone || !shippingDetails.address || !shippingDetails.pincode}
                                                    onClick={() => setStep('payment')}
                                                >
                                                    Continue to Payment
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Payment Method Step */}
                                {step === 'payment' && (
                                    <div style={{ background: 'white', borderRadius: '1rem', padding: '2rem', boxShadow: 'var(--shadow-lg)', maxWidth: '500px', margin: '0 auto' }}>
                                        <div style={{ display: 'grid', gap: '1rem' }}>
                                            <button
                                                onClick={() => handlePaymentSelect('COD')}
                                                style={{ padding: '1.5rem', borderRadius: '1rem', border: '2px solid #f1f5f9', background: 'none', cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                            >
                                                <div>
                                                    <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Cash on Delivery</div>
                                                    <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Pay when you receive the product</div>
                                                </div>
                                                <span style={{ fontSize: '1.5rem' }}>💵</span>
                                            </button>
                                            <button
                                                onClick={() => handlePaymentSelect('Card')}
                                                style={{ padding: '1.5rem', borderRadius: '1rem', border: '2px solid #f1f5f9', background: 'none', cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                            >
                                                <div>
                                                    <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Credit / Debit Card</div>
                                                    <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Visa, Mastercard, RuPay</div>
                                                </div>
                                                <span style={{ fontSize: '1.5rem' }}>💳</span>
                                            </button>
                                            <button
                                                onClick={() => handlePaymentSelect('GPay')}
                                                style={{ padding: '1.5rem', borderRadius: '1rem', border: '2px solid #f1f5f9', background: 'none', cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                            >
                                                <div>
                                                    <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>GPay / UPI Scanner</div>
                                                    <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Scan QR to pay automatically</div>
                                                </div>
                                                <img src="/images/gpay.jpg" style={{ height: '30px', borderRadius: '4px' }} alt="GPay" />
                                            </button>
                                            <Button variant="secondary" style={{ marginTop: '1rem' }} onClick={() => setStep('shipping')}>Back</Button>
                                        </div>
                                    </div>
                                )}

                                {/* Card Details Step */}
                                {step === 'card' && (
                                    <div style={{ background: 'white', borderRadius: '1rem', padding: '2rem', boxShadow: 'var(--shadow-lg)', maxWidth: '400px', margin: '0 auto' }}>
                                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                                            <div>
                                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Card Number</label>
                                                <input
                                                    type="text"
                                                    name="number"
                                                    value={cardDetails.number}
                                                    onChange={handleCardInputChange}
                                                    placeholder="0000 0000 0000 0000"
                                                    maxLength="19"
                                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
                                                    required
                                                />
                                            </div>
                                            <div style={{ display: 'flex', gap: '1rem' }}>
                                                <div style={{ flex: 1 }}>
                                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Expiry (MM/YY)</label>
                                                    <input
                                                        type="text"
                                                        name="expiry"
                                                        value={cardDetails.expiry}
                                                        onChange={handleCardInputChange}
                                                        placeholder="MM/YY"
                                                        maxLength="5"
                                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
                                                        required
                                                    />
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>CVV</label>
                                                    <input
                                                        type="password"
                                                        name="cvv"
                                                        value={cardDetails.cvv}
                                                        onChange={handleCardInputChange}
                                                        placeholder="123"
                                                        maxLength="3"
                                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
                                                <Button
                                                    variant="primary"
                                                    onClick={() => submitOrder('Card')}
                                                    disabled={loading || !cardDetails.number || !cardDetails.expiry || !cardDetails.cvv}
                                                >
                                                    {loading ? 'Processing...' : `Pay ₹${cartTotal.toLocaleString()}`}
                                                </Button>
                                                <Button variant="secondary" onClick={() => setStep('payment')}>Back</Button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* GPay Scanner Step */}
                                {step === 'gpay' && (
                                    <div style={{ background: 'white', borderRadius: '1rem', padding: '2rem', boxShadow: 'var(--shadow-lg)', maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
                                        <h3 style={{ marginBottom: '1rem' }}>Scan to Pay ₹{cartTotal.toLocaleString()}</h3>
                                        <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '2rem' }}>Open GPay or any UPI app to scan</p>
                                        <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '1rem', marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
                                            <img src={qrCodeUrl} alt="UPI QR Code" style={{ width: '200px', height: '200px' }} />
                                        </div>
                                        <div style={{ marginBottom: '2rem' }}>
                                            <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Merchant Name</div>
                                            <div style={{ fontWeight: 600 }}>CanonBall Fashions</div>
                                        </div>
                                        <div style={{ display: 'grid', gap: '1rem' }}>
                                            <Button variant="primary" onClick={() => submitOrder('GPay')} disabled={loading}>
                                                {loading ? 'Processing...' : 'I have Paid'}
                                            </Button>
                                            <Button variant="secondary" onClick={() => setStep('payment')}>Cancel</Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default Cart;
