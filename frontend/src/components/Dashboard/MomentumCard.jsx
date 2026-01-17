import { motion } from 'framer-motion';
import { Flame, Target, TrendingUp, Calendar } from 'lucide-react';
import { momentumData, learnerMetrics } from '../../data/dummyData';

const MomentumCard = () => {
  const { currentStreak, consistencyScore, weeklyProgress } = momentumData;

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-u-black">Your Momentum</h3>
          <p className="text-sm text-u-muted">Keep building consistency</p>
        </div>
        <span className="badge-accent">This Week</span>
      </div>

      <div className="flex items-center gap-8">
        <div className="relative flex-shrink-0">
          <svg className="w-24 h-24 -rotate-90">
            <circle cx="48" cy="48" r="40" stroke="#E5E5E5" strokeWidth="8" fill="none" />
            <motion.circle
              cx="48" cy="48" r="40" stroke="#EC5252" strokeWidth="8"
              fill="none" strokeLinecap="round"
              initial={{ strokeDashoffset: 251 }}
              animate={{ strokeDashoffset: 251 - (consistencyScore / 100) * 251 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{ strokeDasharray: 251 }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-u-black">{consistencyScore}%</span>
            <span className="text-xs text-u-muted">Score</span>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-4">
          <div className="p-3 bg-accent-50 rounded border border-accent-200">
            <div className="flex items-center gap-2 mb-1">
              <Flame className="w-4 h-4 text-accent-600" />
              <span className="text-xs text-u-muted">Streak</span>
            </div>
            <p className="text-xl font-bold text-u-black">{currentStreak} days</p>
          </div>

          <div className="p-3 bg-primary-50 rounded border border-primary-200">
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-4 h-4 text-primary-500" />
              <span className="text-xs text-u-muted">Weekly Goal</span>
            </div>
            <p className="text-xl font-bold text-u-black">{weeklyProgress}/5 days</p>
          </div>

          <div className="p-3 bg-success-50 rounded border border-success-100">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-success-600" />
              <span className="text-xs text-u-muted">Level</span>
            </div>
            <p className="text-xl font-bold text-u-black">{learnerMetrics.level}</p>
          </div>

          <div className="p-3 bg-u-bg rounded border border-u-border">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-u-muted" />
              <span className="text-xs text-u-muted">Best Streak</span>
            </div>
            <p className="text-xl font-bold text-u-black">{momentumData.bestStreak} days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MomentumCard;
