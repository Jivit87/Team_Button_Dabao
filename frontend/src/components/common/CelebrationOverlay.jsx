import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * CelebrationOverlay - Full-screen celebration for achievements
 */
const CelebrationOverlay = ({ isVisible, onClose, achievement }) => {
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    if (isVisible) {
      // Generate confetti pieces
      const pieces = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        color: ['#a855f7', '#ec4899', '#f97316', '#10b981', '#3b82f6'][Math.floor(Math.random() * 5)],
        rotation: Math.random() * 360,
      }));
      setConfetti(pieces);

      // Auto close after delay
      const timer = setTimeout(() => {
        onClose?.();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="celebration-overlay"
          onClick={onClose}
        >
          {/* Confetti */}
          <div className="confetti-container">
            {confetti.map((piece) => (
              <motion.div
                key={piece.id}
                initial={{ 
                  y: -20, 
                  x: `${piece.left}vw`, 
                  rotate: 0,
                  opacity: 1 
                }}
                animate={{ 
                  y: '100vh', 
                  rotate: piece.rotation + 720,
                  opacity: 0 
                }}
                transition={{ 
                  duration: 3 + Math.random() * 2, 
                  delay: piece.delay,
                  ease: 'easeOut'
                }}
                className="confetti-piece"
                style={{ backgroundColor: piece.color, left: 0 }}
              />
            ))}
          </div>

          {/* Achievement Card */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', damping: 15 }}
            className="achievement-card max-w-md mx-auto"
          >
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-accent-purple/20 via-accent-pink/20 to-accent-orange/20 rounded-3xl blur-xl" />
            
            <div className="relative">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', damping: 10 }}
                className="text-6xl mb-4"
              >
                {achievement?.icon || '🎉'}
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-black text-gradient mb-2"
              >
                {achievement?.title || 'Achievement Unlocked!'}
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-neutral-300 text-lg mb-6"
              >
                {achievement?.description || 'You did something amazing!'}
              </motion.p>

              {/* Reward */}
              {achievement?.reward && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-success-500/20 border border-success-500/30 rounded-full text-success-400 font-bold"
                >
                  <span>+{achievement.reward}</span>
                  <span>XP Earned!</span>
                </motion.div>
              )}

              {/* Close hint */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-neutral-500 text-sm mt-6"
              >
                Tap anywhere to continue
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CelebrationOverlay;
