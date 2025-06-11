import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';

const SettingItem = ({ 
    name, 
    description, 
    actionText, 
    settingKey, 
    settingType, 
    options, 
    min, 
    max, 
    isDanger, 
    transitionDelay, 
    onUpdate 
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(actionText);
    const [isLoading, setIsLoading] = useState(false);

    const handleEdit = () => {
        if (settingType === 'button') return;
        setIsEditing(true);
        setEditValue(actionText);
    };

    const handleSave = async () => {
        if (editValue === actionText) {
            setIsEditing(false);
            return;
        }

        setIsLoading(true);
        const success = await onUpdate(settingKey, editValue);
        setIsLoading(false);
        
        if (success) {
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditValue(actionText);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            handleCancel();
        }
    };

    const validateValue = (value) => {
        if (settingType === 'number') {
            const num = parseInt(value);
            return num >= (min || 1) && num <= (max || 999);
        }
        return true;
    };

    const renderEditControl = () => {
        if (settingType === 'select') {
            return (
<select
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="px-3 py-1 rounded-lg bg-slate-700 text-black border border-slate-600 focus:border-primary focus:outline-none min-w-[80px]"
                    autoFocus
                >
                    {options.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            );
        }

        if (settingType === 'number') {
            return (
<Input
                    type="number"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    min={min}
                    max={max}
                    className="px-3 py-1 rounded-lg bg-slate-700 text-black border border-slate-600 focus:border-primary focus:outline-none w-16 text-center"
                    autoFocus
                />
            );
        }

        return null;
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: transitionDelay }}
            className="flex items-center justify-between p-4 rounded-lg hover:bg-slate-700/50 transition-colors group"
        >
            <div className="flex-1">
                <h3 className="font-medium text-text-primary group-hover:text-slate-900 transition-colors">
                    {name}
                </h3>
                <p className="text-sm text-text-secondary mt-1">{description}</p>
            </div>
            
            <div className="flex items-center space-x-2">
                {isEditing ? (
                    <>
                        {renderEditControl()}
                        <Button
                            onClick={handleSave}
                            disabled={isLoading || !validateValue(editValue)}
                            className="px-3 py-1 text-sm rounded-lg bg-primary text-white hover:bg-green-600 disabled:opacity-50"
                        >
                            {isLoading ? 'Saving...' : 'Save'}
                        </Button>
<Button
                            onClick={handleCancel}
                            disabled={isLoading}
                            className="px-3 py-1 text-sm rounded-lg bg-slate-600 text-white hover:bg-slate-500"
                        >
                            Cancel
                        </Button>
                    </>
                ) : (
<Button
                        onClick={() => onUpdate(settingKey, actionText)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            isDanger
                                ? 'bg-error text-white hover:bg-red-600'
                                : settingType === 'button'
                                ? 'bg-slate-700 text-white hover:bg-slate-600'
                                : 'bg-slate-700 text-white hover:bg-slate-600 cursor-pointer'
                        }`}
                    >
                        {actionText}
                    </Button>
                )}
            </div>
        </motion.div>
    );
};
export default SettingItem;