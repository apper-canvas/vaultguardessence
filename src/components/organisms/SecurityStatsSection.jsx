import React from 'react';
import { motion } from 'framer-motion';
import StatisticItem from '@/components/molecules/StatisticItem';

const SecurityStatsSection = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 bg-surface rounded-xl p-8 border border-slate-700"
        >
            <h2 className="text-2xl font-bold text-slate-100 mb-8">Security at a Glance</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <StatisticItem value="256-bit" label="AES Encryption" valueColorClass="text-success" />
                <StatisticItem value="Zero" label="Knowledge Architecture" valueColorClass="text-primary" />
                <StatisticItem value="24/7" label="Breach Monitoring" valueColorClass="text-info" />
            </div>
        </motion.div>
    );
};

export default SecurityStatsSection;