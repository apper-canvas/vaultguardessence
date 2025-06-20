// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Default settings data
const defaultSettings = {
  theme: 'Dark',
  defaultPasswordLength: 16,
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

// Settings configuration with types and constraints
const settingsConfig = {
  defaultPasswordLength: {
    type: 'number',
    min: 8,
    max: 64
  }
};

// Updated settings object with configuration
const settings = {
  ...defaultSettings,
  getConfig: (key) => settingsConfig[key] || { type: 'button' }
};

// Current settings (could be loaded from localStorage in real app)
let settings = { ...defaultSettings };

// Button action handlers
const buttonActions = {
  theme: async (currentTheme) => {
    await delay(200);
    // Toggle between Dark and Light themes
    const newTheme = currentTheme === 'Dark' ? 'Light' : 'Dark';
    
    // Apply theme to document root for Tailwind dark mode
    if (newTheme === 'Dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Update settings state
    settings.theme = newTheme;
    
    return { 
      success: true, 
      message: `Theme changed to ${newTheme} mode`,
      value: newTheme
    };
  },
  masterPassword: async () => {
    await delay(300);
    // Simulate password change flow
    return { success: true, message: 'Master password change initiated' };
  },
  twoFactorAuth: async () => {
    await delay(400);
    // Simulate 2FA setup
    return { success: true, message: 'Two-factor authentication setup initiated' };
  },
  biometricUnlock: async () => {
    await delay(350);
    // Simulate biometric setup
    return { success: true, message: 'Biometric unlock setup initiated' };
  },
  autoLock: async () => {
    await delay(250);
    // Simulate auto-lock configuration
    return { success: true, message: 'Auto-lock configuration opened' };
  },
  exportVault: async () => {
    await delay(500);
    // Simulate export process
    return { success: true, message: 'Vault export initiated - download will begin shortly' };
  },
  importData: async () => {
    await delay(400);
    // Simulate import dialog
    return { success: true, message: 'Data import dialog opened' };
  },
  backupSync: async () => {
    await delay(450);
    // Simulate backup sync setup
    return { success: true, message: 'Backup & sync setup initiated' };
  },
  deleteAllData: async () => {
    await delay(300);
    // Simulate dangerous action
    return { success: true, message: 'Data deletion confirmation required' };
  },
  notifications: async () => {
    await delay(200);
    // Simulate notification setup
    return { success: true, message: 'Notification settings opened' };
  }
};

export const settingsService = {
  // Get all settings
  async getAll() {
    await delay(200);
    return { ...settings };
  },

  // Update a setting value
  async update(key, value) {
    await delay(300);
    
    // Check if this is a button action
    if (buttonActions[key]) {
      const result = await buttonActions[key]();
      if (!result.success) {
        throw new Error(result.message || 'Action failed');
      }
      return { ...settings, actionResult: result.message };
    }
    
    // Regular setting update
    settings[key] = value;
    return { ...settings };
  },
// Get a specific setting
  async get(key) {
    await delay(100);
    return settings[key];
  },

  // Reset all settings to defaults
  async reset() {
    await delay(200);
    settings = { ...defaultSettings };
    return { ...settings };
  }
};