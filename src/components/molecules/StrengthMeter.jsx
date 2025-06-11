import React from 'react';
import ProgressBar from '@/components/atoms/ProgressBar';

const StrengthMeter = ({ strength, size = 'md' }) => {
    const getStrengthColorClass = (strength) => {
        if (strength < 25) return 'bg-error';
        if (strength < 50) return 'bg-warning';
        if (strength < 75) return 'bg-info';
        return 'bg-success';
    };

    const getStrengthTextColorClass = (strength) => {
        if (strength < 25) return 'text-error';
        if (strength < 50) return 'text-warning';
        if (strength < 75) return 'text-info';
        return 'text-success';
    };

    const getStrengthText = (strength) => {
        if (strength < 25) return 'Very Weak';
        if (strength < 50) return 'Weak';
        if (strength < 75) return 'Good';
        return 'Strong';
    };

    const heightClass = size === 'sm' ? 'h-1' : 'h-2';
    const showText = size !== 'sm';

    return (
        <div className="space-y-1">
            <ProgressBar progress={strength} colorClass={getStrengthColorClass(strength)} heightClass={heightClass} />
            {showText && (
                <div className="flex justify-between items-center">
                    <span className={`text-xs font-medium ${getStrengthTextColorClass(strength)}`}>
                        {getStrengthText(strength)}
                    </span>
                    <span className="text-xs text-slate-400">{strength}%</span>
                </div>
            )}
        </div>
    );
};

export default StrengthMeter;