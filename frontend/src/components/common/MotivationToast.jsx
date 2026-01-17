import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Users, TrendingUp, Star } from 'lucide-react';

/**
 * MotivationToast - Encouragement notifications (Udemy Style)
 */
const MotivationToast = ({ isVisible, message, type = 'encouragement', onClose }) => {
  const getIcon = () => {
    switch (type) {
      case 'social':
        return <Users className="w-5 h-5" />;
      case 'progress':
        return <TrendingUp className="w-5 h-5" />;
      case 'achievement':
        return <Star className="w-5 h-5" />;
      default:
        return <Zap className="w-5 h-5" />;
    }
  };

  const getColor = () => {
    switch (type) {
      case 'social':
        return 'bg-u-charcoal border-u-charcoal text-white';
      case 'progress':
        return 'bg-success-500 border-success-500 text-white';
      case 'achievement':
        return 'bg-accent-500 border-accent-500 text-u-charcoal';
      default:
        return 'bg-primary-500 border-primary-500 text-white';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -50, x: '-50%' }}
          className={`fixed top-6 left-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg cursor-pointer ${getColor()}`}
          onClick={onClose}
        >
          {getIcon()}
          <span className="font-medium text-sm whitespace-nowrap">{message}</span>
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="p-1 hover:opacity-80 transition-opacity ml-2 rounded-full bg-black/10"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MotivationToast;
