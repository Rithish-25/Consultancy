import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        try {
            const localData = localStorage.getItem('cart');
            return localData ? JSON.parse(localData) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, size = null) => {
        setCart(prevCart => {
            // Check if item exists with same ID AND same size
            const existingItem = prevCart.find(item =>
                item._id === product._id && item.selectedSize === size
            );

            if (existingItem) {
                return prevCart.map(item =>
                    (item._id === product._id && item.selectedSize === size)
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevCart, { ...product, selectedSize: size, quantity: 1 }];
        });
    };

    const removeFromCart = (productId, size = null) => {
        setCart(prevCart => prevCart.filter(item =>
            !(item._id === productId && item.selectedSize === size)
        ));
    };

    const updateQuantity = (productId, newQuantity, size = null) => {
        if (newQuantity < 1) {
            removeFromCart(productId, size);
            return;
        }
        setCart(prevCart => prevCart.map(item =>
            (item._id === productId && item.selectedSize === size)
                ? { ...item, quantity: newQuantity }
                : item
        ));
    };

    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cart.reduce((total, item) => {
        // Parse price: remove '₹' or commas if present
        const priceString = String(item.price).replace(/[^0-9.]/g, '');
        const price = parseFloat(priceString) || 0;
        return total + (price * item.quantity);
    }, 0);

    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartCount,
            cartTotal
        }}>
            {children}
        </CartContext.Provider>
    );
};
