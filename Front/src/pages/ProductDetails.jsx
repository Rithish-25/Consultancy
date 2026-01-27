import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Button from '../components/Button';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Scroll to top when ProductDetails component mounts
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    // Product data (same as Collections page)
    const costumes = [
        {
            id: 1,
            name: "Classic Elegance Suit",
            category: "Formal Wear",
            price: "$299",
            description: "A timeless black suit perfect for formal occasions. Crafted with premium fabric and impeccable tailoring.",
            image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&h=600&fit=crop",
            features: ["Premium Fabric", "Perfect Fit", "Dry Clean Only"],
            fullDescription: "Experience the epitome of sophistication with our Classic Elegance Suit. This meticulously crafted piece features premium wool blend fabric that drapes beautifully and maintains its shape throughout the day. The suit includes a tailored jacket with notch lapels and a matching trouser with a modern slim fit. Perfect for business meetings, formal events, or any occasion where you want to make a lasting impression. Available in classic black, navy, and charcoal gray.",
            sizes: ["S", "M", "L", "XL", "XXL"],
            colors: ["Black", "Navy", "Charcoal Gray"],
            careInstructions: "Dry clean only. Store on a padded hanger to maintain shape. Avoid direct sunlight.",
            material: "Premium Wool Blend",
            origin: "Made with precision in our certified workshop"
        },
        {
            id: 2,
            name: "Casual Denim Collection",
            category: "Casual Wear",
            price: "$89",
            description: "Comfortable and stylish denim pieces for everyday wear. Made from high-quality denim with modern cuts.",
            image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=600&fit=crop",
            features: ["100% Cotton", "Machine Washable", "Multiple Colors"],
            fullDescription: "Our Casual Denim Collection brings together comfort and style in perfect harmony. Made from 100% premium cotton denim, these pieces are designed for everyday wear while maintaining a modern, fashionable look. The collection includes jeans, jackets, and shirts that can be mixed and matched to create versatile outfits. The fabric is pre-washed for softness and features a slight stretch for added comfort.",
            sizes: ["28", "30", "32", "34", "36", "38"],
            colors: ["Classic Blue", "Dark Indigo", "Black", "Light Wash"],
            careInstructions: "Machine wash cold with like colors. Tumble dry low. Avoid bleach.",
            material: "100% Premium Cotton Denim",
            origin: "Ethically sourced and manufactured"
        },
        {
            id: 3,
            name: "Vintage Leather Jacket",
            category: "Outerwear",
            price: "$349",
            description: "Authentic vintage-style leather jacket with classic design. Premium genuine leather construction.",
            image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=600&fit=crop",
            features: ["Genuine Leather", "Classic Design", "Durable"],
            fullDescription: "Channel timeless cool with our Vintage Leather Jacket. Crafted from premium genuine leather, this jacket features a classic biker-inspired design with asymmetrical zipper closure, snap-down collar, and multiple pockets for functionality. The leather develops a unique patina over time, making each jacket truly one-of-a-kind. Perfect for adding an edge to any outfit, whether you're hitting the road or the city streets.",
            sizes: ["S", "M", "L", "XL"],
            colors: ["Black", "Brown", "Tan"],
            careInstructions: "Clean with leather conditioner. Store in a cool, dry place. Avoid water exposure.",
            material: "Genuine Premium Leather",
            origin: "Handcrafted with attention to detail"
        },
        {
            id: 4,
            name: "Summer Linen Shirt",
            category: "Casual Wear",
            price: "$79",
            description: "Lightweight and breathable linen shirt perfect for warm weather. Elegant and comfortable.",
            image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&h=600&fit=crop",
            features: ["100% Linen", "Breathable", "Wrinkle Resistant"],
            fullDescription: "Stay cool and stylish all summer long with our Summer Linen Shirt. Made from 100% premium linen, this shirt offers exceptional breathability and comfort in warm weather. The natural linen fabric has a relaxed, slightly textured feel that adds character to your look. Features a classic button-down design with a relaxed fit, perfect for both casual and semi-formal occasions. The fabric is treated for wrinkle resistance while maintaining its natural drape.",
            sizes: ["S", "M", "L", "XL", "XXL"],
            colors: ["White", "Beige", "Light Blue", "Pale Green"],
            careInstructions: "Machine wash gentle cycle. Hang dry or tumble dry low. Iron on medium heat if needed.",
            material: "100% Premium Linen",
            origin: "Made from sustainably sourced linen"
        },
        {
            id: 5,
            name: "Designer Tuxedo",
            category: "Formal Wear",
            price: "$599",
            description: "Luxury tuxedo for special events. Handcrafted with attention to detail and premium materials.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
            features: ["Premium Materials", "Handcrafted", "Perfect for Events"],
            fullDescription: "Make a grand entrance with our Designer Tuxedo, the ultimate choice for black-tie events, galas, and formal celebrations. This luxurious tuxedo is handcrafted with meticulous attention to detail, featuring satin lapels, satin stripe down the trouser leg, and premium fabric that exudes elegance. The jacket is fully lined for comfort and includes a matching bow tie and cummerbund. Perfect for weddings, award ceremonies, or any occasion where sophistication is paramount.",
            sizes: ["S", "M", "L", "XL", "XXL"],
            colors: ["Classic Black", "Midnight Blue"],
            careInstructions: "Dry clean only. Store in a garment bag. Steam to remove wrinkles.",
            material: "Premium Wool Blend with Satin Accents",
            origin: "Handcrafted by master tailors"
        },
        {
            id: 6,
            name: "Athletic Sportswear",
            category: "Activewear",
            price: "$129",
            description: "High-performance athletic wear designed for comfort and mobility. Perfect for workouts and sports.",
            image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
            features: ["Moisture Wicking", "Flexible", "Durable"],
            fullDescription: "Elevate your workout with our Athletic Sportswear collection. Designed for high performance, these pieces feature advanced moisture-wicking technology that keeps you dry and comfortable during intense activities. The fabric is stretchable and breathable, allowing for unrestricted movement. Perfect for running, gym workouts, yoga, or any athletic activity. The collection includes tops, bottoms, and complete sets that combine style with functionality.",
            sizes: ["XS", "S", "M", "L", "XL", "XXL"],
            colors: ["Black", "Navy", "Gray", "Red", "Blue"],
            careInstructions: "Machine wash cold. Do not use fabric softener. Air dry or tumble dry low.",
            material: "High-Performance Polyester Blend",
            origin: "Designed for athletes, by athletes"
        },
        {
            id: 7,
            name: "Bohemian Floral Dress",
            category: "Dresses",
            price: "$149",
            description: "Beautiful bohemian-style dress with floral patterns. Flowing and elegant design perfect for any occasion.",
            image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=600&fit=crop",
            features: ["Floral Pattern", "Comfortable Fit", "Versatile"],
            fullDescription: "Embrace your free spirit with our Bohemian Floral Dress. This stunning piece features a beautiful floral print on a flowing, lightweight fabric that moves gracefully with you. The dress has a relaxed fit with an elastic waist for comfort, making it perfect for brunches, garden parties, or casual outings. The bohemian aesthetic is enhanced by the vibrant colors and intricate patterns, creating a look that's both romantic and effortlessly chic.",
            sizes: ["XS", "S", "M", "L", "XL"],
            colors: ["Floral Print - Blue", "Floral Print - Pink", "Floral Print - Green"],
            careInstructions: "Machine wash gentle cycle. Hang dry. Iron on low heat if needed.",
            material: "Lightweight Polyester Blend",
            origin: "Designed with bohemian inspiration"
        },
        {
            id: 8,
            name: "Winter Wool Coat",
            category: "Outerwear",
            price: "$399",
            description: "Warm and stylish wool coat for cold weather. Classic design with modern touches.",
            image: "https://images.unsplash.com/photo-1539533018447-63fc58c48a24?w=800&h=600&fit=crop",
            features: ["100% Wool", "Warm", "Classic Style"],
            fullDescription: "Stay warm and stylish through the coldest months with our Winter Wool Coat. Made from 100% premium wool, this coat provides exceptional warmth while maintaining a sophisticated appearance. The classic design features a double-breasted front, notched lapels, and a tailored fit that flatters any silhouette. The coat is fully lined for added warmth and includes deep pockets for practicality. Perfect for business commutes, evening events, or any occasion where you need both warmth and elegance.",
            sizes: ["S", "M", "L", "XL", "XXL"],
            colors: ["Camel", "Black", "Navy", "Gray"],
            careInstructions: "Dry clean only. Store in a garment bag. Brush gently to remove lint.",
            material: "100% Premium Wool",
            origin: "Crafted for winter elegance"
        },
        {
            id: 9,
            name: "Business Casual Blazer",
            category: "Formal Wear",
            price: "$249",
            description: "Versatile blazer that transitions from office to evening. Professional yet stylish.",
            image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&h=600&fit=crop",
            features: ["Versatile", "Professional", "Comfortable"],
            fullDescription: "The perfect bridge between professional and casual, our Business Casual Blazer is a wardrobe essential. This versatile piece can be dressed up for the office or dressed down for evening outings. Made from a premium blend that resists wrinkles and maintains its shape, the blazer features a modern slim fit with structured shoulders. Pair it with dress pants for the office or jeans for a smart-casual look. The timeless design ensures it will remain a staple in your wardrobe for years to come.",
            sizes: ["S", "M", "L", "XL", "XXL"],
            colors: ["Navy", "Charcoal", "Black", "Brown"],
            careInstructions: "Dry clean recommended. Can be steamed to remove wrinkles. Store on a padded hanger.",
            material: "Premium Wool Blend",
            origin: "Designed for the modern professional"
        }
    ];

    useEffect(() => {
        // Find the product by ID
        const foundProduct = costumes.find(c => c.id === parseInt(id));
        if (foundProduct) {
            setProduct(foundProduct);
        } else {
            // If product not found, redirect to collections
            navigate('/collections');
        }
    }, [id, navigate]);

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
                    <div className="container">
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
                                    {product.sizes && (
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
                                                        style={{
                                                            padding: '0.75rem 1.5rem',
                                                            border: '2px solid var(--color-primary)',
                                                            borderRadius: '0.5rem',
                                                            background: 'white',
                                                            color: 'var(--color-primary)',
                                                            fontWeight: 600,
                                                            cursor: 'pointer',
                                                            transition: 'all 0.3s ease',
                                                            fontSize: '1rem'
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.target.style.background = 'var(--color-primary)';
                                                            e.target.style.color = 'white';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.target.style.background = 'white';
                                                            e.target.style.color = 'var(--color-primary)';
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
                                        <Button
                                            variant="primary"
                                            style={{
                                                flex: 1,
                                                padding: '1rem 2rem',
                                                fontSize: '1.1rem',
                                                fontWeight: 600,
                                                whiteSpace: 'nowrap',
                                                minWidth: 'fit-content'
                                            }}
                                        >
                                            Add to Cart
                                        </Button>
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
