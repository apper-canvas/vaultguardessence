import React from 'react';
import { motion } from 'framer-motion';

const ModalWrapper = ({ children, zIndex = 'z-50', maxWidth = 'max-w-2xl', className = '' }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`fixed inset-0 ${zIndex} flex items-center justify-center p-4 ${className}`}
        >
            <div className={`bg-surface rounded-lg shadow-xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar ${maxWidth}`}>
                {children}
            </div>
        </motion.div>
    );
};

export default ModalWrapper;