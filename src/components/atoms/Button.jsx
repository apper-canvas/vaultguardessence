import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, className = '', type = 'button', whileHover, whileTap, ...props }) => {
    return (
        <motion.button
            type={type}
            onClick={onClick}
            className={`transition-colors duration-200 ${className}`}
            whileHover={whileHover}
            whileTap={whileTap}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;