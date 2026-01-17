import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Award, CheckCircle, Circle } from 'lucide-react';
import { todaysMission, momentumData } from '../../data/dummyData';

/**
 * TodaysMission - Udemy-style mission card with red accent
 */
const TodaysMission = ({ onStartMission }) => {
  const [completedSteps, setCompletedSteps] = useState([]);

  const toggleStep = (stepId) => {
    if (completedSteps.includes(stepId)) {
      setCompletedSteps(completedSteps.filter(id => id !== stepId));
    } else {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const progress = (completedSteps.length / todaysMission.steps.length) * 100;

  return (
    <div className="mission-card">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="badge-primary">Today's Mission</span>
            <span className="text-sm text-[#6B7280] flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {todaysMission.estimatedTime} min
            </span>
            <span className="text-sm font-semibold text-accent-600">+{todaysMission.xpReward} XP</span>
          </div>
          <h2 className="text-xl font-bold text-[#000000]">{todaysMission.title}</h2>
          <p className="text-[#4A4A4A] mt-1">{todaysMission.description}</p>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-[#6B7280]">Progress</span>
          <span className="font-semibold text-primary-500">{Math.round(progress)}%</span>
        </div>
        <div className="progress-bar h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="progress-primary"
          />
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-3 mb-6">
        {todaysMission.steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          return (
            <motion.button
              key={step.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => toggleStep(step.id)}
              className={`w-full flex items-center gap-3 p-3 rounded text-left transition-all ${
                isCompleted
                  ? 'bg-success-50 border border-success-200'
                  : 'bg-white border border-[#E5E5E5] hover:border-primary-300'
              }`}
            >
              {isCompleted ? (
                <CheckCircle className="w-5 h-5 text-success-500 flex-shrink-0" />
              ) : (
                <Circle className="w-5 h-5 text-[#B0B0B0] flex-shrink-0" />
              )}
              <div className="flex-1">
                <p className={`font-medium ${isCompleted ? 'text-success-700 line-through' : 'text-[#000000]'}`}>
                  {step.title}
                </p>
                <p className="text-xs text-[#6B7280]">{step.duration} min</p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* CTA */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-[#6B7280]">
          Complete to maintain your <span className="font-semibold text-accent-600">{momentumData.currentStreak}-day streak</span>
        </div>
        <button onClick={onStartMission} className="btn-primary">
          <Play className="w-4 h-4" />
          Start Mission
        </button>
      </div>
    </div>
  );
};

export default TodaysMission;
