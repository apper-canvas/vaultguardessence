import { motion } from 'framer-motion';
import ApperIcon from './ApperIcon';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import { formatDistanceToNow } from 'date-fns';

const CredentialList = ({ 
  credentials, 
  loading, 
  error, 
  onCredentialSelect, 
  onCopyPassword, 
  onRetry 
}) => {
  if (loading) {
    return (
      <div className="p-6 space-y-4">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-slate-800 rounded-lg p-4 border border-slate-700"
          >
            <div className="animate-pulse space-y-3">
              <div className="h-5 bg-slate-700 rounded w-1/3"></div>
              <div className="h-4 bg-slate-700 rounded w-1/2"></div>
              <div className="h-3 bg-slate-700 rounded w-1/4"></div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <ApperIcon name="AlertCircle" size={48} className="text-error mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-100 mb-2">Failed to load credentials</h3>
          <p className="text-slate-400 mb-4">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRetry}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </motion.button>
        </div>
      </div>
    );
  }

  if (credentials.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="mb-4"
          >
            <ApperIcon name="Shield" size={48} className="text-slate-400 mx-auto" />
          </motion.div>
          <h3 className="text-lg font-medium text-slate-100 mb-2">No credentials found</h3>
          <p className="text-slate-400 mb-4">Start securing your accounts by adding your first credential</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add Credential
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-3">
      {credentials.map((credential, index) => (
        <motion.div
          key={credential.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-all duration-200 cursor-pointer group"
          onClick={() => onCredentialSelect(credential)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-info rounded-lg flex items-center justify-center flex-shrink-0">
                <ApperIcon name="Globe" size={20} className="text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-slate-100 truncate">{credential.title}</h3>
                <p className="text-sm text-slate-400 truncate">{credential.username}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <PasswordStrengthMeter strength={credential.strength} size="sm" />
                  <span className="text-xs text-slate-500">
                    Last used {formatDistanceToNow(new Date(credential.lastUsed), { addSuffix: true })}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onCopyPassword(credential.password);
                }}
                className="p-2 rounded-lg hover:bg-slate-700 transition-colors"
                title="Copy password"
              >
                <ApperIcon name="Copy" size={16} className="text-slate-400" />
              </motion.button>
              <ApperIcon name="ChevronRight" size={16} className="text-slate-400" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CredentialList;