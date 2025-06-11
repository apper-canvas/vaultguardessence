import React from 'react';
import ModalOverlay from '@/components/molecules/ModalOverlay';
import ModalWrapper from '@/components/molecules/ModalWrapper';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const DeleteConfirmDialog = ({ title, message, itemToDeleteName, onConfirm, onCancel, zIndex = 'z-[60]' }) => {
    return (
        <>
            <ModalOverlay onClick={onCancel} zIndex={zIndex} />
            <ModalWrapper zIndex={parseInt(zIndex.replace('z-[', '').replace(']', '')) + 1} maxWidth="max-w-md">
                <div className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-error/20 rounded-lg flex items-center justify-center">
                            <ApperIcon name="AlertTriangle" size={20} className="text-error" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-100">{title}</h3>
                            <p className="text-slate-400">This action cannot be undone</p>
                        </div>
                    </div>
                    <p className="text-slate-300 mb-6">
                        {message} <strong>{itemToDeleteName}</strong>? This will permanently remove it.
                    </p>
                    <div className="flex items-center justify-end space-x-3">
                        <Button
                            onClick={onCancel}
                            className="px-4 py-2 text-slate-300 hover:bg-slate-700 rounded-lg"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={onConfirm}
                            className="px-4 py-2 bg-error text-white rounded-lg hover:bg-red-600"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </ModalWrapper>
        </>
    );
};

export default DeleteConfirmDialog;