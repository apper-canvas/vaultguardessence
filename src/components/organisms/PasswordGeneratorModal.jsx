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
        
        // Length bonus - adjusted for 16 character maximum
        if (password.length >= 8) score += 25;
        if (password.length >= 12) score += 35;
        if (password.length >= 14) score += 25;
        if (password.length >= 16) score += 15;
        
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
<AnimatePresence mode="wait">
            <ModalOverlay key="overlay" onClick={onClose} />
            <ModalWrapper key="modal" maxWidth="max-w-xl">
                <div 
                    className="relative bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="password-generator-title"
                >
                    {/* Header with clean styling */}
                    <div className="relative bg-gray-50 border-b border-gray-100">
                        <ModalHeader 
                            id="password-generator-title"
                            title="Password Generator" 
                            onClose={onClose}
                            className="text-gray-900 font-semibold text-xl"
                        />
                    </div>
                    
                    {/* Main content with clean spacing and styling */}
                    <div className="p-8 space-y-8 bg-white">
                        {/* Password display section */}
                        <div className="relative">
                            <GeneratedPasswordDisplay
                                password={generatedPassword || ''}
                                strength={strength || { score: 0, feedback: [] }}
                                onCopy={handleCopyPassword}
                                onGenerate={generatePassword}
                            />
                        </div>

                        {/* Configuration section with clean separation */}
                        <div className="relative bg-gray-50 rounded-xl p-6 border border-gray-100">
                            <PasswordGenerationConfig
                                config={config || {}}
                                onConfigChange={handleConfigChange}
                            />
                        </div>

                        {/* Action buttons with clean styling */}
<div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-100">
                            <Button
                                onClick={onClose}
                                className="px-6 py-3 bg-white hover:bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 font-medium"
                                aria-label="Cancel password generation"
                            >
                                Cancel
                            </Button>
                            <ActionButton
                                icon="Check"
                                text="Use Password"
                                onClick={() => onUsePassword?.(generatedPassword)}
                                disabled={!generatedPassword}
                                className="bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-xl shadow-md hover:shadow-lg font-semibold border border-primary/20 hover:border-primary/30 transition-all duration-200"
                                whileHover={{ scale: 1.02, y: -1 }}
                                whileTap={{ scale: 0.98 }}
                                aria-label="Use generated password"
                            />
                        </div>
                    </div>
                    
                    {/* Subtle decorative elements */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" aria-hidden="true"></div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-200/60 to-transparent" aria-hidden="true"></div>
                </div>
            </ModalWrapper>
        </AnimatePresence>
    );
};

export default PasswordGeneratorModal;