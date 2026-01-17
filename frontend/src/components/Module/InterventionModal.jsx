import { motion, AnimatePresence } from 'framer-motion';
import { Video, HelpCircle, Code, Users, Coffee } from 'lucide-react';
import { interventions } from '../../data/dummyData';

/**
 * InterventionModal - Help modal when struggling
 * Nielsen's Heuristic #9: Help users recognize and recover from errors
 */
const InterventionModal = ({ isOpen, onClose, trigger }) => {
  const getMessage = () => {
    if (trigger === 'attempts') {
      return "We noticed you've tried a few times. Let's try a different approach!";
    }
    return "Don't worry! Everyone learns at their own pace. Here are some ways to help:";
  };

  const getIcon = (type) => {
    switch (type) {
      case 'video': return Video;
      case 'quiz': return HelpCircle;
      case 'community': return Users;
      case 'exercise': return Code;
      case 'break': return Coffee;
      default: return HelpCircle;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-card border border-u-border">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-4">
                  <HelpCircle className="w-8 h-8 text-primary-500" />
                </div>
                <h2 className="text-2xl font-bold text-u-black mb-2">Need a Boost?</h2>
                <p className="text-u-gray">{getMessage()}</p>
              </div>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {interventions.slice(0, 4).map((intervention, index) => {
                  const Icon = getIcon(intervention.type);
                  return (
                    <motion.button
                      key={intervention.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={onClose}
                      className="w-full flex items-center gap-4 p-4 rounded-xl bg-u-bg border border-u-border hover:border-primary-200 hover:bg-primary-50 transition-all text-left"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary-500" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-u-black">{intervention.title}</h4>
                        <p className="text-sm text-u-muted">{intervention.description}</p>
                      </div>
                      <div className="text-right">
                        <span className="badge-primary">+{intervention.xp} XP</span>
                        <p className="text-xs text-u-muted mt-1">{intervention.duration} min</p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="btn-secondary flex-1"
                >
                  Keep Trying
                </button>
                <button
                  onClick={onClose}
                  className="btn-primary flex-1"
                >
                  Get Help
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default InterventionModal;
