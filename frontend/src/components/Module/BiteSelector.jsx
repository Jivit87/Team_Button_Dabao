import { motion } from 'framer-motion';
import { Video, HelpCircle, Code, FolderOpen, Check, ChevronRight } from 'lucide-react';

/**
 * BiteSelector - Content selection for module learning
 * Nielsen's Heuristic #6: Recognition rather than recall
 */
const BiteSelector = ({ items, selectedItem, onSelect }) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'video': return Video;
      case 'quiz': return HelpCircle;
      case 'exercise': return Code;
      case 'project': return FolderOpen;
      default: return Video;
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {items.map((item, index) => {
        const isSelected = selectedItem?.id === item.id;
        const isCompleted = item.completed;
        const isCurrent = item.isCurrent;
        const Icon = getTypeIcon(item.type);

        return (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSelect(item)}
            className={`relative p-4 rounded-xl text-left transition-all ${
              isSelected
                ? 'bg-primary-50 border-2 border-primary-500 shadow-card'
                : isCompleted
                ? 'bg-success-50 border border-success-200 hover:border-success-300'
                : isCurrent
                ? 'bg-primary-50 border-2 border-primary-300'
                : 'bg-white border border-u-border hover:border-primary-200 hover:bg-u-bg'
            }`}
          >
            {/* Completed checkmark */}
            {isCompleted && (
              <div className="absolute top-2 right-2">
                <div className="w-5 h-5 rounded-full bg-success-500 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              </div>
            )}

            {/* Content */}
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
              isCompleted
                ? 'bg-success-100'
                : isCurrent
                ? 'bg-primary-100'
                : 'bg-u-bg'
            }`}>
              <Icon className={`w-5 h-5 ${
                isCompleted
                  ? 'text-success-600'
                  : isCurrent
                  ? 'text-primary-600'
                  : 'text-u-muted'
              }`} />
            </div>

            <h4 className={`font-medium text-sm mb-1 line-clamp-2 ${
              isCompleted ? 'text-success-700' : 'text-u-black'
            }`}>
              {item.title}
            </h4>

            <div className="flex items-center gap-2 text-xs text-u-muted">
              <span>{item.duration} min</span>
              {item.xp && (
                <>
                  <span>•</span>
                  <span className="text-primary-500 font-medium">+{item.xp} XP</span>
                </>
              )}
            </div>

            {/* Current indicator */}
            {isCurrent && !isCompleted && (
              <div className="absolute bottom-2 right-2">
                <span className="badge-primary text-xs">
                  <ChevronRight className="w-3 h-3" /> Next
                </span>
              </div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default BiteSelector;
