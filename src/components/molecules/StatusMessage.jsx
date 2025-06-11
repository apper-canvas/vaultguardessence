import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const StatusMessage = ({ type, message, subMessage, onAction, actionText }) => {
    let iconName = '';
    let iconColorClass = '';
    let animateProps = {};

    switch (type) {
        case 'loading':
            iconName = 'Loader';
            iconColorClass = 'text-primary animate-spin';
            break;
        case 'error':
            iconName = 'AlertCircle';
            iconColorClass = 'text-error';
            break;
        case 'empty':
            iconName = 'Shield';
            iconColorClass = 'text-slate-400';
            animateProps = { y: [0, -10, 0], transition: { repeat: Infinity, duration: 3 } };
            break;
        default:
            iconName = 'Info';
            iconColorClass = 'text-info';
    }

    return (
        <div className="flex items-center justify-center h-64">
            <div className="text-center">
                <motion.div
                    animate={animateProps}
                    className="mb-4"
                >
                    <ApperIcon name={iconName} size={48} className={`${iconColorClass} mx-auto`} />
                </motion.div>
                <h3 className="text-lg font-medium text-slate-100 mb-2">{message}</h3>
                {subMessage && <p className="text-slate-400 mb-4">{subMessage}</p>}
                {onAction && actionText && (
                    <Button
                        onClick={onAction}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {actionText}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default StatusMessage;