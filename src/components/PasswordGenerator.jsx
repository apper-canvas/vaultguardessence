import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from './ApperIcon';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import { toast } from 'react-toastify';

const PasswordGenerator = ({ onClose, onUsePassword }) => {
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

  const handleUsePassword = () => {
    if (!generatedPassword) return;
    onUsePassword(generatedPassword);
  };

  const getStrengthText = (strength) => {
    if (strength < 25) return 'Very Weak';
    if (strength < 50) return 'Weak';
    if (strength < 75) return 'Good';
    return 'Strong';
  };

  const getStrengthColor = (strength) => {
    if (strength < 25) return 'text-error';
    if (strength < 50) return 'text-warning';
    if (strength < 75) return 'text-info';
    return 'text-success';
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div className="bg-surface rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto custom-scrollbar">
          {/* Header */}
          <div className="p-6 border-b border-slate-700 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-info to-primary rounded-lg flex items-center justify-center">
                <ApperIcon name="Key" size={20} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-slate-100">Password Generator</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <ApperIcon name="X" size={20} className="text-slate-400" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Generated Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Generated Password
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={generatedPassword}
                  readOnly
                  className="w-full px-3 py-3 pr-20 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 font-mono text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Configure options to generate password"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCopyPassword}
                    disabled={!generatedPassword}
                    className="p-2 hover:bg-slate-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Copy password"
                  >
                    <ApperIcon name="Copy" size={16} className="text-slate-400" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={generatePassword}
                    className="p-2 hover:bg-slate-600 rounded-lg transition-colors"
                    title="Generate new password"
                  >
                    <ApperIcon name="RefreshCw" size={16} className="text-slate-400" />
                  </motion.button>
                </div>
              </div>
              
              {/* Strength Meter */}
              {generatedPassword && (
                <div className="mt-3 space-y-2">
                  <PasswordStrengthMeter strength={strength} />
                  <div className="flex items-center justify-between text-sm">
                    <span className={`font-medium ${getStrengthColor(strength)}`}>
                      {getStrengthText(strength)}
                    </span>
                    <span className="text-slate-400">
                      {generatedPassword.length} characters
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Configuration */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-slate-100">Configuration</h3>
              
              {/* Length Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-slate-300">Length</label>
                  <span className="text-sm text-slate-400">{config.length} characters</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="128"
                  value={config.length}
                  onChange={(e) => handleConfigChange('length', parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>4</span>
                  <span>128</span>
                </div>
              </div>

              {/* Character Options */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-300">Uppercase Letters (A-Z)</label>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={config.uppercase}
                      onChange={(e) => handleConfigChange('uppercase', e.target.checked)}
                      className="sr-only"
                    />
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleConfigChange('uppercase', !config.uppercase)}
                      className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                        config.uppercase ? 'bg-primary' : 'bg-slate-600'
                      }`}
                    >
                      <motion.div
                        animate={{ x: config.uppercase ? 24 : 2 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        className="w-5 h-5 bg-white rounded-full shadow-md"
                      />
                    </motion.button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-300">Lowercase Letters (a-z)</label>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={config.lowercase}
                      onChange={(e) => handleConfigChange('lowercase', e.target.checked)}
                      className="sr-only"
                    />
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleConfigChange('lowercase', !config.lowercase)}
                      className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                        config.lowercase ? 'bg-primary' : 'bg-slate-600'
                      }`}
                    >
                      <motion.div
                        animate={{ x: config.lowercase ? 24 : 2 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        className="w-5 h-5 bg-white rounded-full shadow-md"
                      />
                    </motion.button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-300">Numbers (0-9)</label>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={config.numbers}
                      onChange={(e) => handleConfigChange('numbers', e.target.checked)}
                      className="sr-only"
                    />
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleConfigChange('numbers', !config.numbers)}
                      className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                        config.numbers ? 'bg-primary' : 'bg-slate-600'
                      }`}
                    >
                      <motion.div
                        animate={{ x: config.numbers ? 24 : 2 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        className="w-5 h-5 bg-white rounded-full shadow-md"
                      />
                    </motion.button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-300">Symbols (!@#$%^&*)</label>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={config.symbols}
                      onChange={(e) => handleConfigChange('symbols', e.target.checked)}
                      className="sr-only"
                    />
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleConfigChange('symbols', !config.symbols)}
                      className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                        config.symbols ? 'bg-primary' : 'bg-slate-600'
                      }`}
                    >
                      <motion.div
                        animate={{ x: config.symbols ? 24 : 2 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        className="w-5 h-5 bg-white rounded-full shadow-md"
                      />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-700">
              <button
                onClick={onClose}
                className="px-4 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleUsePassword}
                disabled={!generatedPassword}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <ApperIcon name="Check" size={16} />
                <span>Use Password</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default PasswordGenerator;