import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { userProfile, learnerMetrics, courseModules, momentumData, accountabilityBuddy } from '../../data/dummyData';

/**
 * WelcomeBackModal - Context summary for returning learners
 * Shows key info to help users remember where they left off
 */
const WelcomeBackModal = ({ isOpen, onClose, daysSinceLastVisit = 3 }) => {
  const currentModule = courseModules.find(m => m.isCurrentModule);
  const completedModules = courseModules.filter(m => m.status === 'completed');
  
  // Calculate what happened since last visit
  const summaryPoints = [
    {
      icon: '📍',
      title: 'Where You Left Off',
      description: `Module ${currentModule?.id}: ${currentModule?.title}`,
      detail: `${currentModule?.progress}% complete`,
      action: currentModule ? `/module/${currentModule.id}` : null,
      actionLabel: 'Continue',
    },
    {
      icon: '🔥',
      title: 'Your Streak Status',
      description: momentumData.currentStreak > 0 
        ? `${momentumData.currentStreak}-day streak still active!` 
        : `Your streak ended, but you can start fresh today!`,
      detail: momentumData.currentStreak > 0 
        ? 'Complete today to keep it going!'
        : 'Every journey begins with a single step',
      highlight: momentumData.currentStreak > 0 ? 'success' : 'warning',
    },
    {
      icon: '📊',
      title: 'Your Progress',
      description: `${learnerMetrics.overallProgress}% course complete`,
      detail: `${completedModules.length}/${courseModules.length} modules done • Level ${learnerMetrics.level}`,
    },
    {
      icon: '👥',
      title: 'Your Study Buddy',
      description: accountabilityBuddy?.name || 'No buddy yet',
      detail: accountabilityBuddy?.isOnline ? '🟢 Online now' : 'Check in on them!',
      action: '/community',
      actionLabel: 'Say Hi',
    },
  ];

  // Quick suggestion based on context
  const getQuickSuggestion = () => {
    if (daysSinceLastVisit >= 7) {
      return "It's been a while! Start with a quick 5-min refresher to get back in the groove.";
    } else if (daysSinceLastVisit >= 3) {
      return "Welcome back! Pick up where you left off - you were making great progress.";
    } else {
      return "Good to see you again! Ready to continue your learning journey?";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-dark-500/90 backdrop-blur-md z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="glass-dark border border-white/20 rounded-3xl p-8 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="text-5xl mb-3"
                >
                  👋
                </motion.div>
                <h2 className="text-2xl font-black text-neutral-100 mb-2">
                  Welcome back, {userProfile.name}!
                </h2>
                <p className="text-neutral-400 text-sm">
                  {getQuickSuggestion()}
                </p>
              </div>

              {/* Summary Points */}
              <div className="space-y-3 mb-6">
                {summaryPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    className={`p-4 rounded-xl border transition-all ${
                      point.highlight === 'success' 
                        ? 'bg-success-500/10 border-success-500/30'
                        : point.highlight === 'warning'
                        ? 'bg-warning-500/10 border-warning-500/30'
                        : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{point.icon}</span>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-neutral-200 text-sm">{point.title}</h4>
                        <p className="text-neutral-100 font-medium">{point.description}</p>
                        <p className="text-xs text-neutral-500 mt-0.5">{point.detail}</p>
                      </div>
                      {point.action && (
                        <Link
                          to={point.action}
                          onClick={onClose}
                          className="btn-ghost btn-sm text-xs"
                        >
                          {point.actionLabel} →
                        </Link>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Today's Goal Reminder */}
              <div className="p-4 bg-gradient-to-r from-accent-purple/20 to-accent-pink/20 border border-accent-purple/30 rounded-xl mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🎯</span>
                  <span className="font-bold text-accent-purple">Today's Goal</span>
                </div>
                <p className="text-neutral-200 text-sm">
                  Just <strong>8 minutes</strong> to complete your daily mission and keep building momentum!
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="btn-secondary flex-1"
                >
                  Explore Dashboard
                </button>
                <Link
                  to={currentModule ? `/module/${currentModule.id}` : '/'}
                  onClick={onClose}
                  className="btn-glow flex-1 text-center"
                >
                  <span className="mr-2">▶</span>
                  Continue Learning
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WelcomeBackModal;
