import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from './ApperIcon';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import { toast } from 'react-toastify';

const CredentialModal = ({
  credential,
  categories,
  isEditing,
  onClose,
  onEdit,
  onSave,
  onDelete,
  onCopyPassword
}) => {
  const [formData, setFormData] = useState({
    title: '',
    username: '',
    password: '',
    url: '',
    notes: '',
    category: 'Personal'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (credential) {
      setFormData({
        title: credential.title || '',
        username: credential.username || '',
        password: credential.password || '',
        url: credential.url || '',
        notes: credential.notes || '',
        category: credential.category || 'Personal'
      });
    }
  }, [credential]);

  const calculateStrength = (password) => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score += 25;
    if (password.length >= 12) score += 25;
    if (/[a-z]/.test(password)) score += 10;
    if (/[A-Z]/.test(password)) score += 10;
    if (/[0-9]/.test(password)) score += 10;
    if (/[^A-Za-z0-9]/.test(password)) score += 20;
    return Math.min(score, 100);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.username || !formData.password) {
      toast.error('Please fill in all required fields');
      return;
    }

    const credentialData = {
      ...formData,
      strength: calculateStrength(formData.password),
      updatedAt: new Date().toISOString(),
      lastUsed: credential?.lastUsed || new Date().toISOString()
    };

    if (!credential) {
      credentialData.createdAt = new Date().toISOString();
    }

    onSave(credentialData);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
        <div className="bg-surface rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar">
          {/* Header */}
          <div className="sticky top-0 bg-surface border-b border-slate-700 p-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-100">
              {credential ? (isEditing ? 'Edit Credential' : 'Credential Details') : 'Add Credential'}
            </h2>
            <div className="flex items-center space-x-2">
              {credential && !isEditing && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onEdit}
                  className="px-3 py-1.5 bg-info text-white rounded-lg hover:bg-blue-600 transition-colors text-sm flex items-center space-x-1"
                >
                  <ApperIcon name="Edit" size={14} />
                  <span>Edit</span>
                </motion.button>
              )}
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <ApperIcon name="X" size={20} className="text-slate-400" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g., Gmail, Facebook, Work Email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Username/Email *
                  </label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="username@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="w-full px-3 py-2 pr-10 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                    >
                      <ApperIcon name={showPassword ? "EyeOff" : "Eye"} size={16} />
                    </button>
                  </div>
                  {formData.password && (
                    <div className="mt-2">
                      <PasswordStrengthMeter strength={calculateStrength(formData.password)} />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Website URL
                  </label>
                  <input
                    type="url"
                    value={formData.url}
                    onChange={(e) => handleInputChange('url', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="https://example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Notes
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    placeholder="Additional notes..."
                  />
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div>
                    {credential && (
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowDeleteConfirm(true)}
                        className="px-4 py-2 bg-error text-white rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
                      >
                        <ApperIcon name="Trash2" size={16} />
                        <span>Delete</span>
                      </motion.button>
                    )}
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      {credential ? 'Update' : 'Save'}
                    </motion.button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-info rounded-lg flex items-center justify-center">
                    <ApperIcon name="Globe" size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-100">{credential?.title}</h3>
                    <p className="text-slate-400">{credential?.username}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 font-mono">
                        {showPassword ? credential?.password : '••••••••••••'}
                      </div>
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        <ApperIcon name={showPassword ? "EyeOff" : "Eye"} size={16} className="text-slate-400" />
                      </button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onCopyPassword(credential?.password)}
                        className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        <ApperIcon name="Copy" size={16} className="text-slate-400" />
                      </motion.button>
                    </div>
                    {credential?.strength && (
                      <div className="mt-2">
                        <PasswordStrengthMeter strength={credential.strength} />
                      </div>
                    )}
                  </div>

                  {credential?.url && (
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Website</label>
                      <a
                        href={credential.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-primary hover:text-blue-400 transition-colors break-words"
                      >
                        <ApperIcon name="ExternalLink" size={16} />
                        <span>{credential.url}</span>
                      </a>
                    </div>
                  )}
                </div>

                {credential?.notes && (
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Notes</label>
                    <div className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 break-words">
                      {credential.notes}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm text-slate-400 pt-4 border-t border-slate-700">
                  <span>Category: {credential?.category}</span>
                  <span>
                    Last used: {credential?.lastUsed ? 
                      new Date(credential.lastUsed).toLocaleDateString() : 
                      'Never'
                    }
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 z-[60]"
            onClick={() => setShowDeleteConfirm(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          >
            <div className="bg-surface rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-error/20 rounded-lg flex items-center justify-center">
                  <ApperIcon name="AlertTriangle" size={20} className="text-error" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-100">Delete Credential</h3>
                  <p className="text-slate-400">This action cannot be undone</p>
                </div>
              </div>
              <p className="text-slate-300 mb-6">
                Are you sure you want to delete <strong>{credential?.title}</strong>? 
                This will permanently remove the credential from your vault.
              </p>
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    onDelete(credential.id);
                    setShowDeleteConfirm(false);
                  }}
                  className="px-4 py-2 bg-error text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
};

export default CredentialModal;