import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import PasswordGeneratorModal from '@/components/organisms/PasswordGeneratorModal';
import IconContainer from '@/components/atoms/IconContainer';
import ActionButton from '@/components/molecules/ActionButton';

const GeneratorPage = () => {
  const [showGenerator, setShowGenerator] = useState(true);

  return (
    <div className="min-h-full bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <IconContainer iconName="Key" iconSize={32} containerSize="lg" gradientFrom="info" gradientTo="primary" className="mx-auto mb-4" />
<h1 className="text-3xl font-bold text-white mb-2">Password Generator</h1>
          <p className="text-text-secondary">Create strong, unique passwords to protect your accounts</p>
        </motion.div>
        {showGenerator && (
          // PasswordGeneratorModal acts as a standalone component here,
          // but styled as a modal for consistency with its use in VaultPage.
          // We pass null for onClose so it doesn't try to dismiss itself from the page,
          // and manage its visibility with showGenerator state instead.
          <PasswordGeneratorModal
            onClose={() => setShowGenerator(false)} // This will be handled by the parent
            onUsePassword={(password) => {
              // Handle generated password usage, e.g., prompt user to save
              setShowGenerator(false);
            }}
          />
        )}

        {!showGenerator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <ActionButton
              icon="Key"
              text="Generate New Password"
              onClick={() => setShowGenerator(true)}
              className="px-6 py-3 bg-primary text-white hover:bg-blue-600 mx-auto"
              textClassName="text-white"
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GeneratorPage;