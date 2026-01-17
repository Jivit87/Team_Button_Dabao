import { motion, AnimatePresence } from 'framer-motion';

/**
 * MotivationToast - Smart encouragement notifications
 */
const MotivationToast = ({ isVisible, message, type = 'encouragement', onClose }) => {
  const types = {
    encouragement: {
      icon: '💪',
      bgColor: 'bg-accent-purple/20',
      borderColor: 'border-accent-purple/30',
      textColor: 'text-accent-purple',
    },
    streak: {
      icon: '🔥',
      bgColor: 'bg-accent-orange/20',
      borderColor: 'border-accent-orange/30',
      textColor: 'text-accent-orange',
    },
    success: {
      icon: '🎉',
      bgColor: 'bg-success-500/20',
      borderColor: 'border-success-500/30',
      textColor: 'text-success-400',
    },
    social: {
      icon: '👥',
      bgColor: 'bg-primary-500/20',
      borderColor: 'border-primary-500/30',
      textColor: 'text-primary-400',
    },
    tip: {
      icon: '💡',
      bgColor: 'bg-warning-500/20',
      borderColor: 'border-warning-500/30',
      textColor: 'text-warning-400',
    },
  };

  const config = types[type] || types.encouragement;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -50, x: '-50%' }}
          className={`fixed top-20 left-1/2 z-50 max-w-md w-full px-4`}
        >
          <div className={`${config.bgColor} ${config.borderColor} border backdrop-blur-xl rounded-2xl p-4 shadow-lg`}>
            <div className="flex items-start gap-3">
              <span className="text-2xl">{config.icon}</span>
              <div className="flex-1">
                <p className={`${config.textColor} font-medium`}>{message}</p>
              </div>
              <button
                onClick={onClose}
                className="text-neutral-400 hover:text-neutral-200 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MotivationToast;
