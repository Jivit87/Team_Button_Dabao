import { motion, AnimatePresence } from 'framer-motion';
import { interventions } from '../../data/dummyData';

/**
 * InterventionModal - Help modal when struggling (Dark Theme)
 */
const InterventionModal = ({ isOpen, onClose, trigger }) => {
  const getMessage = () => {
    if (trigger === 'attempts') {
      return "We noticed you've tried a few times. Let's try a different approach!";
    }
    return "Don't worry! Everyone learns at their own pace. Here are some ways to help:";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="glass-dark border border-white/20 rounded-3xl p-8 max-w-lg w-full shadow-2xl">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-accent-purple/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">💪</span>
                </div>
                <h2 className="text-2xl font-bold text-neutral-100 mb-2">Need a Boost?</h2>
                <p className="text-neutral-400">{getMessage()}</p>
              </div>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {interventions.slice(0, 4).map((intervention, index) => (
                  <motion.button
                    key={intervention.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={onClose}
                    className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-accent-purple/50 hover:bg-accent-purple/10 transition-all text-left"
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent-purple/20 flex items-center justify-center text-2xl">
                      {intervention.type === 'video' && '📺'}
                      {intervention.type === 'quiz' && '❓'}
                      {intervention.type === 'community' && '👥'}
                      {intervention.type === 'exercise' && '💻'}
                      {intervention.type === 'break' && '☕'}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-neutral-100">{intervention.title}</h4>
                      <p className="text-sm text-neutral-500">{intervention.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="badge-info">+{intervention.xp} XP</span>
                      <p className="text-xs text-neutral-500 mt-1">{intervention.duration} min</p>
                    </div>
                  </motion.button>
                ))}
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
