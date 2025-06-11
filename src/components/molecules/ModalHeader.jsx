import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const ModalHeader = ({ title, onClose, children }) => {
    return (
<div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">{title}</h2>
            <div className="flex items-center space-x-2">
                {children} {/* For extra buttons next to close */}
                <Button
                    onClick={onClose}
className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                    <ApperIcon name="X" size={20} className="text-slate-600" />
                </Button>
            </div>
        </div>
    );
};

export default ModalHeader;