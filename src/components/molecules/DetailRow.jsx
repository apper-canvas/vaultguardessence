import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const DetailRow = ({ label, children }) => {
    return (
<div>
            <label className="block text-sm font-medium text-white mb-2">{label}</label>
            {children}
        </div>
    );
};

export default DetailRow;