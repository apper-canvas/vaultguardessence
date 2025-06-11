import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from './ApperIcon';
import CredentialList from './CredentialList';
import CredentialModal from './CredentialModal';
import PasswordGenerator from './PasswordGenerator';
import CategorySidebar from './CategorySidebar';
import { credentialService } from '../services';

const MainFeature = () => {
  const [credentials, setCredentials] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCredential, setSelectedCredential] = useState(null);
  const [showCredentialModal, setShowCredentialModal] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [credentialsData, categoriesData] = await Promise.all([
        credentialService.getAll(),
        credentialService.getCategories()
      ]);
      setCredentials(credentialsData);
      setCategories(categoriesData);
    } catch (err) {
      setError(err.message || 'Failed to load data');
      toast.error('Failed to load vault data');
    } finally {
      setLoading(false);
    }
  };

  const filteredCredentials = credentials.filter(credential => {
    const matchesSearch = credential.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         credential.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         credential.url.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || credential.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCredentialSelect = (credential) => {
    setSelectedCredential(credential);
    setShowCredentialModal(true);
    setIsEditing(false);
  };

  const handleAddCredential = () => {
    setSelectedCredential(null);
    setShowCredentialModal(true);
    setIsEditing(true);
  };

  const handleEditCredential = () => {
    setIsEditing(true);
  };

  const handleSaveCredential = async (credentialData) => {
    try {
      let savedCredential;
      if (selectedCredential) {
        savedCredential = await credentialService.update(selectedCredential.id, credentialData);
        setCredentials(prev => prev.map(c => c.id === selectedCredential.id ? savedCredential : c));
        toast.success('Credential updated successfully');
      } else {
        savedCredential = await credentialService.create(credentialData);
        setCredentials(prev => [...prev, savedCredential]);
        toast.success('Credential added successfully');
      }
      setShowCredentialModal(false);
      setSelectedCredential(null);
      setIsEditing(false);
    } catch (err) {
      toast.error('Failed to save credential');
    }
  };

  const handleDeleteCredential = async (id) => {
    try {
      await credentialService.delete(id);
      setCredentials(prev => prev.filter(c => c.id !== id));
      setShowCredentialModal(false);
      setSelectedCredential(null);
      toast.success('Credential deleted successfully');
    } catch (err) {
      toast.error('Failed to delete credential');
    }
  };

  const handleCopyPassword = async (password) => {
    try {
      await navigator.clipboard.writeText(password);
      toast.success('Password copied to clipboard');
      
      // Clear clipboard after 30 seconds for security
      setTimeout(async () => {
        try {
          await navigator.clipboard.writeText('');
        } catch (err) {
          // Clipboard clearing failed, but this is non-critical
        }
      }, 30000);
    } catch (err) {
      toast.error('Failed to copy password');
    }
  };

  const handleUseGeneratedPassword = (password) => {
    if (showCredentialModal) {
      // If credential modal is open, use the password there
      setSelectedCredential(prev => prev ? { ...prev, password } : { password });
    }
    setShowGenerator(false);
    toast.success('Generated password ready to use');
  };

  return (
    <div className="h-full flex max-w-full overflow-hidden bg-background">
      {/* Category Sidebar */}
      <div className="w-64 bg-surface border-r border-slate-700 flex-shrink-0">
        <CategorySidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          credentialCounts={credentials.reduce((acc, cred) => {
            acc[cred.category] = (acc[cred.category] || 0) + 1;
            return acc;
          }, {})}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Search Header */}
        <div className="flex-shrink-0 p-6 bg-surface border-b border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-slate-100">Password Vault</h2>
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowGenerator(true)}
                className="px-4 py-2 bg-info text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
              >
                <ApperIcon name="Key" size={16} />
                <span>Generate</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddCredential}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
              >
                <ApperIcon name="Plus" size={16} />
                <span>Add</span>
              </motion.button>
            </div>
          </div>
          
          <div className="relative">
            <ApperIcon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search credentials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Credentials List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <CredentialList
            credentials={filteredCredentials}
            loading={loading}
            error={error}
            onCredentialSelect={handleCredentialSelect}
            onCopyPassword={handleCopyPassword}
            onRetry={loadData}
          />
        </div>
      </div>

      {/* Credential Modal */}
      <AnimatePresence>
        {showCredentialModal && (
          <CredentialModal
            credential={selectedCredential}
            categories={categories}
            isEditing={isEditing}
            onClose={() => {
              setShowCredentialModal(false);
              setSelectedCredential(null);
              setIsEditing(false);
            }}
            onEdit={handleEditCredential}
            onSave={handleSaveCredential}
            onDelete={handleDeleteCredential}
            onCopyPassword={handleCopyPassword}
          />
        )}
      </AnimatePresence>

      {/* Password Generator Modal */}
      <AnimatePresence>
        {showGenerator && (
          <PasswordGenerator
            onClose={() => setShowGenerator(false)}
            onUsePassword={handleUseGeneratedPassword}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainFeature;