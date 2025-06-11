import React, { useState } from 'react';
import ApperIcon from '@/components/ApperIcon';
import StrengthMeter from '@/components/molecules/StrengthMeter';
import DetailRow from '@/components/molecules/DetailRow';
import ActionButton from '@/components/molecules/ActionButton';
import Button from '@/components/atoms/Button';
import IconContainer from '@/components/atoms/IconContainer';

const CredentialDetailView = ({ credential, onCopyPassword }) => {
    const [showPassword, setShowPassword] = useState(false);

    if (!credential) return null;

    return (
        <div className="space-y-6 p-6">
            <div className="flex items-center space-x-4">
                <IconContainer iconName="Globe" iconSize={24} containerSize="md" gradientFrom="primary" gradientTo="info" />
                <div>
                    <h3 className="text-xl font-bold text-slate-100">{credential.title}</h3>
                    <p className="text-slate-400">{credential.username}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DetailRow label="Password">
                    <div className="flex items-center space-x-2">
                        <div className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 font-mono">
                            {showPassword ? credential.password : '••••••••••••'}
                        </div>
                        <Button
                            onClick={() => setShowPassword(!showPassword)}
                            className="p-2 hover:bg-slate-700 rounded-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <ApperIcon name={showPassword ? "EyeOff" : "Eye"} size={16} className="text-slate-400" />
                        </Button>
                        <ActionButton
                            icon="Copy"
                            onClick={() => onCopyPassword(credential.password)}
                            className="p-2 hover:bg-slate-700 rounded-lg bg-transparent"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="Copy password"
                        />
                    </div>
                    {credential.strength && (
                        <div className="mt-2">
                            <StrengthMeter strength={credential.strength} />
                        </div>
                    )}
                </DetailRow>

                {credential.url && (
                    <DetailRow label="Website">
                        <a
                            href={credential.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-primary hover:text-blue-400 transition-colors break-words"
                        >
                            <ApperIcon name="ExternalLink" size={16} />
                            <span>{credential.url}</span>
                        </a>
                    </DetailRow>
                )}
            </div>

            {credential.notes && (
                <DetailRow label="Notes">
                    <div className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 break-words">
                        {credential.notes}
                    </div>
                </DetailRow>
            )}

            <div className="flex items-center justify-between text-sm text-slate-400 pt-4 border-t border-slate-700">
                <span>Category: {credential.category}</span>
                <span>
                    Last used: {credential.lastUsed ? 
                        new Date(credential.lastUsed).toLocaleDateString() : 
                        'Never'
                    }
                </span>
            </div>
        </div>
    );
};

export default CredentialDetailView;