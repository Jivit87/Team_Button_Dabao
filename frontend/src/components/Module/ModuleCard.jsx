import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * ModuleCard - Displays individual course module with progress
 * Shows status (completed, in-progress, locked) and quick actions
 */
const ModuleCard = ({ module, index }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return (
          <div className="w-8 h-8 bg-success-500 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case 'in-progress':
        return (
          <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        );
      case 'locked':
        return (
          <div className="w-8 h-8 bg-neutral-300 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  const getDifficultyBadge = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return <span className="badge badge-success">Easy</span>;
      case 'medium':
        return <span className="badge badge-warning">Medium</span>;
      case 'hard':
        return <span className="badge badge-alert">Hard</span>;
      default:
        return null;
    }
  };

  const isAccessible = module.status !== 'locked';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`card ${!isAccessible ? 'opacity-60' : ''} ${
        module.isCurrentModule ? 'ring-2 ring-primary-500 ring-offset-2' : ''
      }`}
    >
      <div className="flex items-start gap-4">
        {getStatusIcon(module.status)}

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-neutral-800">
                {module.title}
                {module.isCurrentModule && (
                  <span className="ml-2 text-xs text-primary-600 font-normal">(Current)</span>
                )}
              </h3>
              <p className="text-sm text-neutral-500 mt-0.5">{module.description}</p>
            </div>
            {getDifficultyBadge(module.difficulty)}
          </div>

          {/* Progress Bar */}
          {module.progress > 0 && (
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-neutral-500">Progress</span>
                <span className="font-medium text-neutral-700">{module.progress}%</span>
              </div>
              <div className="progress-bar">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${module.progress}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`progress-bar-fill ${
                    module.progress === 100 ? 'bg-success-500' : 'bg-primary-500'
                  }`}
                />
              </div>
            </div>
          )}

          {/* Quiz Scores */}
          {module.quizzes?.length > 0 && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs text-neutral-500">Quizzes:</span>
              {module.quizzes.map((quiz, i) => (
                <span
                  key={i}
                  className={`text-xs font-medium px-1.5 py-0.5 rounded ${
                    quiz.score >= 70
                      ? 'bg-success-100 text-success-700'
                      : quiz.score >= 50
                      ? 'bg-warning-100 text-warning-700'
                      : 'bg-alert-100 text-alert-700'
                  }`}
                >
                  {quiz.score}%
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="mt-4 flex items-center gap-2">
            {isAccessible ? (
              <>
                <Link
                  to={`/module/${module.id}`}
                  className="btn btn-primary btn-sm"
                >
                  {module.status === 'completed' ? 'Review' : 'Continue'}
                </Link>
                <span className="text-xs text-neutral-400">
                  ~{module.timeEstimate} hours
                </span>
              </>
            ) : (
              <span className="text-xs text-neutral-400">
                Complete previous modules to unlock
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ModuleCard;
