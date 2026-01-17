import { motion } from 'framer-motion';
import { learningPhases } from '../../data/dummyData';

/**
 * PhaseTimeline - Visual representation of the 5-phase learning journey
 * Highlights current phase (Phase 3) with warning indicator for struggle zones
 */
const PhaseTimeline = () => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success-500';
      case 'current':
        return 'bg-primary-500';
      case 'upcoming':
        return 'bg-neutral-300';
      default:
        return 'bg-neutral-300';
    }
  };

  const getStatusBorder = (status) => {
    switch (status) {
      case 'completed':
        return 'border-success-500';
      case 'current':
        return 'border-primary-500 ring-4 ring-primary-100';
      case 'upcoming':
        return 'border-neutral-300';
      default:
        return 'border-neutral-300';
    }
  };

  const getIcon = (phase) => {
    switch (phase.icon) {
      case 'sparkles':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        );
      case 'compass':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
        );
      case 'book-open':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'trending-up':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        );
      case 'award':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="card">
      <h2 className="text-lg font-semibold text-neutral-800 mb-4">
        Your Learning Journey
      </h2>

      {/* Desktop Timeline - Horizontal */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-6 left-8 right-8 h-1 bg-neutral-200 rounded-full">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '40%' }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-success-500 rounded-full"
            />
          </div>

          {/* Phase Nodes */}
          <div className="flex justify-between relative z-10">
            {learningPhases.map((phase, index) => (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center w-1/5"
              >
                {/* Node Circle */}
                <div
                  className={`relative w-12 h-12 rounded-full border-2 flex items-center justify-center ${getStatusColor(
                    phase.status
                  )} ${getStatusBorder(phase.status)} ${
                    phase.status === 'completed' || phase.status === 'current'
                      ? 'text-white'
                      : 'text-neutral-500'
                  }`}
                >
                  {phase.status === 'completed' ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    getIcon(phase)
                  )}

                  {/* Warning indicator for struggle phase */}
                  {phase.warning && (
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute -top-1 -right-1 w-4 h-4 bg-warning-500 rounded-full flex items-center justify-center"
                    >
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </motion.span>
                  )}
                </div>

                {/* Phase Label */}
                <div className="mt-3 text-center">
                  <p
                    className={`text-sm font-medium ${
                      phase.status === 'current'
                        ? 'text-primary-600'
                        : phase.status === 'completed'
                        ? 'text-success-600'
                        : 'text-neutral-500'
                    }`}
                  >
                    {phase.shortName}
                  </p>
                  <p className="text-xs text-neutral-400 mt-0.5 max-w-[100px] mx-auto">
                    {phase.emotions.join(', ')}
                  </p>
                </div>

                {/* Tooltip on hover */}
                <div className="hidden group-hover:block absolute bottom-full mb-2 px-3 py-2 bg-neutral-800 text-white text-xs rounded-lg whitespace-nowrap">
                  {phase.support}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Timeline - Vertical */}
      <div className="md:hidden space-y-4">
        {learningPhases.map((phase, index) => (
          <motion.div
            key={phase.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-start gap-4 p-3 rounded-lg ${
              phase.status === 'current' ? 'bg-primary-50 border border-primary-200' : ''
            }`}
          >
            {/* Node */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getStatusColor(
                phase.status
              )} ${phase.status !== 'upcoming' ? 'text-white' : 'text-neutral-500'}`}
            >
              {phase.status === 'completed' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                getIcon(phase)
              )}
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4
                  className={`font-medium ${
                    phase.status === 'current' ? 'text-primary-700' : 'text-neutral-700'
                  }`}
                >
                  {phase.name}
                </h4>
                {phase.warning && (
                  <span className="badge badge-warning text-xs">Struggle Zone</span>
                )}
              </div>
              <p className="text-xs text-neutral-500 mt-0.5">{phase.support}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PhaseTimeline;
