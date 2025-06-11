import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import ModalOverlay from '@/components/molecules/ModalOverlay';
import ModalWrapper from '@/components/molecules/ModalWrapper';
import ModalHeader from '@/components/molecules/ModalHeader';
import ActionButton from '@/components/molecules/ActionButton';
import CredentialForm from '@/components/organisms/CredentialForm';
import CredentialDetailView from '@/components/organisms/CredentialDetailView';
import DeleteConfirmDialog from '@/components/organisms/DeleteConfirmDialog';

const CredentialDetailModal = ({
    credential,
    categories,
    isEditing,
    onClose,
    onEdit,
    onSave,
    onDelete,
    onCopyPassword
}) => {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleConfirmDelete = () => {
        onDelete(credential.id);
        setShowDeleteConfirm(false);
    };

    return (
        <AnimatePresence>
            {showDeleteConfirm && (
                <DeleteConfirmDialog
                    title="Delete Credential"
                    message="Are you sure you want to delete"
                    itemToDeleteName={credential?.title}
                    onConfirm={handleConfirmDelete}
                    onCancel={() => setShowDeleteConfirm(false)}
                />
            )}
            <ModalOverlay onClick={onClose} />
            <ModalWrapper>
                <ModalHeader
                    title={credential ? (isEditing ? 'Edit Credential' : 'Credential Details') : 'Add Credential'}
                    onClose={onClose}
                >
                    {credential && !isEditing && (
                        <ActionButton
                            icon="Edit"
                            text="Edit"
                            onClick={onEdit}
                            className="bg-info text-white hover:bg-blue-600 text-sm"
                            iconSize={14}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        />
                    )}
                </ModalHeader>

                {isEditing ? (
                    <CredentialForm
                        initialData={credential}
                        categories={categories}
                        onSave={onSave}
                        onCancel={onClose}
                        onDelete={() => setShowDeleteConfirm(true)}
                        showDeleteButton={!!credential}
                    />
                ) : (
                    <CredentialDetailView credential={credential} onCopyPassword={onCopyPassword} />
                )}
            </ModalWrapper>
        </AnimatePresence>
    );
};

export default CredentialDetailModal;