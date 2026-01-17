import { motion } from 'framer-motion';

/**
 * BiteSelector - Content selection for module learning (Dark Theme)
 */
const BiteSelector = ({ items, selectedItem, onSelect }) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'video':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'quiz':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'exercise':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      case 'project':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {items.map((item, index) => {
        const isSelected = selectedItem?.id === item.id;
        const isCompleted = item.completed;
        const isCurrent = item.isCurrent;

        return (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSelect(item)}
            className={`relative p-4 rounded-xl text-left transition-all ${
              isSelected
                ? 'bg-accent-purple/20 border-2 border-accent-purple shadow-glow-purple'
                : isCompleted
                ? 'bg-success-500/10 border border-success-500/30 hover:border-success-500/50'
                : isCurrent
                ? 'bg-accent-purple/10 border-2 border-accent-purple/50 animate-pulse'
                : 'bg-white/5 border border-white/10 hover:border-accent-purple/30 hover:bg-white/10'
            }`}
          >
            {/* Completed checkmark */}
            {isCompleted && (
              <div className="absolute top-2 right-2">
                <div className="w-5 h-5 rounded-full bg-success-500 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            )}

            {/* Content */}
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
              isCompleted
                ? 'bg-success-500/20 text-success-400'
                : isCurrent
                ? 'bg-accent-purple/30 text-accent-purple'
                : 'bg-white/10 text-neutral-400'
            }`}>
              {getTypeIcon(item.type)}
            </div>

            <h4 className={`font-medium text-sm mb-1 line-clamp-2 ${
              isCompleted ? 'text-success-400' : 'text-neutral-200'
            }`}>
              {item.title}
            </h4>

            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <span>{item.duration} min</span>
              {item.xp && (
                <>
                  <span>•</span>
                  <span className="text-accent-purple">+{item.xp} XP</span>
                </>
              )}
            </div>

            {/* Current indicator */}
            {isCurrent && !isCompleted && (
              <div className="absolute bottom-2 right-2">
                <span className="badge-info text-xs">Next</span>
              </div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default BiteSelector;
