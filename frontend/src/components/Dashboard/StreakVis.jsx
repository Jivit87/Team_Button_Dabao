import { motion } from 'framer-motion';
import { Flame, Trophy, ChevronLeft, ChevronRight } from 'lucide-react';
import { momentumData } from '../../data/dummyData';

const StreakVis = () => {
  const { currentStreak, bestStreak } = momentumData;
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const currentDates = [23, 24, 25, 26, 27, 28, 29];

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-u-black">March 2024</h3>
        <div className="flex items-center gap-2">
          <button className="p-1.5 hover:bg-u-bg rounded transition-colors">
            <ChevronLeft className="w-4 h-4 text-u-muted" />
          </button>
          <button className="p-1.5 hover:bg-u-bg rounded transition-colors">
            <ChevronRight className="w-4 h-4 text-u-muted" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-6">
        {weekDays.map((day, i) => (
          <div key={i} className="text-center">
            <span className="text-xs text-u-muted">{day}</span>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`w-10 h-10 rounded flex items-center justify-center mx-auto mt-1 font-medium text-sm
                ${i < 3 ? 'bg-u-charcoal text-white' : 
                  i === 3 ? 'bg-primary-500 text-white' :
                  'bg-u-border text-u-muted'}`}
            >
              {currentDates[i]}
            </motion.div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 flex-1 p-3 bg-accent-50 rounded border border-accent-200">
          <Flame className="w-5 h-5 text-accent-600" />
          <div>
            <p className="text-xl font-bold text-u-black">{currentStreak}</p>
            <p className="text-xs text-u-muted">Current</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-1 p-3 bg-u-bg rounded border border-u-border">
          <Trophy className="w-5 h-5 text-u-muted" />
          <div>
            <p className="text-xl font-bold text-u-black">{bestStreak}</p>
            <p className="text-xs text-u-muted">Best</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-u-border text-xs text-u-muted">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-u-charcoal" />
          <span>Completed</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-primary-500" />
          <span>Today</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-u-border" />
          <span>Upcoming</span>
        </div>
      </div>
    </div>
  );
};

export default StreakVis;
