import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, variant = 'primary', className = '', style = {} }) => {
  const baseStyles = "btn-base";

  const variants = {
    primary: {
      background: 'var(--color-primary)',
      color: 'var(--color-white)',
      border: 'none',
    },
    secondary: {
      background: 'transparent',
      color: 'var(--color-primary)',
      border: '2px solid var(--color-primary)',
    },
    outline: {
      background: 'transparent',
      color: 'var(--color-white)',
      border: '2px solid var(--color-white)',
    }
  };

  return (
    <motion.button
      className={`${baseStyles} ${className}`}
      style={{ ...variants[variant], ...style }}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </motion.button>
  );
};

export default Button;
