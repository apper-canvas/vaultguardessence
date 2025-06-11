import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import StrengthMeter from '@/components/molecules/StrengthMeter';
import Button from '@/components/atoms/Button';
import { formatDistanceToNow } from 'date-fns';

const CredentialCard = ({ credential, index, onSelect, onCopyPassword }) => {
    return (
        <motion.div
            key={credential.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
className="bg-white rounded-lg p-4 border border-surface-300 hover:border-surface-400 transition-all duration-200 cursor-pointer group shadow-sm hover:shadow-md"
            onClick={() => onSelect(credential)}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 min-w-0 flex-1">
<div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <ApperIcon name="Globe" size={20} className="text-black" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <h3 className="font-medium text-text-primary truncate">{credential.title}</h3>
                        <p className="text-sm text-text-secondary truncate">{credential.username}</p>
                        <div className="flex items-center space-x-2 mt-1">
                            <StrengthMeter strength={credential.strength} size="sm" />
                            <span className="text-xs text-text-muted">
                                Last used {formatDistanceToNow(new Date(credential.lastUsed), { addSuffix: true })}
                            </span>
                        </div>
                    </div>
                </div>
                
                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            onCopyPassword(credential.password);
                        }}
                        className="p-2 rounded-lg hover:bg-surface-100 transition-colors"
                        title="Copy password"
                    >
                        <ApperIcon name="Copy" size={16} className="text-text-secondary" />
                    </Button>
                    <ApperIcon name="ChevronRight" size={16} className="text-text-muted" />
                </div>
            </div>
        </motion.div>
    );
};

export default CredentialCard;