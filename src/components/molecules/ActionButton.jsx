import React from 'react';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const ActionButton = ({ icon, text, onClick, className = '', iconSize = 16, type = 'button', whileHover = { scale: 1.05 }, whileTap = { scale: 0.95 }, ...props }) => {
    return (
        <Button
            type={type}
            onClick={onClick}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${className}`}
            whileHover={whileHover}
            whileTap={whileTap}
            {...props}
        >
            {icon && <ApperIcon name={icon} size={iconSize} />}
            {text && <span>{text}</span>}
        </Button>
    );
};

export default ActionButton;