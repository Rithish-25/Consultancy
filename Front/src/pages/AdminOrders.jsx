import React, { useState, useEffect } from 'react';
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

    if (loading) return <>
        <Navbar />
        <div style={{ paddingTop: '100px', textAlign: 'center' }}>Loading Orders...</div>
    </>;

    if (error) return <>
        <Navbar />
        <div style={{ paddingTop: '100px', textAlign: 'center', color: 'red' }}>Error: {error}</div>
    </>;

    return (
        <>
            <Navbar />
            <div className="container" style={{ paddingTop: '120px', paddingBottom: '50px', maxWidth: '1200px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--color-primary)' }}>Manage User Orders</h1>

                <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: 'var(--shadow-md)', overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left', color: 'var(--color-text-light)' }}>
                                <th style={{ padding: '1rem' }}>Order ID</th>
                                <th style={{ padding: '1rem' }}>User</th>
                                <th style={{ padding: '1rem' }}>Items</th>
                                <th style={{ padding: '1rem' }}>Total</th>
                                <th style={{ padding: '1rem' }}>Date</th>
                                <th style={{ padding: '1rem' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id} style={{ borderBottom: '1px solid #f9f9f9' }}>
                                    <td style={{ padding: '1rem', fontFamily: 'monospace', fontWeight: 600 }}>#{order._id.slice(-6).toUpperCase()}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ fontWeight: 500 }}>{order.user?.name || 'Unknown'}</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>{order.user?.email}</div>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        {order.items.map((item, idx) => (
                                            <div key={idx} style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                                                {item.quantity}x {item.name}
                                            </div>
                                        ))}
                                    </td>
                                    <td style={{ padding: '1rem', fontWeight: 600 }}>₹{order.totalAmount}</td>
                                    <td style={{ padding: '1rem', fontSize: '0.9rem' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                            style={{
                                                padding: '0.5rem',
                                                borderRadius: '0.5rem',
                                                border: '1px solid #e2e8f0',
                                                background:
                                                    order.status === 'Delivered' ? '#d1fae5' :
                                                        order.status === 'Processing' ? '#dbeafe' :
                                                            order.status === 'Shipped' ? '#e0e7ff' : '#fef3c7',
                                                color: 'var(--color-text)',
                                                fontWeight: 500,
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {orders.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-light)' }}>
                            No orders found.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AdminOrders;
