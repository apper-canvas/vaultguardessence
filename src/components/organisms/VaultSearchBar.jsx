import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import Input from '@/components/atoms/Input';
import ActionButton from '@/components/molecules/ActionButton';

const VaultSearchBar = ({ searchTerm, onSearchTermChange, onAddCredential, onGeneratePassword }) => {
    return (
<div className="flex-shrink-0 p-6 bg-white border-b border-slate-200">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-slate-900">Password Vault</h2>
                <div className="flex items-center space-x-2">
                    <ActionButton
                        icon="Key"
                        text="Generate"
                        onClick={onGeneratePassword}
                        className="bg-info text-white hover:bg-blue-600"
                    />
                    <ActionButton
                        icon="Plus"
                        text="Add"
                        onClick={onAddCredential}
                        className="bg-primary text-white hover:bg-blue-600"
                    />
                </div>
            </div>
            
            <div className="relative">
<ApperIcon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-600" />
                <Input
                    type="text"
                    placeholder="Search credentials..."
                    value={searchTerm}
                    onChange={onSearchTermChange}
                    className="pl-10 pr-4"
                />
            </div>
        </div>
    );
};

export default VaultSearchBar;