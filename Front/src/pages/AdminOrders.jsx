import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import API_URL from '../config/api';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/orders`, {
                headers: { 'x-auth-token': token }
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.msg || 'Failed to fetch orders');

            setOrders(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/orders/${orderId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.msg || 'Failed to update status');
            }

            // Refresh orders or update local state
            setOrders(orders.map(order =>
                order._id === orderId ? { ...order, status: newStatus } : order
            ));

        } catch (err) {
            alert(err.message);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return 'rgba(34, 197, 94, 0.15)'; // Green
            case 'Shipped': return 'rgba(59, 130, 246, 0.15)'; // Blue
            case 'In Progress': return 'rgba(234, 179, 8, 0.15)'; // Yellow
            case 'Processing': return 'rgba(234, 179, 8, 0.15)'; // Yellow
            case 'Pending': return 'rgba(249, 115, 22, 0.15)'; // Orange
            case 'Cancelled': return 'rgba(239, 68, 68, 0.15)'; // Red
            default: return 'rgba(148, 163, 184, 0.15)'; // Slate
        }
    };

    const getStatusTextColor = (status) => {
        switch (status) {
            case 'Delivered': return '#15803d'; // Darker Green
            case 'Shipped': return '#1d4ed8'; // Darker Blue
            case 'In Progress': return '#a16207'; // Darker Yellow
            case 'Processing': return '#a16207'; // Darker Yellow
            case 'Pending': return '#c2410c'; // Darker Orange
            case 'Cancelled': return '#b91c1c'; // Darker Red
            default: return '#475569'; // Darker Slate
        }
    };

    if (loading) return (
        <div style={{ minHeight: '100vh', background: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ color: '#C0A062', fontFamily: "'Playfair Display', serif", fontSize: '1.5rem' }}>Loading Orders...</div>
        </div>
    );

    if (error) return (
        <>
            <Navbar />
            <div style={{ paddingTop: '100px', textAlign: 'center', color: '#fca5a5', background: '#0F172A', minHeight: '100vh' }}>Error: {error}</div>
        </>
    );

    return (
        <>
            <style>
                {`
                    .glass-card {
                        background: rgba(255, 255, 255, 0.95);
                        backdrop-filter: blur(10px);
                        -webkit-backdrop-filter: blur(10px);
                        border: 1px solid rgba(226, 232, 240, 0.8);
                        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                        border-radius: 0.75rem;
                        overflow: hidden;
                    }
                    
                    .admin-table {
                        width: 100%;
                        border-collapse: collapse;
                        color: #1e293b;
                    }
                    
                    .admin-table th {
                        text-align: left;
                        padding: 1rem 1.5rem;
                        background: #f1f5f9;
                        color: #0f172a;
                        font-family: 'Inter', sans-serif;
                        font-weight: 600;
                        font-size: 0.75rem;
                        letter-spacing: 0.05em;
                        text-transform: uppercase;
                        border-bottom: 1px solid #e2e8f0;
                    }
                    
                    .admin-table td {
                        padding: 1.25rem 1.5rem;
                        border-bottom: 1px solid #e2e8f0;
                        vertical-align: middle;
                    }
                    
                    .admin-table tr:last-child td {
                        border-bottom: none;
                    }
                    
                    .admin-table tr:hover td {
                        background: #f8fafc;
                    }
                    
                    .status-select {
                        appearance: none;
                        background: transparent;
                        border: none;
                        color: inherit;
                        font-family: inherit;
                        font-size: 0.8rem;
                        font-weight: 600;
                        cursor: pointer;
                        padding: 0.35rem 2rem 0.35rem 1rem;
                        border-radius: 9999px;
                        outline: none;
                        background-repeat: no-repeat;
                        background-position: right 0.5rem center;
                        background-size: 1em;
                        transition: all 0.2s;
                    }
                    
                    .status-select:hover {
                        filter: brightness(0.95);
                    }
                    
                    .gold-gradient-text {
                        background: linear-gradient(135deg, #C0A062 0%, #E5C585 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                    }
                    
                    /* Custom Scrollbar for table container */
                    .custom-scrollbar::-webkit-scrollbar {
                        height: 8px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                        background: #f1f5f9;
                        border-radius: 4px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background: #cbd5e1;
                        border-radius: 4px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                        background: #94a3b8;
                    }
                `}
            </style>
            <Navbar />
            <div style={{
                paddingTop: '6rem',
                paddingBottom: '4rem',
                minHeight: '100vh',
                background: 'linear-gradient(to bottom, #0F172A 0%, #0F172A 300px, #F1F5F9 300px, #F1F5F9 100%)',
                position: 'relative'
            }}>

                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', paddingRight: '20px', paddingLeft: '20px', position: 'relative', zIndex: 1 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '2rem' }}>
                            <div>
                                <h1 style={{
                                    fontFamily: "'Playfair Display', serif",
                                    fontSize: '2.5rem',
                                    marginBottom: '0.5rem',
                                    color: '#FFFFFF'
                                }}>
                                    Order Management
                                </h1>
                                <p style={{ color: '#94a3b8' }}>Track and manage customer orders</p>
                            </div>
                            <div style={{
                                background: 'rgba(255,255,255,0.1)',
                                padding: '0.5rem 1rem',
                                borderRadius: '0.5rem',
                                color: '#e2e8f0',
                                fontSize: '0.9rem',
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}>
                                Total Orders: <span style={{ color: '#fff', fontWeight: '600' }}>{orders.length}</span>
                            </div>
                        </div>

                        <div className="glass-card custom-scrollbar" style={{ overflowX: 'auto' }}>
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Customer</th>
                                        <th>Items Details</th>
                                        <th>Total Amount</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order._id}>
                                            <td style={{ fontFamily: 'monospace', color: '#64748B' }}>#{order._id.slice(-6).toUpperCase()}</td>
                                            <td>
                                                <div style={{ fontWeight: 600, color: '#0f172a' }}>{order.user?.name || 'Unknown'}</div>
                                                <div style={{ fontSize: '0.85rem', color: '#64748B' }}>{order.user?.email}</div>
                                            </td>
                                            <td>
                                                {order.items.map((item, idx) => (
                                                    <div key={idx} style={{ fontSize: '0.9rem', marginBottom: '0.25rem', color: '#334155' }}>
                                                        <span style={{ color: '#0f172a', fontWeight: 600 }}>{item.quantity}x</span> {item.name}
                                                    </div>
                                                ))}
                                            </td>
                                            <td style={{ fontWeight: 600, color: '#0f172a', fontSize: '1.1rem' }}>₹{order.totalAmount}</td>
                                            <td style={{ fontSize: '0.9rem', color: '#64748b' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                                            <td>
                                                <div style={{
                                                    display: 'inline-block',
                                                    position: 'relative'
                                                }}>
                                                    <select
                                                        value={order.status}
                                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                        className="status-select"
                                                        style={{
                                                            backgroundColor: getStatusColor(order.status),
                                                            color: getStatusTextColor(order.status),
                                                            border: `1px solid ${getStatusTextColor(order.status)}40`,
                                                            textAlign: 'left',
                                                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='${encodeURIComponent(getStatusTextColor(order.status))}'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3e%3c/svg%3e")`
                                                        }}
                                                    >
                                                        <option value="Pending" style={{ color: 'black' }}>Pending</option>
                                                        <option value="In Progress" style={{ color: 'black' }}>In Progress</option>
                                                        <option value="Shipped" style={{ color: 'black' }}>Shipped</option>
                                                        <option value="Delivered" style={{ color: 'black' }}>Delivered</option>
                                                        <option value="Cancelled" style={{ color: 'black' }}>Cancelled</option>
                                                    </select>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {orders.length === 0 && (
                                        <tr>
                                            <td colSpan="6" style={{ textAlign: 'center', padding: '4rem', color: '#64748B' }}>
                                                No orders found in the system.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default AdminOrders;
