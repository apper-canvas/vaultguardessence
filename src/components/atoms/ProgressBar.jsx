import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ progress, colorClass, heightClass = 'h-2' }) => {
    return (
        <div className={`w-full bg-slate-700 rounded-full overflow-hidden ${heightClass}`}>
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`${heightClass} ${colorClass} rounded-full transition-colors duration-300`}
            />
        </div>
    );
};

export default ProgressBar;