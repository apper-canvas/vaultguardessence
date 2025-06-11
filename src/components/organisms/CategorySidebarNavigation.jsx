import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import CategoryFilterItem from '@/components/molecules/CategoryFilterItem';
import Button from '@/components/atoms/Button';

const CategorySidebarNavigation = ({ 
    categories, 
    selectedCategory, 
    onCategorySelect, 
    credentialCounts = {} 
}) => {
    const allCount = Object.values(credentialCounts).reduce((sum, count) => sum + count, 0);

    return (
<div className="p-4 space-y-2 h-full overflow-y-auto custom-scrollbar">
            <h3 className="text-lg font-bold text-green-400 mb-4">Categories</h3>
            
            {/* All Credentials */}
            <CategoryFilterItem
                category={{ id: 'all', name: 'All Credentials', icon: 'Folder' }}
                count={allCount}
                isSelected={selectedCategory === 'all'}
                onClick={() => onCategorySelect('all')}
            />

            {/* Category List */}
            <div className="space-y-1">
                {categories.map((category) => {
                    const count = credentialCounts[category.name] || 0;
                    
                    return (
                        <CategoryFilterItem
                            key={category.id}
                            category={category}
                            count={count}
                            isSelected={selectedCategory === category.name}
                            onClick={() => onCategorySelect(category.name)}
                        />
                    );
                })}
            </div>

            {/* Quick Actions */}
<div className="pt-4 mt-4 border-t border-slate-700">
                <h4 className="text-sm font-medium text-green-400 mb-2">Quick Actions</h4>
                <div className="space-y-1">
<Button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
className="w-full flex items-center space-x-3 p-3 rounded-lg text-slate-200 hover:bg-slate-700 hover:text-green-400 transition-all duration-200"
                    >
                        <ApperIcon name="AlertTriangle" size={20} />
                        <span className="font-medium text-sm">Weak Passwords</span>
                    </Button>
                    
                    <Button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
className="w-full flex items-center space-x-3 p-3 rounded-lg text-slate-200 hover:bg-slate-700 hover:text-green-400 transition-all duration-200"
                    >
                        <ApperIcon name="Copy" size={20} />
                        <span className="font-medium text-sm">Duplicate Passwords</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CategorySidebarNavigation;