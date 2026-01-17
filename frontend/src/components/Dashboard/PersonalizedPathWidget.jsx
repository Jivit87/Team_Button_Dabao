import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Play, Lock, Star } from 'lucide-react';
import { courseModules, learnerMetrics } from '../../data/dummyData';

/**
 * PersonalizedPathWidget - Course roadmap (Udemy Style)
 */
const PersonalizedPathWidget = () => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <div className="w-8 h-8 rounded-full bg-success-500 flex items-center justify-center"><CheckCircle className="w-4 h-4 text-white" /></div>;
      case 'in-progress': return <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center"><Play className="w-4 h-4 text-white" /></div>;
      default: return <div className="w-8 h-8 rounded-full bg-u-border flex items-center justify-center"><Lock className="w-4 h-4 text-u-muted" /></div>;
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-u-black">Your Learning Path</h3>
          <p className="text-sm text-u-muted">{learnerMetrics.overallProgress}% complete</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 text-accent-500" />
            <p className="text-xl font-bold text-u-black">{learnerMetrics.totalXP}</p>
          </div>
          <p className="text-xs text-u-muted">Total XP</p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-u-border" />
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: `${learnerMetrics.overallProgress}%` }}
          transition={{ duration: 1 }}
          className="absolute left-4 top-4 w-0.5 bg-primary-500"
        />

        <div className="space-y-3">
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
                className={`flex items-center gap-4 p-4 rounded transition-all ${
                  module.isCurrentModule ? 'bg-primary-50 border border-primary-200' : 
                  module.status === 'completed' ? 'bg-u-bg hover:bg-u-border' : 
                  'bg-u-bg opacity-60 cursor-not-allowed'
                }`}
              >
                <div className="relative z-10">{getStatusIcon(module.status)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className={`font-medium truncate ${module.isCurrentModule ? 'text-primary-500' : 'text-u-black'}`}>
                      {module.title}
                    </h4>
                    {module.isCurrentModule && <span className="badge-primary text-xs">Current</span>}
                  </div>
                  <p className="text-xs text-u-muted truncate">{module.description}</p>
                </div>
                <div className="text-right">
                  <p className={`font-semibold text-sm ${
                    module.status === 'completed' ? 'text-success-600' : 
                    module.status === 'in-progress' ? 'text-primary-500' : 
                    'text-u-muted'
                  }`}>
                    {module.progress}%
                  </p>
                  {module.xpEarned > 0 && <p className="text-xs text-u-muted">+{module.xpEarned} XP</p>}
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
