import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import API_URL from '../config/api';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }

                const headers = { 'x-auth-token': token };

                // Fetch Profile
                const profileRes = await fetch(`${API_URL}/auth/me`, { headers });
                if (!profileRes.ok) throw new Error('Failed to fetch profile');
                const profileData = await profileRes.json();
                setProfile(profileData);

                // Fetch Orders
                const ordersRes = await fetch(`${API_URL}/orders/user`, { headers });
                if (!ordersRes.ok) throw new Error('Failed to fetch orders');
                const ordersData = await ordersRes.json();
                setOrders(ordersData);

            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <>
                <Navbar />
                <div style={{ paddingTop: '100px', textAlign: 'center' }}>Loading...</div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Navbar />
                <div style={{ paddingTop: '100px', textAlign: 'center', color: 'red' }}>Error: {error}</div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="container" style={{ paddingTop: '120px', paddingBottom: '50px', maxWidth: '1200px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--color-primary)' }}>My Profile</h1>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
                        {/* Profile Details */}
                        <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: 'var(--shadow-md)' }}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Personal Information</h2>
                            <div style={{ display: 'grid', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', color: 'var(--color-text-light)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Name</label>
                                    <div style={{ fontSize: '1.1rem', fontWeight: 500 }}>{profile?.name}</div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', color: 'var(--color-text-light)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Email</label>
                                    <div style={{ fontSize: '1.1rem', fontWeight: 500 }}>{profile?.email}</div>
                                </div>
                            </div>
                        </div>

                        {/* Order History */}
                        <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: 'var(--shadow-md)' }}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Order History</h2>

                            {orders.length === 0 ? (
                                <p style={{ color: 'var(--color-text-light)' }}>No orders found.</p>
                            ) : (
                                <div style={{ overflowX: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                                        <thead>
                                            <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left' }}>
                                                <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--color-text)' }}>Order ID</th>
                                                <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--color-text)' }}>Date</th>
                                                <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--color-text)' }}>Items</th>
                                                <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--color-text)' }}>Total</th>
                                                <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--color-text)' }}>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map(order => (
                                                <tr key={order._id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                                                    <td style={{ padding: '1rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>#{order._id.slice(-6).toUpperCase()}</td>
                                                    <td style={{ padding: '1rem' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                                                    <td style={{ padding: '1rem' }}>
                                                        {order.items.map(item => (
                                                            <div key={item._id} style={{ fontSize: '0.9rem' }}>
                                                                {item.quantity}x {item.name}
                                                            </div>
                                                        ))}
                                                    </td>
                                                    <td style={{ padding: '1rem', fontWeight: 600 }}>₹{order.totalAmount}</td>
                                                    <td style={{ padding: '1rem' }}>
                                                        <span style={{
                                                            padding: '0.25rem 0.75rem',
                                                            borderRadius: '1rem',
                                                            fontSize: '0.85rem',
                                                            fontWeight: 500,
                                                            backgroundColor:
                                                                order.status === 'Delivered' ? '#d1fae5' :
                                                                    order.status === 'Processing' ? '#dbeafe' :
                                                                        order.status === 'Cancelled' ? '#fee2e2' : '#fef3c7',
                                                            color:
                                                                order.status === 'Delivered' ? '#065f46' :
                                                                    order.status === 'Processing' ? '#1e40af' :
                                                                        order.status === 'Cancelled' ? '#991b1b' : '#92400e'
                                                        }}>
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default Profile;
