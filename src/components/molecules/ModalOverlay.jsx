import React from 'react';
import { motion } from 'framer-motion';

const ModalOverlay = ({ onClick, zIndex = 'z-40' }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 bg-black/50 ${zIndex}`}
            onClick={onClick}
        />
    );
};

export default ModalOverlay;