import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import CategorySidebarNavigation from '@/components/organisms/CategorySidebarNavigation';
import VaultSearchBar from '@/components/organisms/VaultSearchBar';
import CredentialListDisplay from '@/components/organisms/CredentialListDisplay';
import CredentialDetailModal from '@/components/organisms/CredentialDetailModal';
import PasswordGeneratorModal from '@/components/organisms/PasswordGeneratorModal';
import { credentialService } from '@/services';

const VaultPage = () => {
  const [credentials, setCredentials] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCredential, setSelectedCredential] = useState(null);
  const [showCredentialModal, setShowCredentialModal] = useState(false);
  const [showGeneratorModal, setShowGeneratorModal] = useState(false);
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
      setSelectedCredential(prev => ({ ...prev, password: password }));
    }
    setShowGeneratorModal(false);
    toast.success('Generated password ready to use');
  };

  return (
    <div className="h-full flex max-w-full overflow-hidden bg-background">
      {/* Category Sidebar */}
      <div className="w-64 bg-surface border-r border-slate-700 flex-shrink-0">
        <CategorySidebarNavigation
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
        <VaultSearchBar
          searchTerm={searchTerm}
          onSearchTermChange={(e) => setSearchTerm(e.target.value)}
          onAddCredential={handleAddCredential}
          onGeneratePassword={() => setShowGeneratorModal(true)}
        />

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <CredentialListDisplay
            credentials={filteredCredentials}
            loading={loading}
            error={error}
            onCredentialSelect={handleCredentialSelect}
            onCopyPassword={handleCopyPassword}
            onRetry={loadData}
          />
        </div>
      </div>

      <AnimatePresence>
        {showCredentialModal && (
          <CredentialDetailModal
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

      <AnimatePresence>
        {showGeneratorModal && (
          <PasswordGeneratorModal
            onClose={() => setShowGeneratorModal(false)}
            onUsePassword={handleUseGeneratedPassword}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default VaultPage;