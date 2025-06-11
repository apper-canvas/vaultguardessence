import React from 'react';
import { motion } from 'framer-motion';
import SettingsCategoryBlock from '@/components/organisms/SettingsCategoryBlock';
import AppSettingsInfo from '@/components/organisms/AppSettingsInfo';

const SettingsPage = () => {
  const settingsCategories = [
    {
      title: 'Security',
      icon: 'Shield',
      settings: [
        { name: 'Master Password', description: 'Change your master password', action: 'Change' },
        { name: 'Two-Factor Authentication', description: 'Add an extra layer of security', action: 'Setup' },
        { name: 'Biometric Unlock', description: 'Use fingerprint or face recognition', action: 'Enable' },
        { name: 'Auto-Lock', description: 'Automatically lock after inactivity', action: 'Configure' }
      ]
    },
    {
      title: 'Data',
      icon: 'Database',
      settings: [
        { name: 'Export Vault', description: 'Download your passwords as CSV', action: 'Export' },
        { name: 'Import Data', description: 'Import from other password managers', action: 'Import' },
        { name: 'Backup & Sync', description: 'Secure cloud synchronization', action: 'Setup' },
        { name: 'Delete All Data', description: 'Permanently remove all stored data', action: 'Delete', danger: true }
      ]
    },
    {
      title: 'Preferences',
      icon: 'Settings',
      settings: [
        { name: 'Theme', description: 'Customize the app appearance', action: 'Dark' },
        { name: 'Default Password Length', description: 'Set default for generator', action: '16' },
        { name: 'Clipboard Timeout', description: 'Auto-clear copied passwords', action: '30s' },
        { name: 'Notifications', description: 'Security alerts and reminders', action: 'Enable' }
      ]
    }
  ];

  return (
    <div className="min-h-full bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Settings</h1>
          <p className="text-slate-400">Manage your security preferences and vault configuration</p>
        </motion.div>

        <div className="space-y-8">
          {settingsCategories.map((category, categoryIndex) => (
            <SettingsCategoryBlock 
              key={category.title} 
              category={category} 
              categoryIndex={categoryIndex} 
            />
          ))}
        </div>

        <AppSettingsInfo />
      </div>
    </div>
  );
};

export default SettingsPage;