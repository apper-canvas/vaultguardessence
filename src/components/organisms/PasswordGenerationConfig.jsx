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
                <div className="flex items-center justify-between mb-2">
                    <Label>Length</Label>
                    <span className="text-sm text-slate-400">{config.length} characters</span>
                </div>
                <Input
                    type="range"
                    min="4"
                    max="128"
                    value={config.length}
                    onChange={(e) => onConfigChange('length', parseInt(e.target.value))}
                    className="h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>4</span>
                    <span>128</span>
                </div>
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