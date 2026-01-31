import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, cartCount, cartTotal } = useCart();

    return (
        <>
            <Navbar />
            <div style={{ padding: '6rem 2rem', minHeight: '100vh', background: 'var(--color-background)' }}>
                <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 style={{ marginBottom: '2rem', fontFamily: "'Playfair Display', serif", textAlign: 'center' }}>
                            Your Cart ({cartCount})
                        </h1>

                        {cart.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                                <p style={{ fontSize: '1.2rem', color: 'var(--color-text-light)', marginBottom: '2rem' }}>
                                    Your cart is currently empty.
                                </p>
                                <Link to="/collections">
                                    <Button variant="primary">Start Shopping</Button>
                                </Link>
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', alignItems: 'start' }}>
                                {/* Cart Items */}
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
                                                <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                                                    {item.category}
                                                </p>
                                                <p style={{ fontWeight: 600 }}>{item.price}</p>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }}>
                                                    <button
                                                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                        style={{ padding: '0.5rem 1rem', background: 'none', border: 'none', cursor: 'pointer' }}
                                                    >
                                                        -
                                                    </button>
                                                    <span style={{ padding: '0.5rem', fontWeight: 500 }}>{item.quantity}</span>
                                                    <button
                                                        onClick={() => {
                                                            if (item.quantity < item.stock) {
                                                                updateQuantity(item._id, item.quantity + 1);
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
                                                    onClick={() => removeFromCart(item._id)}
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

                                {/* Order Summary */}
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
                                    <Button variant="primary" style={{ width: '100%' }}>
                                        Checkout
                                    </Button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default Cart;
