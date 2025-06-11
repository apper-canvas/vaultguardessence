import { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '../components/ApperIcon';
import PasswordGenerator from '../components/PasswordGenerator';

const Generator = () => {
  const [showGenerator, setShowGenerator] = useState(true);

  return (
    <div className="min-h-full bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-info to-primary rounded-xl flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="Key" size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Password Generator</h1>
          <p className="text-slate-400">Create strong, unique passwords to protect your accounts</p>
        </motion.div>

        {showGenerator && (
          <PasswordGenerator
            onClose={() => setShowGenerator(false)}
            onUsePassword={(password) => {
              // Handle generated password usage
              setShowGenerator(false);
            }}
          />
        )}

        {!showGenerator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowGenerator(true)}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2 mx-auto"
            >
              <ApperIcon name="Key" size={20} />
              <span>Generate New Password</span>
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Generator;