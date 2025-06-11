import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '../components/ApperIcon';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: 'Shield',
      title: 'Secure Storage',
      description: 'Military-grade encryption protects your passwords'
    },
    {
      icon: 'Key',
      title: 'Password Generator',
      description: 'Generate strong, unique passwords instantly'
    },
    {
      icon: 'Copy',
      title: 'Auto-fill',
      description: 'Quick copy and secure clipboard management'
    },
    {
      icon: 'Eye',
      title: 'Breach Monitor',
      description: 'Get alerts when your accounts are compromised'
    }
  ];

  return (
    <div className="min-h-full bg-background">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-info rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ApperIcon name="Shield" size={40} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-100 mb-6">
            Your Password
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-info"> Fortress</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            VaultGuard secures your digital life with military-grade encryption, intelligent password generation, 
            and seamless autofill across all your devices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/vault')}
              className="px-8 py-4 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors font-medium text-lg flex items-center justify-center space-x-2"
            >
              <ApperIcon name="ArrowRight" size={20} />
              <span>Open Vault</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/generator')}
              className="px-8 py-4 bg-surface border border-slate-600 text-slate-100 rounded-lg hover:bg-slate-700 transition-colors font-medium text-lg flex items-center justify-center space-x-2"
            >
              <ApperIcon name="Key" size={20} />
              <span>Generate Password</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ y: -5 }}
              className="bg-surface p-6 rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-info rounded-lg flex items-center justify-center mb-4 mx-auto">
                <ApperIcon name={feature.icon} size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-100 mb-2">{feature.title}</h3>
              <p className="text-slate-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Security Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-surface rounded-xl p-8 border border-slate-700"
        >
          <h2 className="text-2xl font-bold text-slate-100 mb-8">Security at a Glance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-success mb-2">256-bit</div>
              <div className="text-slate-400">AES Encryption</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">Zero</div>
              <div className="text-slate-400">Knowledge Architecture</div>
            </div>
            <div className="text-3xl font-bold text-info mb-2 text-center">
              <div>24/7</div>
              <div className="text-slate-400">Breach Monitoring</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;