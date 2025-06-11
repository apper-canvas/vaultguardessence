import { motion } from 'framer-motion';

const PasswordStrengthMeter = ({ strength, size = 'md' }) => {
  const getStrengthColor = (strength) => {
    if (strength < 25) return 'bg-error';
    if (strength < 50) return 'bg-warning';
    if (strength < 75) return 'bg-info';
    return 'bg-success';
  };

  const getStrengthText = (strength) => {
    if (strength < 25) return 'Very Weak';
    if (strength < 50) return 'Weak';
    if (strength < 75) return 'Good';
    return 'Strong';
  };

  const height = size === 'sm' ? 'h-1' : 'h-2';
  const showText = size !== 'sm';

  return (
    <div className="space-y-1">
      <div className={`w-full bg-slate-700 rounded-full overflow-hidden ${height}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${strength}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`${height} ${getStrengthColor(strength)} rounded-full transition-colors duration-300`}
        />
      </div>
      {showText && (
        <div className="flex justify-between items-center">
          <span className={`text-xs font-medium ${
            strength < 25 ? 'text-error' :
            strength < 50 ? 'text-warning' :
            strength < 75 ? 'text-info' : 'text-success'
          }`}>
            {getStrengthText(strength)}
          </span>
          <span className="text-xs text-slate-400">{strength}%</span>
        </div>
      )}
    </div>
  );
};

export default PasswordStrengthMeter;