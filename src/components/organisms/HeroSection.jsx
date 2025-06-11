import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import ActionButton from '@/components/molecules/ActionButton';
import IconContainer from '@/components/atoms/IconContainer';

const HeroSection = ({ onOpenVault, onGeneratePassword }) => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
            >
<IconContainer iconName="Shield" iconSize={40} containerSize="xl" gradientFrom="primary" gradientTo="info" className="mx-auto mb-6" />
                <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
                    Your Password
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-info"> Fortress</span>
                </h1>
                <p className="text-xl text-slate-700 max-w-3xl mx-auto mb-8">
                    VaultGuard secures your digital life with military-grade encryption, intelligent password generation, 
                    and seamless autofill across all your devices.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <ActionButton
                        icon="ArrowRight"
                        text="Open Vault"
                        onClick={onOpenVault}
                        className="bg-primary text-white hover:bg-blue-600 text-lg"
                    />
                    <ActionButton
                        icon="Key"
                        text="Generate Password"
onClick={onGeneratePassword}
                        className="bg-surface border border-slate-600 text-slate-800 hover:bg-slate-700 hover:text-slate-100 text-lg"
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default HeroSection;