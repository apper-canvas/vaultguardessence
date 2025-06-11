import React, { useState } from 'react';
import Input from '@/components/atoms/Input';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const PasswordToggleInput = ({ value, onChange, placeholder, required = false, className = '' }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={`relative ${className}`}>
            <Input
                type={showPassword ? "text" : "password"}
                value={value}
                onChange={onChange}
                className="pr-10"
                placeholder={placeholder}
                required={required}
            />
            <Button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300 p-0 bg-transparent"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <ApperIcon name={showPassword ? "EyeOff" : "Eye"} size={16} />
            </Button>
        </div>
    );
};

export default PasswordToggleInput;