import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Button from '../components/Button';

const Collections = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Scroll to top when Collections component mounts with smooth animation
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const handleProductClick = (productId) => {
        navigate(`/collections/${productId}`);
    };

    const costumes = [
        {
            id: 1,
            name: "Classic Elegance Suit",
            category: "Formal Wear",
            price: "₹15000",
            description: "A timeless black suit perfect for formal occasions. Crafted with premium fabric and impeccable tailoring.",
            image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&h=600&fit=crop",
            features: ["Premium Fabric", "Perfect Fit", "Dry Clean Only"]
        },
        {
            id: 2,
            name: "Casual Denim Collection",
            category: "Casual Wear",
            price: "₹1500",
            description: "Comfortable and stylish denim pieces for everyday wear. Made from high-quality denim with modern cuts.",
            image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=600&fit=crop",
            features: ["100% Cotton", "Machine Washable", "Multiple Colors"]
        },
        {
            id: 3,
            name: "Vintage Leather Jacket",
            category: "Outerwear",
            price: "₹3500",
            description: "Authentic vintage-style leather jacket with classic design. Premium genuine leather construction.",
            image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=600&fit=crop",
            features: ["Genuine Leather", "Classic Design", "Durable"]
        },
        {
            id: 4,
            name: "Summer Linen Shirt",
            category: "Casual Wear",
            price: "₹2000",
            description: "Lightweight and breathable linen shirt perfect for warm weather. Elegant and comfortable.",
            image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&h=600&fit=crop",
            features: ["100% Linen", "Breathable", "Wrinkle Resistant"]
        },
        {
            id: 5,
            name: "Designer Tuxedo",
            category: "Formal Wear",
            price: "₹2700",
            description: "Luxury tuxedo for special events. Handcrafted with attention to detail and premium materials.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
            features: ["Premium Materials", "Handcrafted", "Perfect for Events"]
        },
        {
            id: 6,
            name: "Athletic Sportswear",
            category: "Activewear",
            price: "₹7200",
            description: "High-performance athletic wear designed for comfort and mobility. Perfect for workouts and sports.",
            image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
            features: ["Moisture Wicking", "Flexible", "Durable"]
        },
        {
            id: 7,
            name: "Bohemian Floral Dress",
            category: "Dresses",
            price: "₹12000",
            description: "Beautiful bohemian-style dress with floral patterns. Flowing and elegant design perfect for any occasion.",
            image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=600&fit=crop",
            features: ["Floral Pattern", "Comfortable Fit", "Versatile"]
        },
        {
            id: 8,
            name: "Winter Wool Coat",
            category: "Outerwear",
            price: "₹2000",
            description: "Warm and stylish wool coat for cold weather. Classic design with modern touches.",
            image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=600&fit=crop",
            features: ["100% Wool", "Warm", "Classic Style"]
        },
        {
            id: 9,
            name: "Business Casual Blazer",
            category: "Formal Wear",
            price: "₹15000",
            description: "Versatile blazer that transitions from office to evening. Professional yet stylish.",
            image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&h=600&fit=crop",
            features: ["Versatile", "Professional", "Comfortable"]
        }
    ];

    const handleImageError = (e) => {
        // Fallback to a colored placeholder if image fails to load
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
                    font-size: 1rem;
                    font-weight: 500;
                    text-align: center;
                    padding: 2rem;
                ">
                    <div>
                        <div style="font-size: 3rem; margin-bottom: 0.5rem;">👔</div>
                        <div>${e.target.alt}</div>
                    </div>
                </div>
            `;
        }
    };

    return (
        <>
            <Navbar />
            <div className="collections-container">
                {/* Hero Section */}
                <section className="collections-hero" style={{
                    minHeight: '50vh',
                    width: '100%',
                    background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    textAlign: 'center',
                    padding: '6rem 2rem 4rem',
                }}>
                    <div className="container">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            style={{ 
                                fontSize: '4rem', 
                                marginBottom: '1rem', 
                                fontWeight: 700, 
                                color: 'white',
                                fontFamily: "'Playfair Display', serif"
                            }}
                        >
                            Our Collections
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            style={{ 
                                fontSize: '1.25rem', 
                                maxWidth: '700px', 
                                margin: '0 auto',
                                lineHeight: '1.6'
                            }}
                        >
                            Discover our curated selection of premium costumes and apparel
                        </motion.p>
                    </div>
                </section>

                {/* Collections Grid */}
                <section id="collections" style={{ padding: '5rem 0', background: 'var(--color-background)' }}>
                    <div className="container">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            style={{ textAlign: 'center', marginBottom: '4rem' }}
                        >
                            <h2 style={{ 
                                fontSize: '2.5rem', 
                                marginBottom: '1rem',
                                fontFamily: "'Playfair Display', serif",
                                color: 'var(--color-primary)'
                            }}>
                                Premium Costumes
                            </h2>
                            <p style={{ 
                                color: 'var(--color-text-light)',
                                fontSize: '1.125rem'
                            }}>
                                Handpicked selection of the finest apparel
                            </p>
                        </motion.div>

                        <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
                            gap: '2.5rem',
                            maxWidth: '1400px',
                            margin: '0 auto'
                        }}>
                            {costumes.map((costume, index) => (
                                <motion.div
                                    key={costume.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    whileHover={{ y: -10, scale: 1.02 }}
                                    onClick={() => handleProductClick(costume.id)}
                                    style={{
                                        background: 'white',
                                        borderRadius: '1rem',
                                        overflow: 'hidden',
                                        boxShadow: 'var(--shadow-lg)',
                                        transition: 'all 0.3s ease',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {/* Image */}
                                    <div style={{
                                        width: '100%',
                                        height: '300px',
                                        overflow: 'hidden',
                                        position: 'relative',
                                        backgroundColor: '#e2e8f0'
                                    }}>
                                        <img
                                            src={costume.image}
                                            alt={costume.name}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                transition: 'transform 0.3s ease, opacity 0.3s ease',
                                                display: 'block',
                                                backgroundColor: '#e2e8f0'
                                            }}
                                            onError={(e) => {
                                                console.error('Image failed to load:', costume.name, costume.image);
                                                handleImageError(e);
                                            }}
                                            onLoad={(e) => {
                                                e.target.style.opacity = '1';
                                            }}
                                            onMouseEnter={(e) => {
                                                if (e.target.complete && e.target.naturalHeight !== 0) {
                                                    e.target.style.transform = 'scale(1.1)';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.transform = 'scale(1)';
                                            }}
                                        />
                                        <div style={{
                                            position: 'absolute',
                                            top: '1rem',
                                            right: '1rem',
                                            background: 'rgba(255, 255, 255, 0.9)',
                                            padding: '0.5rem 1rem',
                                            borderRadius: '9999px',
                                            fontSize: '0.875rem',
                                            fontWeight: 600,
                                            color: 'var(--color-primary)'
                                        }}>
                                            {costume.category}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div style={{ padding: '1.5rem' }}>
                                        <h3 style={{ 
                                            fontSize: '1.5rem', 
                                            marginBottom: '0.5rem',
                                            fontFamily: "'Playfair Display', serif",
                                            color: 'var(--color-primary)'
                                        }}>
                                            {costume.name}
                                        </h3>
                                        <p style={{ 
                                            color: 'var(--color-text-light)',
                                            fontSize: '0.95rem',
                                            lineHeight: '1.6',
                                            marginBottom: '1rem',
                                            minHeight: '3rem'
                                        }}>
                                            {costume.description}
                                        </p>

                                        {/* Features */}
                                        <div style={{ 
                                            display: 'flex', 
                                            flexWrap: 'wrap', 
                                            gap: '0.5rem',
                                            marginBottom: '1rem'
                                        }}>
                                            {costume.features.map((feature, idx) => (
                                                <span
                                                    key={idx}
                                                    style={{
                                                        background: 'var(--color-background)',
                                                        padding: '0.25rem 0.75rem',
                                                        borderRadius: '9999px',
                                                        fontSize: '0.75rem',
                                                        color: 'var(--color-text)',
                                                        fontWeight: 500
                                                    }}
                                                >
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Price and Button */}
                                        <div style={{ 
                                            display: 'flex', 
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginTop: '1rem',
                                            paddingTop: '1rem',
                                            borderTop: '1px solid #e2e8f0'
                                        }}>
                                            <span style={{ 
                                                fontSize: '1.5rem', 
                                                fontWeight: 700,
                                                color: 'var(--color-primary)'
                                            }}>
                                                {costume.price}
                                            </span>
                                            <Button 
                                                variant="primary"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleProductClick(costume.id);
                                                }}
                                                style={{ 
                                                    padding: '0.5rem 1.5rem',
                                                    fontSize: '0.9rem'
                                                }}
                                            >
                                                View Details
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Call to Action Section */}
                <section style={{ 
                    padding: '5rem 0', 
                    background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
                    color: 'white',
                    textAlign: 'center'
                }}>
                    <div className="container">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            style={{ maxWidth: '700px', margin: '0 auto' }}
                        >
                            <h2 style={{ 
                                fontSize: '2.5rem', 
                                marginBottom: '1.5rem',
                                fontFamily: "'Playfair Display', serif",
                                color: 'white'
                            }}>
                                Can't Find What You're Looking For?
                            </h2>
                            <p style={{ 
                                fontSize: '1.25rem', 
                                marginBottom: '2.5rem',
                                lineHeight: '1.7',
                                opacity: 0.95
                            }}>
                                Contact us for custom orders and personalized styling consultations.
                            </p>
                            <Button 
                                variant="outline" 
                                style={{ 
                                    background: 'white', 
                                    color: 'var(--color-primary)',
                                    border: '2px solid white'
                                }}
                            >
                                Contact Us
                            </Button>
                        </motion.div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Collections;
