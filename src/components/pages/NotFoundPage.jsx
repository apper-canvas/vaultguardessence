import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import IconContainer from '@/components/atoms/IconContainer';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-background flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <IconContainer iconName="AlertCircle" iconSize={48} containerSize="2xl" gradientFrom="error" gradientTo="warning" className="mx-auto mb-6" />
          <h1 className="text-6xl font-bold text-slate-100 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-slate-100 mb-2">Page Not Found</h2>
          <p className="text-slate-400 mb-8">
            The page you're looking for has been moved or doesn't exist. 
            Your vault remains secure and accessible.
          </p>
        </motion.div>

        <div className="space-y-4">
          <Button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/vault')}
            className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-600 font-medium flex items-center justify-center space-x-2"
          >
            <ApperIcon name="Shield" size={20} />
            <span>Go to Vault</span>
          </Button>
          
          <Button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="w-full px-6 py-3 bg-surface border border-slate-600 text-slate-100 rounded-lg hover:bg-slate-700 font-medium flex items-center justify-center space-x-2"
          >
            <ApperIcon name="ArrowLeft" size={20} />
            <span>Go Back</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;