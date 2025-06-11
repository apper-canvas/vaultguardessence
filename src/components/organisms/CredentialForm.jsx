import React, { useState, useEffect } from 'react';
import FormField from '@/components/molecules/FormField';
import PasswordToggleInput from '@/components/molecules/PasswordToggleInput';
import StrengthMeter from '@/components/molecules/StrengthMeter';
import Button from '@/components/atoms/Button';
import ActionButton from '@/components/molecules/ActionButton';
import { toast } from 'react-toastify';

const CredentialForm = ({ initialData, categories, onSave, onCancel, onDelete, showDeleteButton }) => {
    const [formData, setFormData] = useState({
        title: '',
        username: '',
        password: '',
        url: '',
        notes: '',
        category: 'Personal'
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                username: initialData.username || '',
                password: initialData.password || '',
                url: initialData.url || '',
                notes: initialData.notes || '',
                category: initialData.category || 'Personal'
            });
        } else {
            // Reset form for new credential
            setFormData({
                title: '',
                username: '',
                password: '',
                url: '',
                notes: '',
                category: 'Personal'
            });
        }
    }, [initialData]);

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
            lastUsed: initialData?.lastUsed || new Date().toISOString()
        };

        if (!initialData) {
            credentialData.createdAt = new Date().toISOString();
        }

        onSave(credentialData);
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
            <FormField
                label="Title"
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="e.g., Gmail, Facebook, Work Email"
                required
            />

            <FormField
                label="Username/Email"
                id="username"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                placeholder="username@example.com"
                required
            />

<FormField label="Password" id="password" required>
                <PasswordToggleInput
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Enter password"
                    required
                    maxLength="16"
                />
            </FormField>
            {formData.password && (
                <div className="mt-2">
                    <StrengthMeter strength={calculateStrength(formData.password)} />
                </div>
            )}

            <FormField
                label="Website URL"
                id="url"
                type="url"
                value={formData.url}
                onChange={(e) => handleInputChange('url', e.target.value)}
                placeholder="https://example.com"
            />

            <FormField
                label="Category"
                id="category"
                type="select"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
            >
                {categories.map(category => (
                    <option key={category.id} value={category.name}>
                        {category.name}
                    </option>
                ))}
            </FormField>

            <FormField
                label="Notes"
                id="notes"
                type="textarea"
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Additional notes..."
                rows={3}
            />

<div className="flex items-center justify-between pt-4">
                <div>
                    {showDeleteButton && (
                        <ActionButton
                            icon="Trash2"
                            text="Delete"
                            onClick={onDelete}
                            className="bg-error text-white hover:bg-red-600"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        />
                    )}
                </div>
                <div className="flex items-center space-x-3">
<Button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-200"
                    >
                        Cancel
                    </Button>
<Button
                        type="submit"
                        className="px-4 py-2 bg-primary text-black rounded-lg hover:bg-blue-600"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {initialData ? 'Update' : 'Save'}
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default CredentialForm;