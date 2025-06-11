import React from 'react';
import { motion } from 'framer-motion';
import IconContainer from '@/components/atoms/IconContainer';

const InfoCard = ({ iconName, title, description, gradientFrom, gradientTo, className = '', children, ...props }) => {
    return (
        <motion.div
            className={`bg-surface p-6 rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-300 text-center ${className}`}
            {...props}
        >
            <IconContainer 
                iconName={iconName} 
                iconSize={24} 
                containerSize="w-12 h-12" 
                gradientFrom={gradientFrom} 
                gradientTo={gradientTo} 
                className="mx-auto mb-4"
            />
<h3 className="text-lg font-bold text-green-500 mb-2">{title}</h3>
                <p className="text-text-secondary">{description}</p>
            {children}
        </motion.div>
    );
};

export default InfoCard;