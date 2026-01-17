import { motion } from 'framer-motion';
import { momentumData, userProfile } from '../../data/dummyData';

/**
 * MomentumCard - Real-time momentum visualization
 * Shows streak, consistency score, and encouragement
 */
const MomentumCard = () => {
  const { currentStreak, bestStreak, momentumScore, weeklyProgress, weeklyGoal } = momentumData;
  
  // Calculate ring progress (0-100)
  const ringProgress = (weeklyProgress / weeklyGoal) * 100;
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (ringProgress / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-glow"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-neutral-100">Your Momentum</h3>
        <span className="badge-fire flex items-center gap-1">
          <span className="fire-icon">🔥</span>
          <span>{currentStreak} day streak</span>
        </span>
      </div>

      <div className="flex items-center gap-8">
        {/* Momentum Ring */}
        <div className="relative">
          <svg className="w-28 h-28 transform -rotate-90">
            {/* Background ring */}
            <circle
              cx="56"
              cy="56"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-dark-300"
            />
            {/* Progress ring */}
            <motion.circle
              cx="56"
              cy="56"
              r="45"
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{ strokeDasharray: circumference }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="50%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-black text-gradient">{momentumScore}</span>
            <span className="text-xs text-neutral-400">Score</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex-1 space-y-4">
          {/* Weekly Progress */}
          <div>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-neutral-400">Weekly Goal</span>
              <span className="text-neutral-200 font-medium">{weeklyProgress}/{weeklyGoal} days</span>
            </div>
            <div className="progress-bar">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${ringProgress}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="progress-bar-gradient"
              />
            </div>
          </div>

          {/* Streak comparison */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent-orange/20 flex items-center justify-center">
                <span className="text-lg">🔥</span>
              </div>
              <div>
                <p className="text-neutral-400 text-xs">Current</p>
                <p className="text-neutral-100 font-bold">{currentStreak} days</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent-purple/20 flex items-center justify-center">
                <span className="text-lg">🏆</span>
              </div>
              <div>
                <p className="text-neutral-400 text-xs">Best</p>
                <p className="text-neutral-100 font-bold">{bestStreak} days</p>
              </div>
            </div>
          </div>

          {/* Encouragement */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-sm text-success-400 font-medium"
          >
            {currentStreak >= bestStreak - 2 
              ? `🎯 ${bestStreak - currentStreak + 1} more days to beat your record!`
              : `💪 You're building great momentum, ${userProfile.name}!`
            }
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default MomentumCard;
