import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, X } from 'lucide-react';

/**
 * EndNudge - Smart break reminder
 * Nielsen's Heuristic #10: Help and documentation
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
          <div className="bg-white border border-primary-200 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow">
            <button
              onClick={onDismiss}
              className="absolute top-3 right-3 p-1 text-u-muted hover:text-u-black transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                <Coffee className="w-6 h-6 text-primary-500" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-u-black mb-1">
                  {duration} minutes of focus!
                </h4>
                <p className="text-sm text-u-gray mb-4">
                  Amazing work! Your brain absorbs better with short breaks. Take 5?
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={onDismiss}
                    className="btn-secondary btn-sm px-3 py-1.5 text-xs"
                  >
                    Keep Going
                  </button>
                  <button
                    onClick={onDismiss}
                    className="btn-primary btn-sm px-3 py-1.5 text-xs"
                  >
                    Take a Break
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EndNudge;
