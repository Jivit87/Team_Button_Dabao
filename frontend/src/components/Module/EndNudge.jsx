import { motion, AnimatePresence } from 'framer-motion';

/**
 * EndNudge - Smart break reminder (Dark Theme)
 */
const EndNudge = ({ isVisible, onDismiss, duration }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 right-6 z-40 max-w-sm"
        >
          <div className="glass-dark border border-accent-cyan/30 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent-cyan/20 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">☕</span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-neutral-100 mb-1">
                  {duration} minutes of focus! 🌟
                </h4>
                <p className="text-sm text-neutral-400 mb-4">
                  Amazing work! Your brain absorbs better with short breaks. Take 5?
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={onDismiss}
                    className="btn-secondary btn-sm"
                  >
                    Keep Going
                  </button>
                  <button
                    onClick={onDismiss}
                    className="btn-primary btn-sm"
                  >
                    Take a Break
                  </button>
                </div>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={onDismiss}
              className="absolute top-3 right-3 p-1 text-neutral-500 hover:text-neutral-300 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EndNudge;
