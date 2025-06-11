import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import StrengthMeter from '@/components/molecules/StrengthMeter';
import Input from '@/components/atoms/Input';
import Label from '@/components/atoms/Label';
import Button from '@/components/atoms/Button';

const GeneratedPasswordDisplay = ({ password, strength, onCopy, onGenerate }) => {
    return (
        <div>
            <Label>Generated Password</Label>
            <div className="relative">
                <Input
                    type="text"
                    value={password}
                    readOnly
                    className="pr-20 font-mono text-lg"
                    placeholder="Configure options to generate password"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                    <Button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onCopy}
                        disabled={!password}
                        className="p-2 hover:bg-slate-600 rounded-lg bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Copy password"
                    >
                        <ApperIcon name="Copy" size={16} className="text-slate-400" />
                    </Button>
                    <Button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onGenerate}
                        className="p-2 hover:bg-slate-600 rounded-lg bg-transparent"
                        title="Generate new password"
                    >
                        <ApperIcon name="RefreshCw" size={16} className="text-slate-400" />
                    </Button>
                </div>
            </div>
            
            {password && (
                <div className="mt-3 space-y-2">
                    <StrengthMeter strength={strength} />
                    <div className="flex items-center justify-between text-sm">
                        <span className={`font-medium ${
                            strength < 25 ? 'text-error' :
                            strength < 50 ? 'text-warning' :
                            strength < 75 ? 'text-info' : 'text-success'
                        }`}>
                            {strength < 25 ? 'Very Weak' : strength < 50 ? 'Weak' : strength < 75 ? 'Good' : 'Strong'}
                        </span>
                        <span className="text-slate-400">
                            {password.length} characters
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GeneratedPasswordDisplay;