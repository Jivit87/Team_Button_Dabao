import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { todaysMission, momentumData } from '../../data/dummyData';

/**
 * TodaysMission - Micro-commitment widget
 * Shows today's achievable goal with clear steps
 */
const TodaysMission = ({ onStartMission }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [completedSteps, setCompletedSteps] = useState([]);
  
  const { currentStreak } = momentumData;
  const completionPercentage = (completedSteps.length / todaysMission.steps.length) * 100;

  const handleStepComplete = (stepId) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'exercise':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mission-card relative overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">🎯</span>
            <h3 className="text-xl font-bold text-neutral-100">Today's Mission</h3>
          </div>
          <p className="text-neutral-400 text-sm">
            {todaysMission.estimatedTime} minutes • {todaysMission.reward}
          </p>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <motion.svg
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="w-5 h-5 text-neutral-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </button>
      </div>

      {/* Mission Title */}
      <div className="mb-4">
        <h4 className="text-lg font-semibold text-gradient mb-1">{todaysMission.title}</h4>
        <p className="text-neutral-300 text-sm">{todaysMission.description}</p>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-neutral-400">Progress</span>
          <span className="text-accent-purple font-medium">{Math.round(completionPercentage)}%</span>
        </div>
        <div className="progress-bar h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionPercentage}%` }}
            className="progress-bar-gradient"
          />
        </div>
      </div>

      {/* Steps */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3 mb-4"
          >
            {todaysMission.steps.map((step, index) => {
              const isCompleted = completedSteps.includes(step.id);
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => !isCompleted && handleStepComplete(step.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                    isCompleted
                      ? 'bg-success-500/20 border border-success-500/30'
                      : 'bg-white/5 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isCompleted 
                      ? 'bg-success-500 text-white' 
                      : 'bg-accent-purple/20 text-accent-purple'
                  }`}>
                    {isCompleted ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      getTypeIcon(step.type)
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${isCompleted ? 'text-success-400 line-through' : 'text-neutral-200'}`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-neutral-500">{step.duration} min</p>
                  </div>
                  {!isCompleted && (
                    <span className="text-xs text-accent-purple">Click to complete</span>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Streak reminder */}
      <div className="bg-accent-orange/10 border border-accent-orange/30 rounded-xl p-3 mb-4">
        <p className="text-sm text-accent-orange flex items-center gap-2">
          <span className="fire-icon text-lg">🔥</span>
          {todaysMission.streakBonus.replace('{streak}', currentStreak)}
        </p>
      </div>

      {/* CTA Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onStartMission}
        className="btn-glow w-full py-4 text-lg font-bold"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Start Mission
      </motion.button>

      {/* Encouragement */}
      <p className="text-center text-sm text-neutral-400 mt-3">
        {todaysMission.encouragement}
      </p>
    </motion.div>
  );
};

export default TodaysMission;
