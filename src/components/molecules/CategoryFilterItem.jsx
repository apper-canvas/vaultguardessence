import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const CategoryFilterItem = ({ category, count, isSelected, onClick }) => {
    const commonClasses = "w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200";
    const selectedClasses = "bg-primary text-white shadow-lg";
    const unselectedClasses = "text-slate-300 hover:bg-slate-700 hover:text-white";

    const countChipSelectedClasses = "bg-white/20 text-white";
    const countChipUnselectedClasses = "bg-slate-600 text-slate-300";

    return (
        <Button
            onClick={onClick}
            className={`${commonClasses} ${isSelected ? selectedClasses : unselectedClasses}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <div className="flex items-center space-x-3">
                {category.color && (
                    <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                    />
                )}
                {category.icon && <ApperIcon name={category.icon} size={20} />}
                <span className="font-medium">{category.name}</span>
            </div>
            <span className={`text-sm px-2 py-1 rounded-full ${isSelected ? countChipSelectedClasses : countChipUnselectedClasses}`}>
                {count}
            </span>
        </Button>
    );
};

export default CategoryFilterItem;