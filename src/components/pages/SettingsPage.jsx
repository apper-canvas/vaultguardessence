import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SettingsCategoryBlock from '@/components/organisms/SettingsCategoryBlock';
import AppSettingsInfo from '@/components/organisms/AppSettingsInfo';
import { settingsService } from '@/services';
import { toast } from 'react-toastify';

const SettingsPage = () => {
  const [settingsData, setSettingsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const data = await settingsService.getAll();
      setSettingsData(data);
      setError(null);
    } catch (err) {
      setError('Failed to load settings');
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

const handleSettingUpdate = async (settingKey, value) => {
    try {
      const updatedSettings = await settingsService.update(settingKey, value);
      setSettingsData(updatedSettings);
      
      // Show appropriate success message
      if (updatedSettings.actionResult) {
        toast.success(updatedSettings.actionResult);
      } else {
        toast.success('Setting updated successfully');
      }
      return true;
    } catch (err) {
      toast.error(err.message || 'Failed to update setting');
      return false;
    }
  };

  const settingsCategories = [
    {
      title: 'Security',
      icon: 'Shield',
      settings: [
        { 
          name: 'Master Password', 
          description: 'Change your master password', 
          action: settingsData.masterPassword || 'Change',
          key: 'masterPassword',
          type: 'button'
        },
        { 
          name: 'Two-Factor Authentication', 
          description: 'Add an extra layer of security', 
          action: settingsData.twoFactorAuth || 'Setup',
          key: 'twoFactorAuth',
          type: 'button'
        },
        { 
          name: 'Biometric Unlock', 
          description: 'Use fingerprint or face recognition', 
          action: settingsData.biometricUnlock || 'Enable',
          key: 'biometricUnlock',
          type: 'button'
        },
        { 
          name: 'Auto-Lock', 
          description: 'Automatically lock after inactivity', 
          action: settingsData.autoLock || 'Configure',
          key: 'autoLock',
          type: 'button'
        }
      ]
    },
    {
      title: 'Data',
      icon: 'Database',
      settings: [
        { 
          name: 'Export Vault', 
          description: 'Download your passwords as CSV', 
          action: settingsData.exportVault || 'Export',
          key: 'exportVault',
          type: 'button'
        },
        { 
          name: 'Import Data', 
          description: 'Import from other password managers', 
          action: settingsData.importData || 'Import',
          key: 'importData',
          type: 'button'
        },
        { 
          name: 'Backup & Sync', 
          description: 'Secure cloud synchronization', 
          action: settingsData.backupSync || 'Setup',
          key: 'backupSync',
          type: 'button'
        },
        { 
          name: 'Delete All Data', 
          description: 'Permanently remove all stored data', 
          action: settingsData.deleteAllData || 'Delete',
          key: 'deleteAllData',
          type: 'button',
          danger: true 
        }
      ]
    },
    {
      title: 'Preferences',
      icon: 'Settings',
      settings: [
        { 
          name: 'Theme', 
          description: 'Customize the app appearance', 
          action: settingsData.theme || 'Dark',
          key: 'theme',
          type: 'select',
          options: ['Dark', 'Light']
        },
        { 
          name: 'Default Password Length', 
          description: 'Set default for generator', 
          action: settingsData.defaultPasswordLength || '16',
          key: 'defaultPasswordLength',
          type: 'number',
          min: 8,
          max: 128
        },
        { 
          name: 'Clipboard Timeout', 
          description: 'Auto-clear copied passwords', 
          action: settingsData.clipboardTimeout || '30s',
          key: 'clipboardTimeout',
          type: 'select',
          options: ['15s', '30s', '60s', '2m', '5m', 'Never']
        },
        { 
          name: 'Notifications', 
          description: 'Security alerts and reminders', 
          action: settingsData.notifications || 'Enable',
          key: 'notifications',
          type: 'button'
        }
      ]
    }
  ];

  if (loading) {
    return (
      <div className="min-h-full bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <div className="text-text-secondary">Loading settings...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-full bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <div className="text-error">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Settings</h1>
          <p className="text-text-secondary">Manage your security preferences and vault configuration</p>
        </motion.div>

        <div className="space-y-8">
          {settingsCategories.map((category, categoryIndex) => (
            <SettingsCategoryBlock 
              key={category.title} 
              category={category} 
              categoryIndex={categoryIndex}
              onSettingUpdate={handleSettingUpdate}
            />
          ))}
        </div>

        <AppSettingsInfo />
      </div>
    </div>
  );
};

export default SettingsPage;