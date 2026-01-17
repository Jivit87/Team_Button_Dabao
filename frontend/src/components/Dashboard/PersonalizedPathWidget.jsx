import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { courseModules, learnerMetrics } from '../../data/dummyData';

/**
 * PersonalizedPathWidget - Course roadmap (Dark Theme)
 */
const PersonalizedPathWidget = () => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return (
          <div className="w-8 h-8 rounded-full bg-success-500 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case 'in-progress':
        return (
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent-purple to-accent-pink flex items-center justify-center animate-pulse">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center">
            <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-neutral-100">Your Learning Path</h3>
          <p className="text-sm text-neutral-400">{learnerMetrics.overallProgress}% complete • ~{learnerMetrics.estimatedHoursLeft} hours remaining</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-black text-gradient">{learnerMetrics.totalXP}</p>
          <p className="text-xs text-neutral-500">Total XP</p>
        </div>
      </div>

      <div className="relative">
        {/* Progress line */}
        <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-neutral-700" />
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: `${learnerMetrics.overallProgress}%` }}
          transition={{ duration: 1 }}
          className="absolute left-4 top-4 w-0.5 bg-gradient-to-b from-success-500 to-accent-purple"
        />

        {/* Modules */}
        <div className="space-y-4">
          {courseModules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative"
            >
              <Link
                to={module.status !== 'locked' ? `/module/${module.id}` : '#'}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                  module.isCurrentModule
                    ? 'bg-accent-purple/10 border border-accent-purple/30'
                    : module.status === 'completed'
                    ? 'bg-white/5 hover:bg-white/10'
                    : 'opacity-60'
                }`}
              >
                <div className="relative z-10">
                  {getStatusIcon(module.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className={`font-semibold truncate ${
                      module.isCurrentModule ? 'text-accent-purple' : 'text-neutral-200'
                    }`}>
                      {module.title}
                    </h4>
                    {module.isCurrentModule && (
                      <span className="badge-info text-xs">Current</span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-500 truncate">{module.description}</p>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-sm ${
                    module.status === 'completed'
                      ? 'text-success-400'
                      : module.status === 'in-progress'
                      ? 'text-accent-purple'
                      : 'text-neutral-600'
                  }`}>
                    {module.progress}%
                  </p>
                  {module.xpEarned > 0 && (
                    <p className="text-xs text-neutral-500">+{module.xpEarned} XP</p>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalizedPathWidget;
