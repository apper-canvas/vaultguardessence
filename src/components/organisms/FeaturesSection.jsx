import React from 'react';
import { motion } from 'framer-motion';
import InfoCard from '@/components/molecules/InfoCard';

const FeaturesSection = ({ features }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
        >
            {features.map((feature, index) => (
                <InfoCard
                    key={feature.title}
                    iconName={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    gradientFrom="primary"
                    gradientTo="info"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    whileHover={{ y: -5 }}
                />
            ))}
        </motion.div>
    );
};

export default FeaturesSection;