import { motion } from 'framer-motion';
import ApperIcon from './ApperIcon';

const CategorySidebar = ({ 
  categories, 
  selectedCategory, 
  onCategorySelect, 
  credentialCounts = {} 
}) => {
  const allCount = Object.values(credentialCounts).reduce((sum, count) => sum + count, 0);

  return (
    <div className="p-4 space-y-2 h-full overflow-y-auto custom-scrollbar">
      <h3 className="text-lg font-bold text-slate-100 mb-4">Categories</h3>
      
      {/* All Credentials */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onCategorySelect('all')}
        className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
          selectedCategory === 'all'
            ? 'bg-primary text-white shadow-lg'
            : 'text-slate-300 hover:bg-slate-700 hover:text-white'
        }`}
      >
        <div className="flex items-center space-x-3">
          <ApperIcon name="Folder" size={20} />
          <span className="font-medium">All Credentials</span>
        </div>
        <span className={`text-sm px-2 py-1 rounded-full ${
          selectedCategory === 'all'
            ? 'bg-white/20 text-white'
            : 'bg-slate-600 text-slate-300'
        }`}>
          {allCount}
        </span>
      </motion.button>

      {/* Category List */}
      <div className="space-y-1">
        {categories.map((category) => {
          const count = credentialCounts[category.name] || 0;
          
          return (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onCategorySelect(category.name)}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                selectedCategory === category.name
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div 
                  className={`w-3 h-3 rounded-full`}
                  style={{ backgroundColor: category.color }}
                />
                <ApperIcon name={category.icon} size={20} />
                <span className="font-medium">{category.name}</span>
              </div>
              <span className={`text-sm px-2 py-1 rounded-full ${
                selectedCategory === category.name
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-600 text-slate-300'
              }`}>
                {count}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="pt-4 mt-4 border-t border-slate-700">
        <h4 className="text-sm font-medium text-slate-400 mb-2">Quick Actions</h4>
        <div className="space-y-1">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center space-x-3 p-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-all duration-200"
          >
            <ApperIcon name="AlertTriangle" size={20} />
            <span className="font-medium">Weak Passwords</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center space-x-3 p-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-all duration-200"
          >
            <ApperIcon name="Copy" size={20} />
            <span className="font-medium">Duplicate Passwords</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default CategorySidebar;