import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X } from 'lucide-react';

/**
 * CelebrationOverlay - Achievement celebration (Udemy Style)
 */
const CelebrationOverlay = ({ isVisible, onClose, achievement }) => {
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    if (isVisible) {
      const newConfetti = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 2,
        color: ['#EC5252', '#FFB81C', '#10B981', '#1F1F1F'][Math.floor(Math.random() * 4)],
      }));
      setConfetti(newConfetti);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

        {/* Confetti */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {confetti.map((c) => (
            <motion.div
              key={c.id}
              initial={{ y: -20, x: `${c.x}vw`, opacity: 1, rotation: 0 }}
              animate={{ y: '100vh', opacity: 0, rotation: 360 }}
              transition={{ duration: c.duration, delay: c.delay, ease: 'easeOut' }}
              className="absolute w-3 h-3 rounded"
              style={{ backgroundColor: c.color }}
            />
          ))}
        </div>

        {/* Card */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative z-10 bg-white rounded-lg border border-u-border p-8 text-center max-w-md mx-4 shadow-xl"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-u-bg rounded transition-colors"
          >
            <X className="w-5 h-5 text-u-muted" />
          </button>

          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent-100 flex items-center justify-center"
          >
            {achievement?.icon || <Star className="w-10 h-10 text-accent-600" />}
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl font-bold text-u-black mb-2"
          >
            {achievement?.title}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-u-gray mb-6"
          >
            {achievement?.description}
          </motion.p>

          {/* Reward */}
          {achievement?.reward && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent-100 rounded-full mb-6"
            >
              <Star className="w-5 h-5 text-accent-600" />
              <span className="font-bold text-accent-700">+{achievement.reward} XP</span>
            </motion.div>
          )}

          {/* Button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            onClick={onClose}
            className="btn-primary w-full"
          >
            Continue Learning
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CelebrationOverlay;
