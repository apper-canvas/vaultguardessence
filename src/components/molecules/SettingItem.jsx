import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';

const SettingItem = ({ name, description, actionText, isDanger, transitionDelay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: transitionDelay }}
            className="flex items-center justify-between p-4 rounded-lg hover:bg-slate-700/50 transition-colors group"
        >
            <div className="flex-1">
<h3 className="font-medium text-slate-800 group-hover:text-slate-900 transition-colors">
                    {name}
                </h3>
                <p className="text-sm text-slate-600 mt-1">{description}</p>
            </div>
            
            <Button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    isDanger
                        ? 'bg-error text-white hover:bg-red-600'
: 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                }`}
            >
                {actionText}
            </Button>
        </motion.div>
    );
};

export default SettingItem;