import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const IconContainer = ({ iconName, iconSize, containerSize, gradientFrom, gradientTo, iconClassName = '' }) => {
    const sizeClass = {
        sm: 'w-10 h-10',
        md: 'w-12 h-12',
        lg: 'w-16 h-16',
        xl: 'w-20 h-20',
        '2xl': 'w-24 h-24',
    }[containerSize] || containerSize; // Allow custom size strings as well

    return (
        <div className={`${sizeClass} bg-gradient-to-br from-${gradientFrom} to-${gradientTo} rounded-lg flex items-center justify-center`}>
            <ApperIcon name={iconName} size={iconSize} className={`text-white ${iconClassName}`} />
        </div>
    );
};

export default IconContainer;