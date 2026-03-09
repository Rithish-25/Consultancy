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
        if (e.target.name === 'price') {
            // Only allow numeric values
            const value = e.target.value.replace(/\D/g, '');
            setFormData({ ...formData, [e.target.name]: value });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSizeChange = (size) => {
        setFormData(prev => {
            const currentSizes = prev.sizes ? prev.sizes.split(',').map(s => s.trim()).filter(s => s) : [];
            const newSizes = currentSizes.includes(size)
                ? currentSizes.filter(s => s !== size)
                : [...currentSizes, size];
            return { ...prev, sizes: newSizes.join(', ') };
        });
    };

    const handleColorChange = (color) => {
        setFormData(prev => {
            const currentColors = prev.colors ? prev.colors.split(',').map(c => c.trim()).filter(c => c) : [];
            const newColors = currentColors.includes(color)
                ? currentColors.filter(c => c !== color)
                : [...currentColors, color];
            return { ...prev, colors: newColors.join(', ') };
        });
    };

    const materialCareMap = {
        'Cotton': 'Machine wash cold, tumble dry low',
        'Silk': 'Hand wash only, do not wring',
        'Polyester': 'Machine wash warm, quick dry',
        'Linen': 'Hand wash or gentle machine wash, air dry',
        'Wool': 'Dry clean recommended or hand wash cold'
    };

    const handleMaterialChange = (e) => {
        const material = e.target.value;
        const careInstructions = materialCareMap[material] || '';
        setFormData(prev => ({
            ...prev,
            material: material,
            careInstructions: careInstructions
        }));
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

        // Image URL validation
        const imgRegex = /^\\images\\.+\.(jpg|jpeg|png|webp|avif)$/i;
        if (!imgRegex.test(formData.image)) {
            setMsg('Error: Image URL must be in format \\images\\sample.jpg');
            setLoading(false);
            return;
        }

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
                    .glass-card {
                        background: rgba(255, 255, 255, 0.95);
                        backdrop-filter: blur(10px);
                        -webkit-backdrop-filter: blur(10px);
                        border: 1px solid rgba(226, 232, 240, 0.8);
                        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                    }
                    
                    .admin-input {
                        width: 100%;
                        padding: 0.75rem 1rem;
                        border-radius: 0.5rem;
                        border: 1px solid #e2e8f0;
                        background: #f8fafc;
                        color: #1e293b;
                        transition: all 0.2s ease;
                        font-family: 'Inter', sans-serif;
                    }
                    
                    .admin-input::placeholder {
                        color: #94a3b8;
                    }
                    
                    .admin-input:focus {
                        outline: none;
                        border-color: #0F172A;
                        background: #ffffff;
                        box-shadow: 0 0 0 3px rgba(15, 23, 42, 0.1);
                    }
                    
                    .admin-select {
                        appearance: none;
                        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%231e293b' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
                        background-position: right 0.75rem center;
                        background-repeat: no-repeat;
                        background-size: 1.25em 1.25em;
                        padding-right: 2.5rem;
                    }
                    
                    .admin-label {
                        display: block;
                        margin-bottom: 0.5rem;
                        font-weight: 600;
                        font-size: 0.75rem;
                        text-transform: uppercase;
                        letter-spacing: 0.05em;
                        color: #475569;
                    }
                `}
            </style>
            <Navbar />
            <div style={{
                paddingTop: '6rem',
                paddingBottom: '4rem',
                minHeight: '100vh',
                background: 'linear-gradient(to bottom, #0F172A 0%, #0F172A 400px, #F1F5F9 400px, #F1F5F9 100%)',
                position: 'relative'
            }}>

                <div className="container" style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <h1 style={{
                            marginBottom: '0.5rem',
                            textAlign: 'center',
                            fontFamily: "'Playfair Display', serif",
                            fontSize: '2.5rem',
                            color: '#FFFFFF'
                        }}>
                            {isEditMode ? 'Edit Product' : 'Add New Product'}
                        </h1>
                        <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '3rem' }}>
                            {isEditMode ? 'Update product details and inventory' : 'Create a new addition to the collection'}
                        </p>

                        {msg && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                style={{
                                    padding: '1rem',
                                    background: msg.includes('Error') ? '#fee2e2' : '#dcfce7',
                                    color: msg.includes('Error') ? '#991b1b' : '#166534',
                                    borderRadius: '0.5rem',
                                    marginBottom: '2rem',
                                    textAlign: 'center',
                                    border: msg.includes('Error') ? '1px solid #fca5a5' : '1px solid #86efac',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                }}>
                                {msg}
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="glass-card" style={{
                            padding: '3rem',
                            borderRadius: '1.5rem',
                            display: 'grid',
                            gap: '2rem'
                        }}>
                            {/* Basic Info Section */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                                <div style={{ gridColumn: 'span 2' }}>
                                    <label className="admin-label">Product Name</label>
                                    <input
                                        required
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="admin-input"
                                        placeholder="e.g. Classic Silk Saree"
                                    />
                                </div>
                                <div>
                                    <label className="admin-label">Category</label>
                                    <select
                                        required
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="admin-input admin-select"
                                    >
                                        <option value="" style={{ color: 'black' }}>Select Category</option>
                                        <option value="Men" style={{ color: 'black' }}>Men</option>
                                        <option value="Women" style={{ color: 'black' }}>Women</option>
                                        <option value="Kids" style={{ color: 'black' }}>Kids</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="admin-label">Price (₹)</label>
                                    <input
                                        required
                                        name="price"
                                        inputMode="numeric"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className="admin-input"
                                        placeholder="999"
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                                <div>
                                    <label className="admin-label">Stock Quantity</label>
                                    <input
                                        required
                                        name="stock"
                                        type="number"
                                        min="0"
                                        value={formData.stock}
                                        onChange={handleChange}
                                        className="admin-input"
                                        placeholder="Available units"
                                    />
                                </div>
                                <div style={{ gridColumn: 'span 2' }}>
                                    <label className="admin-label">Image URL</label>
                                    <input
                                        required
                                        name="image"
                                        value={formData.image}
                                        onChange={handleChange}
                                        className="admin-input"
                                        placeholder="\images\sample.jpg"
                                    />
                                </div>
                            </div>

                            {/* Descriptions */}
                            <div>
                                <label className="admin-label">Short Description</label>
                                <textarea
                                    required
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="admin-input"
                                    rows="2"
                                    placeholder="Brief summary for listings..."
                                />
                            </div>

                            <div>
                                <label className="admin-label">Full Description</label>
                                <textarea
                                    name="fullDescription"
                                    value={formData.fullDescription}
                                    onChange={handleChange}
                                    className="admin-input"
                                    rows="4"
                                    placeholder="Detailed product information..."
                                />
                            </div>

                            {/* Attributes */}
                            <div>
                                <label className="admin-label">Features</label>
                                <input
                                    name="features"
                                    value={formData.features}
                                    onChange={handleChange}
                                    placeholder="Premium Fabric, Handcrafted, etc. (comma separated)"
                                    className="admin-input"
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div>
                                    <label className="admin-label">Sizes</label>
                                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', padding: '0.75rem 0' }}>
                                        {['S', 'M', 'L', 'XL'].map((size) => (
                                            <label key={size} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', color: '#1e293b' }}>
                                                <input
                                                    type="checkbox"
                                                    checked={formData.sizes.split(',').map(s => s.trim()).includes(size)}
                                                    onChange={() => handleSizeChange(size)}
                                                    style={{ width: '1.2rem', height: '1.2rem', cursor: 'pointer' }}
                                                />
                                                {size}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="admin-label">Colors</label>
                                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', padding: '0.75rem 0' }}>
                                        {['Red', 'Blue', 'Gold', 'Black', 'White'].map((color) => (
                                            <label key={color} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', color: '#1e293b' }}>
                                                <input
                                                    type="checkbox"
                                                    checked={formData.colors.split(',').map(c => c.trim()).includes(color)}
                                                    onChange={() => handleColorChange(color)}
                                                    style={{ width: '1.2rem', height: '1.2rem', cursor: 'pointer' }}
                                                />
                                                {color}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Product Details */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div>
                                    <label className="admin-label">Material</label>
                                    <select
                                        name="material"
                                        value={formData.material}
                                        onChange={handleMaterialChange}
                                        className="admin-input admin-select"
                                    >
                                        <option value="" style={{ color: 'black' }}>Select Material</option>
                                        {['Cotton', 'Silk', 'Polyester', 'Linen', 'Wool'].map((mat) => (
                                            <option key={mat} value={mat} style={{ color: 'black' }}>{mat}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="admin-label">Origin</label>
                                    <input
                                        name="origin"
                                        value={formData.origin}
                                        onChange={handleChange}
                                        className="admin-input"
                                        placeholder="e.g. India"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="admin-label">Care Instructions</label>
                                <input
                                    name="careInstructions"
                                    value={formData.careInstructions}
                                    readOnly
                                    className="admin-input"
                                    style={{ background: '#f1f5f9', cursor: 'not-allowed' }}
                                    placeholder="Select a material to see instructions..."
                                />
                            </div>

                            <Button
                                variant="primary"
                                type="submit"
                                disabled={loading}
                                style={{
                                    marginTop: '1rem',
                                    width: '100%',
                                    background: '#0F172A',
                                    color: '#FFFFFF',
                                    fontWeight: '600',
                                    letterSpacing: '0.05em',
                                    textTransform: 'uppercase',
                                    border: 'none',
                                    padding: '1rem',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                                }}
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
