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
            <ModalWrapper maxWidth="max-w-lg">
                <ModalHeader title="Password Generator" onClose={onClose} />
                <div className="p-6 space-y-6">
                    <GeneratedPasswordDisplay
                        password={generatedPassword}
                        strength={strength}
                        onCopy={handleCopyPassword}
                        onGenerate={generatePassword}
                    />

                    <PasswordGenerationConfig
                        config={config}
                        onConfigChange={handleConfigChange}
                    />

                    <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-700">
                        <Button
                            onClick={onClose}
                            className="px-4 py-2 text-slate-300 hover:bg-slate-700 rounded-lg"
                        >
                            Cancel
                        </Button>
                        <ActionButton
                            icon="Check"
                            text="Use Password"
                            onClick={() => onUsePassword(generatedPassword)}
                            disabled={!generatedPassword}
                            className="bg-primary text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        />
                    </div>
                </div>
            </ModalWrapper>
        </AnimatePresence>
    );
};

export default PasswordGeneratorModal;