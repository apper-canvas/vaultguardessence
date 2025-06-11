import React from 'react';
import { motion } from 'framer-motion';
import SettingItem from '@/components/molecules/SettingItem';
import IconContainer from '@/components/atoms/IconContainer';

const SettingsCategoryBlock = ({ category, categoryIndex }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
            className="bg-surface rounded-xl border border-slate-700"
        >
            <div className="p-6 border-b border-slate-700">
                <div className="flex items-center space-x-3">
                    <IconContainer iconName={category.icon} iconSize={20} containerSize="w-10 h-10" gradientFrom="primary" gradientTo="info" />
                    <h2 className="text-xl font-bold text-slate-100">{category.title}</h2>
                </div>
            </div>
            
            <div className="p-6 space-y-4">
                {category.settings.map((setting, settingIndex) => (
                    <SettingItem
                        key={setting.name}
                        name={setting.name}
                        description={setting.description}
                        actionText={setting.action}
                        isDanger={setting.danger}
                        transitionDelay={(categoryIndex * 0.1) + (settingIndex * 0.05)}
                    />
                ))}
            </div>
        </motion.div>
    );
};

export default SettingsCategoryBlock;