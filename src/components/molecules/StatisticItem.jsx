import React from 'react';

const StatisticItem = ({ value, label, valueColorClass = 'text-primary' }) => {
    return (
<div className="text-center">
            <div className={`text-3xl font-bold mb-2 ${valueColorClass}`}>{value}</div>
            <div className="text-text-secondary">{label}</div>
        </div>
    );
};

export default StatisticItem;