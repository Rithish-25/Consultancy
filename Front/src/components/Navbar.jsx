import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('token');
    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/signup');
    };

    const navbarStyles = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: isScrolled ? '1rem 0' : '1.5rem 0',
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        boxShadow: isScrolled ? 'var(--shadow-md)' : 'none',
        transition: 'all 0.3s ease',
    };

    // Pages with dark hero backgrounds should have white navbar text
    const pagesWithDarkHero = ['/', '/about', '/collections'];
    const isProductDetailsPage = location.pathname.startsWith('/collections/') && location.pathname !== '/collections';
    const shouldUseWhiteText = !isScrolled && (pagesWithDarkHero.includes(location.pathname) || isProductDetailsPage);

    const linkStyle = {
        color: shouldUseWhiteText ? 'var(--color-white)' : 'var(--color-text)',
        fontWeight: 500,
        fontSize: '0.95rem',
        cursor: 'pointer'
    };

    if (isAuthPage) return null;

    return (
        <nav className={isScrolled ? 'navbar-scrolled' : 'navbar-transparent'} style={navbarStyles}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="logo"
                    >
                        <h2 className="navbar-logo-text" style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            color: shouldUseWhiteText ? 'var(--color-white)' : 'var(--color-primary)'
                        }}>
                            Canon Ball Fashions
                        </h2>
                    </motion.div>
                </Link>

                {/* Desktop Menu */}
                <div className="desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>

                    {!isAuthPage && (isLoggedIn ? (
                        <>
                            <Link
                                to="/"
                                style={linkStyle}
                                onClick={() => {
                                    if (location.pathname === '/') {
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }
                                }}
                            >
                                Home
                            </Link>
                            <Link
                                to="/collections"
                                style={linkStyle}
                                onClick={() => {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                            >
                                Collections
                            </Link>
                            <Link
                                to="/about"
                                style={linkStyle}
                                onClick={() => {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                            >
                                About
                            </Link>
                            <span onClick={handleLogout} style={linkStyle}>Logout</span>
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={linkStyle}>Log In</Link>
                            <Link to="/signup" style={linkStyle}>Sign Up</Link>
                        </>
                    ))}

                </div>

                {/* Mobile Menu Button */}
                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    style={{
                        display: 'none',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0.5rem',
                        flexDirection: 'column',
                        gap: '0.375rem',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '2rem',
                        height: '2rem'
                    }}
                    aria-label="Toggle menu"
                >
                    <span className="hamburger-line" style={{
                        display: 'block',
                        width: '1.5rem',
                        height: '2px',
                        backgroundColor: shouldUseWhiteText ? 'var(--color-white)' : 'var(--color-text)',
                        transition: 'all 0.3s ease',
                        transform: isMobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
                    }}></span>
                    <span className="hamburger-line" style={{
                        display: 'block',
                        width: '1.5rem',
                        height: '2px',
                        backgroundColor: shouldUseWhiteText ? 'var(--color-white)' : 'var(--color-text)',
                        transition: 'all 0.3s ease',
                        opacity: isMobileMenuOpen ? 0 : 1
                    }}></span>
                    <span className="hamburger-line" style={{
                        display: 'block',
                        width: '1.5rem',
                        height: '2px',
                        backgroundColor: shouldUseWhiteText ? 'var(--color-white)' : 'var(--color-text)',
                        transition: 'all 0.3s ease',
                        transform: isMobileMenuOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none'
                    }}></span>
                </button>

            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            zIndex: 9998,
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Mobile Sidebar Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="mobile-menu"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            width: '280px',
                            height: '100vh',
                            background: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            backdropFilter: 'blur(10px)',
                            boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.3)',
                            zIndex: 9999,
                            padding: '2rem 1.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.5rem',
                            overflowY: 'auto'
                        }}
                    >
                        {/* Close Button */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h3 style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: '1.25rem',
                                fontWeight: 700,
                                color: 'var(--color-white)'
                            }}>
                                Menu
                            </h3>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '0.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '2rem',
                                    height: '2rem',
                                    borderRadius: '0.25rem',
                                    transition: 'background-color 0.2s',
                                    position: 'relative'
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.05)'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                aria-label="Close menu"
                            >
                                <span style={{
                                    position: 'absolute',
                                    width: '1.25rem',
                                    height: '2px',
                                    backgroundColor: 'var(--color-white)',
                                    transform: 'rotate(45deg)',
                                    borderRadius: '1px'
                                }}></span>
                                <span style={{
                                    position: 'absolute',
                                    width: '1.25rem',
                                    height: '2px',
                                    backgroundColor: 'var(--color-white)',
                                    transform: 'rotate(-45deg)',
                                    borderRadius: '1px'
                                }}></span>
                            </button>
                        </div>

                        {/* Navigation Items */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {!isAuthPage && (isLoggedIn ? (
                                <>
                                    <Link
                                        to="/"
                                        onClick={() => {
                                            setIsMobileMenuOpen(false);
                                            if (location.pathname === '/') {
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                            }
                                        }}
                                        style={{
                                            color: 'var(--color-white)',
                                            fontWeight: 500,
                                            fontSize: '1rem',
                                            padding: '0.75rem 0',
                                            borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                                            textDecoration: 'none',
                                            transition: 'color 0.2s, transform 0.2s'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.color = 'var(--color-secondary)';
                                            e.target.style.transform = 'translateX(5px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.color = 'var(--color-white)';
                                            e.target.style.transform = 'translateX(0)';
                                        }}
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        to="/collections"
                                        onClick={() => {
                                            setIsMobileMenuOpen(false);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        style={{
                                            color: 'var(--color-white)',
                                            fontWeight: 500,
                                            fontSize: '1rem',
                                            padding: '0.75rem 0',
                                            borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                                            textDecoration: 'none',
                                            transition: 'color 0.2s, transform 0.2s'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.color = 'var(--color-secondary)';
                                            e.target.style.transform = 'translateX(5px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.color = 'var(--color-white)';
                                            e.target.style.transform = 'translateX(0)';
                                        }}
                                    >
                                        Collections
                                    </Link>
                                    <Link
                                        to="/about"
                                        onClick={(e) => {
                                            setIsMobileMenuOpen(false);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        style={{
                                            color: 'var(--color-white)',
                                            fontWeight: 500,
                                            fontSize: '1rem',
                                            padding: '0.75rem 0',
                                            borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                                            textDecoration: 'none',
                                            transition: 'color 0.2s, transform 0.2s'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.color = 'var(--color-secondary)';
                                            e.target.style.transform = 'translateX(5px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.color = 'var(--color-white)';
                                            e.target.style.transform = 'translateX(0)';
                                        }}
                                    >
                                        About
                                    </Link>
                                    <span
                                        onClick={() => {
                                            handleLogout();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        style={{
                                            color: 'var(--color-white)',
                                            fontWeight: 500,
                                            fontSize: '1rem',
                                            padding: '0.75rem 0',
                                            borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                                            cursor: 'pointer',
                                            transition: 'color 0.2s, transform 0.2s'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.color = 'var(--color-secondary)';
                                            e.target.style.transform = 'translateX(5px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.color = 'var(--color-white)';
                                            e.target.style.transform = 'translateX(0)';
                                        }}
                                    >
                                        Logout
                                    </span>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        style={{
                                            color: 'var(--color-white)',
                                            fontWeight: 500,
                                            fontSize: '1rem',
                                            padding: '0.75rem 0',
                                            borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                                            textDecoration: 'none',
                                            transition: 'color 0.2s, transform 0.2s'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.color = 'var(--color-secondary)';
                                            e.target.style.transform = 'translateX(5px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.color = 'var(--color-white)';
                                            e.target.style.transform = 'translateX(0)';
                                        }}
                                    >
                                        Log In
                                    </Link>
                                    <Link
                                        to="/signup"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        style={{
                                            color: 'var(--color-white)',
                                            fontWeight: 500,
                                            fontSize: '1rem',
                                            padding: '0.75rem 0',
                                            borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                                            textDecoration: 'none',
                                            transition: 'color 0.2s, transform 0.2s'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.color = 'var(--color-secondary)';
                                            e.target.style.transform = 'translateX(5px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.color = 'var(--color-white)';
                                            e.target.style.transform = 'translateX(0)';
                                        }}
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
