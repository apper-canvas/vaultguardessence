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
            className="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-all duration-200 cursor-pointer group"
            onClick={() => onSelect(credential)}
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
                            <StrengthMeter strength={credential.strength} size="sm" />
                            <span className="text-xs text-slate-500">
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
                        className="p-2 rounded-lg hover:bg-slate-700 transition-colors"
                        title="Copy password"
                    >
                        <ApperIcon name="Copy" size={16} className="text-slate-400" />
                    </Button>
                    <ApperIcon name="ChevronRight" size={16} className="text-slate-400" />
                </div>
            </div>
        </motion.div>
    );
};

export default CredentialCard;