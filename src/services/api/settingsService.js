// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Default settings data
const defaultSettings = {
  theme: 'Dark',
  defaultPasswordLength: '16',
  clipboardTimeout: '30s',
  masterPassword: 'Change',
  twoFactorAuth: 'Setup',
  biometricUnlock: 'Enable',
  autoLock: 'Configure',
  exportVault: 'Export',
  importData: 'Import',
  backupSync: 'Setup',
  deleteAllData: 'Delete',
  notifications: 'Enable'
};

// In-memory storage for demo purposes
let settings = { ...defaultSettings };

const settingsService = {
  async getAll() {
    await delay(200);
    return { ...settings };
  },

  async update(settingKey, value) {
    await delay(300);
    if (!settings.hasOwnProperty(settingKey)) {
      throw new Error(`Setting '${settingKey}' not found`);
    }
    
    settings[settingKey] = value;
    return { ...settings };
  },

  async reset() {
    await delay(200);
    settings = { ...defaultSettings };
    return { ...settings };
  }
};

export default settingsService;