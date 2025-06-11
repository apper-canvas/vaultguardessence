import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import IconContainer from '@/components/atoms/IconContainer';

const AppSettingsInfo = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 text-center text-slate-500"
        >
            <div className="flex items-center justify-center space-x-2 mb-2">
                <IconContainer iconName="Shield" iconSize={12} containerSize="w-6 h-6" gradientFrom="primary" gradientTo="info" className="rounded" />
                <span className="font-medium">VaultGuard</span>
            </div>
            <p className="text-sm">Version 1.0.0 • Your passwords are encrypted and secure</p>
        </motion.div>
    );
};

export default AppSettingsInfo;