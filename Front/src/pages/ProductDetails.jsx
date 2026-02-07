import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import API_URL from '../config/api';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedSize, setSelectedSize] = useState(null);
    const [product, setProduct] = useState(null);
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = useState(false);
    const isAdmin = localStorage.getItem('userRole') === 'admin';

    useEffect(() => {
        // Scroll to top when ProductDetails component mounts
        window.scrollTo({ top: 0, behavior: 'smooth' });

        const fetchProduct = async () => {
            try {
                const res = await fetch(`${API_URL}/products/${id}`);
                if (!res.ok) {
                    throw new Error('Product not found');
                }
                const data = await res.json();
                setProduct(data);
            } catch (err) {
                console.error('Error fetching product:', err);
                navigate('/collections');
            }
        };

        fetchProduct();
    }, [id, navigate]);

    const handleAddToCart = () => {
        if (product && (product.stock === undefined || product.stock > 0)) {
            // Check if product has sizes and none selected
            if (product.sizes && product.sizes.length > 0 && !selectedSize) {
                alert('Please select a size');
                return;
            }

            addToCart(product, selectedSize);
            setIsAdded(true);
            setTimeout(() => setIsAdded(false), 2000);
        }
    };

    // ... (handleImageError remains the same)

    // ... (Render parts)



    const handleImageError = (e) => {
        e.target.style.display = 'none';
        const parent = e.target.parentElement;
        if (parent) {
            parent.innerHTML = `
                <div style="
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, #E2E8F0 0%, #CBD5E1 100%);
                    color: #64748B;
                    font-size: 1.5rem;
                    font-weight: 500;
                    text-align: center;
                    padding: 2rem;
                ">
                    <div>
                        <div style="font-size: 4rem; margin-bottom: 0.5rem;">👔</div>
                        <div>${e.target.alt}</div>
                    </div>
                </div>
            `;
        }
    };

    if (!product) {
        return (
            <>
                <Navbar />
                <div style={{ padding: '5rem 2rem', textAlign: 'center' }}>
                    <p>Loading product details...</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div style={{ minHeight: '100vh', background: 'var(--color-background)' }}>
                {/* Hero Section */}
                <section className="product-details-hero" style={{
                    padding: '6rem 2rem 4rem',
                    background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
                    color: 'white',
                    textAlign: 'center'
                }}>
                    <div className="container" style={{ position: 'relative' }}>
                        <motion.button
                            onClick={() => navigate(-1)}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                position: 'absolute',
                                top: '2rem',
                                left: '0',
                                background: 'rgba(255,255,255,0.1)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                backdropFilter: 'blur(8px)',
                                color: 'white',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.75rem 1.25rem',
                                borderRadius: '50px',
                                zIndex: 10,
                                fontWeight: 500,
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                            Back
                        </motion.button>
                        {isAdmin && (
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                                <Link
                                    to={`/admin/edit-product/${product._id}`}
                                    style={{
                                        display: 'inline-block',
                                        padding: '0.5rem 1.5rem',
                                        background: 'rgba(255,255,255,0.2)',
                                        color: 'white',
                                        borderRadius: '0.5rem',
                                        textDecoration: 'none',
                                        fontWeight: 600,
                                        border: '1px solid rgba(255,255,255,0.4)',
                                        backdropFilter: 'blur(4px)'
                                    }}
                                >
                                    ✏️ Edit Product
                                </Link>
                            </div>
                        )}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            style={{
                                fontSize: '3rem',
                                marginBottom: '1rem',
                                fontFamily: "'Playfair Display', serif",
                                color: 'white'
                            }}
                        >
                            {product.name}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            style={{ fontSize: '1.25rem', opacity: 0.95, color: 'white' }}
                        >
                            {product.category}
                        </motion.p>
                    </div>
                </section>

                {/* Product Details Section */}
                <section style={{ padding: '4rem 0', minHeight: 'auto' }}>
                    <div className="container">
                        <div className="product-details-grid" style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '4rem',
                            maxWidth: '1200px',
                            margin: '0 auto',
                            alignItems: 'start'
                        }}>
                            {/* Product Image */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                style={{
                                    position: 'sticky',
                                    top: '6rem',
                                    background: 'white',
                                    borderRadius: '1rem',
                                    overflow: 'hidden',
                                    boxShadow: 'var(--shadow-lg)',
                                    width: '100%'
                                }}
                            >
                                <div style={{
                                    width: '100%',
                                    aspectRatio: '4/3',
                                    overflow: 'hidden',
                                    backgroundColor: '#e2e8f0'
                                }}>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            display: 'block'
                                        }}
                                        onError={handleImageError}
                                        loading="eager"
                                    />
                                </div>
                            </motion.div>

                            {/* Product Information */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div style={{
                                    background: 'white',
                                    borderRadius: '1rem',
                                    padding: '2.5rem',
                                    boxShadow: 'var(--shadow-md)',
                                    width: '100%',
                                    overflow: 'visible',
                                    minHeight: 'auto'
                                }}>
                                    {/* Price */}
                                    <div style={{
                                        fontSize: '2.5rem',
                                        fontWeight: 700,
                                        color: 'var(--color-primary)',
                                        marginBottom: '1.5rem'
                                    }}>
                                        {product.price}
                                    </div>

                                    {/* Description */}
                                    <div style={{ marginBottom: '2rem' }}>
                                        <h3 style={{
                                            fontSize: '1.25rem',
                                            fontWeight: 600,
                                            marginBottom: '1rem',
                                            color: 'var(--color-primary)'
                                        }}>
                                            Description
                                        </h3>
                                        <p style={{
                                            color: 'var(--color-text)',
                                            lineHeight: '1.8',
                                            fontSize: '1rem',
                                            marginBottom: '1rem'
                                        }}>
                                            {product.description}
                                        </p>
                                        {product.fullDescription && (
                                            <p style={{
                                                color: 'var(--color-text-light)',
                                                lineHeight: '1.8',
                                                fontSize: '0.95rem'
                                            }}>
                                                {product.fullDescription}
                                            </p>
                                        )}
                                    </div>

                                    {/* Features */}
                                    <div style={{ marginBottom: '2rem' }}>
                                        <h3 style={{
                                            fontSize: '1.25rem',
                                            fontWeight: 600,
                                            marginBottom: '1rem',
                                            color: 'var(--color-primary)'
                                        }}>
                                            Features
                                        </h3>
                                        <div style={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: '0.75rem'
                                        }}>
                                            {product.features.map((feature, idx) => (
                                                <span
                                                    key={idx}
                                                    style={{
                                                        background: 'var(--color-background)',
                                                        padding: '0.5rem 1rem',
                                                        borderRadius: '9999px',
                                                        fontSize: '0.875rem',
                                                        color: 'var(--color-text)',
                                                        fontWeight: 500
                                                    }}
                                                >
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>
                                    </div>



                                    {/* Sizes */}
                                    {product.sizes && product.sizes.length > 0 && (
                                        <div style={{ marginBottom: '2rem' }}>
                                            <h3 style={{
                                                fontSize: '1.25rem',
                                                fontWeight: 600,
                                                marginBottom: '1rem',
                                                color: 'var(--color-primary)'
                                            }}>
                                                Available Sizes
                                            </h3>
                                            <div style={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                gap: '0.75rem'
                                            }}>
                                                {product.sizes.map((size, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => setSelectedSize(size)}
                                                        style={{
                                                            padding: '0.75rem 1.5rem',
                                                            border: `2px solid ${selectedSize === size ? 'var(--color-primary)' : '#e2e8f0'}`,
                                                            borderRadius: '0.5rem',
                                                            background: selectedSize === size ? 'var(--color-primary)' : 'white',
                                                            color: selectedSize === size ? 'white' : 'var(--color-text)',
                                                            fontWeight: 600,
                                                            cursor: 'pointer',
                                                            transition: 'all 0.2s ease',
                                                            fontSize: '1rem',
                                                            minWidth: '3rem'
                                                        }}
                                                    >
                                                        {size}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Colors */}
                                    {product.colors && (
                                        <div style={{ marginBottom: '2rem' }}>
                                            <h3 style={{
                                                fontSize: '1.25rem',
                                                fontWeight: 600,
                                                marginBottom: '1rem',
                                                color: 'var(--color-primary)'
                                            }}>
                                                Available Colors
                                            </h3>
                                            <div style={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                gap: '0.75rem'
                                            }}>
                                                {product.colors.map((color, idx) => (
                                                    <span
                                                        key={idx}
                                                        style={{
                                                            padding: '0.5rem 1rem',
                                                            background: 'var(--color-background)',
                                                            borderRadius: '9999px',
                                                            fontSize: '0.875rem',
                                                            color: 'var(--color-text)',
                                                            fontWeight: 500
                                                        }}
                                                    >
                                                        {color}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Material & Care */}
                                    <div style={{
                                        marginBottom: '2rem',
                                        padding: '1.5rem',
                                        background: 'var(--color-background)',
                                        borderRadius: '0.75rem'
                                    }}>
                                        {product.material && (
                                            <div style={{ marginBottom: '1rem' }}>
                                                <strong style={{ color: 'var(--color-primary)' }}>Material: </strong>
                                                <span style={{ color: 'var(--color-text)' }}>{product.material}</span>
                                            </div>
                                        )}
                                        {product.careInstructions && (
                                            <div>
                                                <strong style={{ color: 'var(--color-primary)' }}>Care Instructions: </strong>
                                                <span style={{ color: 'var(--color-text)' }}>{product.careInstructions}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="product-action-buttons" style={{
                                        display: 'flex',
                                        gap: '1rem',
                                        marginTop: '2rem',
                                        flexWrap: 'wrap'
                                    }}>
                                        <div style={{ width: '100%', marginBottom: '0.5rem' }}>
                                            {product.stock === 0 ? (
                                                <span style={{ color: '#ef4444', fontWeight: 600, fontSize: '1.1rem' }}>Out of Stock</span>
                                            ) : (
                                                <span style={{ color: '#16a34a', fontWeight: 600, fontSize: '1.1rem' }}>
                                                    In Stock {product.stock > 0 ? `(${product.stock} available)` : ''}
                                                </span>
                                            )}
                                        </div>
                                        {!isAdmin && (
                                            <Button
                                                variant="primary"
                                                onClick={handleAddToCart}
                                                disabled={product.stock === 0}
                                                style={{
                                                    flex: 1,
                                                    padding: '1rem 2rem',
                                                    fontSize: '1.1rem',
                                                    fontWeight: 600,
                                                    whiteSpace: 'nowrap',
                                                    minWidth: 'fit-content',
                                                    opacity: product.stock === 0 ? 0.5 : 1,
                                                    cursor: product.stock === 0 ? 'not-allowed' : 'pointer'
                                                }}
                                            >
                                                {product.stock === 0 ? 'Out of Stock' : (isAdded ? 'Added to Cart!' : 'Add to Cart')}
                                            </Button>
                                        )}
                                        <Button
                                            variant="outline"
                                            onClick={() => navigate('/collections')}
                                            style={{
                                                flex: 1,
                                                padding: '1rem 2rem',
                                                fontSize: '1.1rem',
                                                fontWeight: 600,
                                                whiteSpace: 'nowrap',
                                                minWidth: 'fit-content'
                                            }}
                                        >
                                            Back to Collections
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default ProductDetails;
