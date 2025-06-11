import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import ModalOverlay from '@/components/molecules/ModalOverlay';
import ModalWrapper from '@/components/molecules/ModalWrapper';
import ModalHeader from '@/components/molecules/ModalHeader';
import PasswordGenerationConfig from '@/components/organisms/PasswordGenerationConfig';
import GeneratedPasswordDisplay from '@/components/organisms/GeneratedPasswordDisplay';
import ActionButton from '@/components/molecules/ActionButton';
import Button from '@/components/atoms/Button';
import IconContainer from '@/components/atoms/IconContainer';
import { toast } from 'react-toastify';

const PasswordGeneratorModal = ({ onClose, onUsePassword }) => {
    const [config, setConfig] = useState({
        length: 16,
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true
    });
    const [generatedPassword, setGeneratedPassword] = useState('');
    const [strength, setStrength] = useState(0);

    useEffect(() => {
        generatePassword();
    }, [config]);

    const calculateStrength = (password) => {
        if (!password) return 0;
        let score = 0;
        
        // Length bonus
        if (password.length >= 8) score += 25;
        if (password.length >= 12) score += 25;
        if (password.length >= 16) score += 25;
        
        // Character type bonuses
        if (/[a-z]/.test(password)) score += 5;
        if (/[A-Z]/.test(password)) score += 5;
        if (/[0-9]/.test(password)) score += 5;
        if (/[^A-Za-z0-9]/.test(password)) score += 10;
        
        return Math.min(score, 100);
    };

    const generatePassword = () => {
        let charset = '';
        
        if (config.lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (config.uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (config.numbers) charset += '0123456789';
        if (config.symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

        if (charset === '') {
            setGeneratedPassword('');
            setStrength(0);
            return;
        }

        let password = '';
        for (let i = 0; i < config.length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }

        setGeneratedPassword(password);
        setStrength(calculateStrength(password));
    };

    const handleConfigChange = (key, value) => {
        setConfig(prev => ({ ...prev, [key]: value }));
    };

    const handleCopyPassword = async () => {
        if (!generatedPassword) return;
        
        try {
            await navigator.clipboard.writeText(generatedPassword);
            toast.success('Password copied to clipboard');
        } catch (err) {
            toast.error('Failed to copy password');
        }
    };

return (
        <AnimatePresence>
            <ModalOverlay onClick={onClose} />
            <ModalWrapper maxWidth="max-w-xl">
                <div className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header with enhanced styling */}
                    <div className="relative bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm">
                        <ModalHeader 
                            title="Password Generator" 
                            onClose={onClose}
                            className="text-white font-semibold text-xl"
                        />
                    </div>
                    
                    {/* Main content with improved spacing and styling */}
                    <div className="p-8 space-y-8 bg-gradient-to-b from-slate-900/50 to-slate-800/30">
                        {/* Password display section */}
                        <div className="relative">
                            <GeneratedPasswordDisplay
                                password={generatedPassword}
                                strength={strength}
                                onCopy={handleCopyPassword}
                                onGenerate={generatePassword}
                            />
                        </div>

                        {/* Configuration section with enhanced separation */}
                        <div className="relative bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700/30">
                            <PasswordGenerationConfig
                                config={config}
                                onConfigChange={handleConfigChange}
                            />
                        </div>

                        {/* Action buttons with enhanced styling */}
                        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gradient-to-r from-slate-700/50 via-slate-600/30 to-slate-700/50">
                            <Button
                                onClick={onClose}
                                className="px-6 py-3 text-slate-300 hover:text-white bg-slate-700/50 hover:bg-slate-600/70 rounded-xl border border-slate-600/50 hover:border-slate-500/70 transition-all duration-200 font-medium backdrop-blur-sm"
                            >
                                Cancel
                            </Button>
                            <ActionButton
                                icon="Check"
                                text="Use Password"
                                onClick={() => onUsePassword(generatedPassword)}
                                disabled={!generatedPassword}
                                className="bg-gradient-to-r from-primary via-emerald-600 to-primary text-white hover:from-emerald-600 hover:via-primary hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-xl shadow-lg hover:shadow-xl font-semibold border border-emerald-500/50 hover:border-emerald-400/70 transition-all duration-200"
                                whileHover={{ scale: 1.02, y: -1 }}
                                whileTap={{ scale: 0.98 }}
                            />
                        </div>
                    </div>
                    
                    {/* Subtle decorative elements */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-600/40 to-transparent"></div>
                </div>
            </ModalWrapper>
        </AnimatePresence>
    );
};

export default PasswordGeneratorModal;