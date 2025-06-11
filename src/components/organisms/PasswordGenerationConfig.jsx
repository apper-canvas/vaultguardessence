import React from 'react';
import ToggleSwitch from '@/components/atoms/ToggleSwitch';
import Input from '@/components/atoms/Input';
import Label from '@/components/atoms/Label';

const PasswordGenerationConfig = ({ config, onConfigChange }) => {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium text-slate-100">Configuration</h3>
            
            {/* Length Slider */}
<div>
                <div className="flex items-center justify-between mb-3">
                    <Label>Password Length</Label>
                    <div className="flex items-center gap-2">
                        <span className={`text-lg font-bold ${
                            config.length < 8 ? 'text-red-400' :
                            config.length < 12 ? 'text-orange-400' :
                            config.length < 14 ? 'text-yellow-400' :
                            config.length < 16 ? 'text-green-400' :
                            'text-emerald-400'
                        }`}>
                            {config.length}
                        </span>
                        <span className="text-sm text-slate-400">characters</span>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                            config.length < 8 ? 'bg-red-900/30 text-red-400' :
                            config.length < 12 ? 'bg-orange-900/30 text-orange-400' :
                            config.length < 14 ? 'bg-yellow-900/30 text-yellow-400' :
                            config.length < 16 ? 'bg-green-900/30 text-green-400' :
                            'bg-emerald-900/30 text-emerald-400'
                        }`}>
                            {config.length < 8 ? 'Weak' :
                             config.length < 12 ? 'Fair' :
                             config.length < 14 ? 'Good' :
                             config.length < 16 ? 'Strong' :
                             'Very Strong'}
                        </span>
                    </div>
                </div>
                <Input
                    type="range"
                    min="4"
                    max="16"
                    value={config.length}
                    onChange={(e) => onConfigChange('length', parseInt(e.target.value))}
                    className="h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer slider mb-2"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                    <div className="flex flex-col items-start">
                        <span className="text-red-400">4</span>
                        <span className="text-red-400 text-[10px] mt-0.5">Weak</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-orange-400">8</span>
                        <span className="text-orange-400 text-[10px] mt-0.5">Fair</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-yellow-400">12</span>
                        <span className="text-yellow-400 text-[10px] mt-0.5">Good</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-green-400">14</span>
                        <span className="text-green-400 text-[10px] mt-0.5">Strong</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-emerald-400">16</span>
                        <span className="text-emerald-400 text-[10px] mt-0.5">Max</span>
                    </div>
                </div>
                <p className="text-xs text-slate-500 mt-3 text-center">
                    {config.length < 8 ? 'Consider using at least 8 characters for better security' :
                     config.length < 12 ? 'Good start! 12+ characters recommended for strong security' :
                     config.length < 14 ? 'Great choice! Your passwords will be quite secure' :
                     config.length < 16 ? 'Excellent! Very secure password length' :
                     'Outstanding! Maximum security password length'}
                </p>
            </div>

            {/* Character Options */}
            <div className="space-y-3">
                <ToggleSwitch
                    label="Uppercase Letters (A-Z)"
                    checked={config.uppercase}
                    onChange={(val) => onConfigChange('uppercase', val)}
                />
                <ToggleSwitch
                    label="Lowercase Letters (a-z)"
                    checked={config.lowercase}
                    onChange={(val) => onConfigChange('lowercase', val)}
                />
                <ToggleSwitch
                    label="Numbers (0-9)"
                    checked={config.numbers}
                    onChange={(val) => onConfigChange('numbers', val)}
                />
                <ToggleSwitch
                    label="Symbols (!@#$%^&*)"
                    checked={config.symbols}
                    onChange={(val) => onConfigChange('symbols', val)}
                />
            </div>
        </div>
    );
};

export default PasswordGenerationConfig;