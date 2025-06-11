import React from 'react';
import { motion } from 'framer-motion';
import CredentialCard from '@/components/molecules/CredentialCard';
import StatusMessage from '@/components/molecules/StatusMessage';

const CredentialListDisplay = ({ 
    credentials, 
    loading, 
    error, 
    onCredentialSelect, 
    onCopyPassword, 
    onRetry 
}) => {
    if (loading) {
        return (
            <div className="p-6 space-y-4">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-slate-800 rounded-lg p-4 border border-slate-700"
                    >
                        <div className="animate-pulse space-y-3">
                            <div className="h-5 bg-slate-700 rounded w-1/3"></div>
                            <div className="h-4 bg-slate-700 rounded w-1/2"></div>
                            <div className="h-3 bg-slate-700 rounded w-1/4"></div>
                        </div>
                    </motion.div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <StatusMessage
                type="error"
                message="Failed to load credentials"
                subMessage={error}
                onAction={onRetry}
                actionText="Try Again"
            />
        );
    }

    if (credentials.length === 0) {
        return (
            <StatusMessage
                type="empty"
                message="No credentials found"
                subMessage="Start securing your accounts by adding your first credential"
                actionText="Add Credential" // This button likely needs to trigger the add modal from parent
            />
        );
    }

    return (
        <div className="p-6 space-y-3">
            {credentials.map((credential, index) => (
                <CredentialCard
                    key={credential.id}
                    credential={credential}
                    index={index}
                    onSelect={onCredentialSelect}
                    onCopyPassword={onCopyPassword}
                />
            ))}
        </div>
    );
};

export default CredentialListDisplay;