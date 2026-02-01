import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import API_URL from '../config/api';

const AdminAddProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        stock: '',
        description: '',
        image: '',
        features: '', // Comma separated
        fullDescription: '',
        sizes: '', // Comma separated
        colors: '', // Comma separated
        careInstructions: '',
        material: '',
        origin: ''
    });
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (isEditMode) {
            const fetchProduct = async () => {
                try {
                    const res = await fetch(`${API_URL}/products/${id}`);
                    const data = await res.json();
                    setFormData({
                        name: data.name || '',
                        category: data.category || '',
                        price: data.price || '',
                        stock: data.stock || 0,
                        description: data.description || '',
                        image: data.image || '',
                        features: data.features ? data.features.join(', ') : '',
                        fullDescription: data.fullDescription || '',
                        sizes: data.sizes ? data.sizes.join(', ') : '',
                        colors: data.colors ? data.colors.join(', ') : '',
                        careInstructions: data.careInstructions || '',
                        material: data.material || '',
                        origin: data.origin || ''
                    });
                } catch (err) {
                    console.error("Error fetching product:", err);
                    setMsg('Error loading product details.');
                }
            };
            fetchProduct();
        }
    }, [id, isEditMode]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMsg('');

        // Transform comma separated strings to arrays
        const payload = {
            ...formData,
            features: formData.features.split(',').map(item => item.trim()).filter(i => i),
            sizes: formData.sizes.split(',').map(item => item.trim()).filter(i => i),
            colors: formData.colors.split(',').map(item => item.trim()).filter(i => i)
        };

        try {
            const method = isEditMode ? 'PUT' : 'POST';
            const url = isEditMode ? `${API_URL}/products/${id}` : `${API_URL}/products`;

            const res = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-role': 'admin' // Simple role check as per requirement
                },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setMsg(isEditMode ? 'Product updated successfully!' : 'Product added successfully!');
                if (!isEditMode) {
                    setFormData({
                        name: '',
                        category: '',
                        price: '',
                        stock: '',
                        description: '',
                        description: '',
                        image: '',
                        features: '',
                        fullDescription: '',
                        sizes: '',
                        colors: '',
                        careInstructions: '',
                        material: '',
                        origin: ''
                    });
                    // Optional: navigate to collections after delay
                }
            } else {
                const errorData = await res.json().catch(() => ({}));
                setMsg(`Error: ${errorData.msg || res.statusText || 'Failed to update'}`);
                console.error('Operation failed:', errorData);
            }
        } catch (err) {
            console.error(err);
            setMsg('Server error.');
        }
        setLoading(false);
    };

    return (
        <>
            <style>
                {`
                    .admin-input {
                        width: 100%;
                        padding: 0.75rem;
                        border-radius: 0.5rem;
                        border: 1px solid #e2e8f0;
                        transition: all 0.3s ease;
                    }
                    .admin-input:focus {
                        outline: none;
                        border-color: #a0aec0;
                        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                        transform: translateY(-2px);
                    }
                `}
            </style>
            <Navbar />
            <div style={{
                padding: '6rem 2rem',
                minHeight: '100vh',
                background: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url("https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}>
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 style={{ marginBottom: '2rem', color: '#fff', textAlign: 'center', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                            {isEditMode ? 'Admin: Edit Product' : 'Admin: Add New Product'}
                        </h1>

                        {msg && <div style={{
                            padding: '1rem',
                            background: msg.includes('Error') ? '#fee2e2' : '#dcfce7',
                            color: msg.includes('Error') ? '#991b1b' : '#166534',
                            borderRadius: '0.5rem',
                            marginBottom: '1rem',
                            textAlign: 'center'
                        }}>{msg}</div>}

                        <form onSubmit={handleSubmit} style={{
                            background: 'white',
                            padding: '2rem',
                            borderRadius: '1rem',
                            boxShadow: 'var(--shadow-md)',
                            display: 'grid',
                            gap: '1.5rem'
                        }}>
                            {/* Basic Info */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Name</label>
                                    <input required name="name" value={formData.name} onChange={handleChange} className="admin-input" />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Category</label>
                                    <select required name="category" value={formData.category} onChange={handleChange} className="admin-input">
                                        <option value="">Select Category</option>
                                        <option value="Men">Men</option>
                                        <option value="Women">Women</option>
                                        <option value="Kids">Kids</option>
                                    </select>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Price (e.g. ₹999)</label>
                                    <input required name="price" value={formData.price} onChange={handleChange} className="admin-input" />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Stock Qty</label>
                                    <input required name="stock" type="number" min="0" value={formData.stock} onChange={handleChange} className="admin-input" placeholder="e.g. 10" />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Image URL</label>
                                    <input required name="image" value={formData.image} onChange={handleChange} className="admin-input" />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Short Description</label>
                                <textarea required name="description" value={formData.description} onChange={handleChange} className="admin-input" rows="3" />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Full Description</label>
                                <textarea name="fullDescription" value={formData.fullDescription} onChange={handleChange} className="admin-input" rows="5" />
                            </div>

                            {/* Arrays */}
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Features (comma separated)</label>
                                <input name="features" value={formData.features} onChange={handleChange} placeholder="Feature 1, Feature 2" className="admin-input" />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Sizes (comma separated)</label>
                                    <input name="sizes" value={formData.sizes} onChange={handleChange} placeholder="S, M, L" className="admin-input" />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Colors (comma separated)</label>
                                    <input name="colors" value={formData.colors} onChange={handleChange} placeholder="Red, Blue" className="admin-input" />
                                </div>
                            </div>

                            {/* Details */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Material</label>
                                    <input name="material" value={formData.material} onChange={handleChange} className="admin-input" />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Origin</label>
                                    <input name="origin" value={formData.origin} onChange={handleChange} className="admin-input" />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Care Instructions</label>
                                <input name="careInstructions" value={formData.careInstructions} onChange={handleChange} className="admin-input" />
                            </div>

                            <Button
                                variant="primary"
                                type="submit"
                                disabled={loading}
                                style={{ marginTop: '1rem', width: '100%' }}
                            >
                                {loading ? (isEditMode ? 'Updating...' : 'Adding...') : (isEditMode ? 'Update Product' : 'Add Product')}
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default AdminAddProduct;
