import { motion } from 'framer-motion';
import ApperIcon from '../components/ApperIcon';

const Settings = () => {
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
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="bg-surface rounded-xl border border-slate-700"
            >
              <div className="p-6 border-b border-slate-700">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-info rounded-lg flex items-center justify-center">
                    <ApperIcon name={category.icon} size={20} className="text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-100">{category.title}</h2>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                {category.settings.map((setting, settingIndex) => (
                  <motion.div
                    key={setting.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (categoryIndex * 0.1) + (settingIndex * 0.05) }}
                    className="flex items-center justify-between p-4 rounded-lg hover:bg-slate-700/50 transition-colors group"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-slate-100 group-hover:text-white transition-colors">
                        {setting.name}
                      </h3>
                      <p className="text-sm text-slate-400 mt-1">{setting.description}</p>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        setting.danger
                          ? 'bg-error text-white hover:bg-red-600'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      {setting.action}
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* App Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center text-slate-500"
        >
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-6 h-6 bg-gradient-to-br from-primary to-info rounded flex items-center justify-center">
              <ApperIcon name="Shield" size={12} className="text-white" />
            </div>
            <span className="font-medium">VaultGuard</span>
          </div>
          <p className="text-sm">Version 1.0.0 • Your passwords are encrypted and secure</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;