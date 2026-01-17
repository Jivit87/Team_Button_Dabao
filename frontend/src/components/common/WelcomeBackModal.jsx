import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Flame, Play } from 'lucide-react';
import { courseModules, momentumData } from '../../data/dummyData';

/**
 * WelcomeBackModal - Return context summary (Udemy Style)
 */
const WelcomeBackModal = ({ isOpen, onClose, daysSinceLastVisit }) => {
  const currentModule = courseModules.find((m) => m.isCurrentModule);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" onClick={onClose} />

        {/* Modal */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative bg-white rounded-lg border border-[#E5E5E5] w-full max-w-lg overflow-hidden shadow-elevated"
        >
          {/* Header */}
          <div className="bg-charcoal p-6 text-white">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-1">Welcome back!</h2>
            <p className="text-white/70 text-sm">
              It's been {daysSinceLastVisit} day{daysSinceLastVisit > 1 ? 's' : ''}. Here's what you missed.
            </p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Current Module */}
            {currentModule && (
              <div className="p-4 bg-[#F9F9F9] rounded border border-[#E5E5E5]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-primary-100 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-primary-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-[#6B7280]">Continue where you left off</p>
                    <h4 className="font-semibold text-[#000000]">{currentModule.title}</h4>
                    <p className="text-sm text-[#6B7280]">{currentModule.progress}% complete</p>
                  </div>
                </div>
              </div>
            )}

            {/* Streak */}
            <div className="p-4 bg-accent-50 rounded border border-accent-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-accent-100 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-accent-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-[#6B7280]">Your streak status</p>
                  <h4 className="font-semibold text-[#000000]">
                    {momentumData.currentStreak > 0
                      ? `${momentumData.currentStreak}-day streak active!`
                      : 'Start a new streak today!'}
                  </h4>
                </div>
              </div>
            </div>

            {/* Quick Tip */}
            <div className="text-center text-sm text-[#6B7280]">
              Just 10 minutes today keeps your momentum going.
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 pt-0">
            <button onClick={onClose} className="btn-primary w-full">
              <Play className="w-4 h-4" />
              Continue Learning
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WelcomeBackModal;
