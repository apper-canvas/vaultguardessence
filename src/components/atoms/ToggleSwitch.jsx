import React from 'react';
import { motion } from 'framer-motion';

const ToggleSwitch = ({ checked, onChange, label, className = '' }) => {
    return (
        <div className={`flex items-center justify-between ${className}`}>
            {label && <label className="text-sm font-medium text-slate-300">{label}</label>}
            <div className="relative">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    className="sr-only"
                />
                <motion.button
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onChange(!checked)}
                    className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                        checked ? 'bg-primary' : 'bg-slate-600'
                    }`}
                >
                    <motion.div
                        animate={{ x: checked ? 24 : 2 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        className="w-5 h-5 bg-white rounded-full shadow-md"
                    />
                </motion.button>
            </div>
        </div>
    );
};

export default ToggleSwitch;