import { motion } from 'framer-motion';
import { momentumData } from '../../data/dummyData';

/**
 * StreakVis - Visual streak calendar with heat map
 * Shows activity history and streak progress
 */
const StreakVis = () => {
  const { currentStreak, bestStreak, streakHistory, totalDaysActive } = momentumData;
  
  // Generate last 28 days for display
  const generateCalendarDays = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 27; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const historyItem = streakHistory.find(h => h.date === dateStr);
      const isToday = i === 0;
      
      days.push({
        date: dateStr,
        day: date.getDate(),
        dayName: date.toLocaleDateString('en', { weekday: 'short' }).charAt(0),
        completed: historyItem?.completed || false,
        isToday,
      });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();

  const getIntensity = (completed, isToday) => {
    if (isToday && !completed) return 'bg-accent-purple/30 border-2 border-accent-purple animate-pulse';
    if (completed) return 'bg-success-500 glow-green';
    return 'bg-dark-300/50';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-neutral-100">Activity Streak</h3>
          <p className="text-sm text-neutral-400">Last 28 days</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="flex items-center gap-1">
              <span className="fire-icon text-xl">🔥</span>
              <span className="text-2xl font-black text-gradient-fire">{currentStreak}</span>
            </div>
            <p className="text-xs text-neutral-500">Current</p>
          </div>
          <div className="w-px h-10 bg-neutral-700" />
          <div className="text-center">
            <div className="flex items-center gap-1">
              <span className="text-xl">🏆</span>
              <span className="text-2xl font-black text-accent-purple">{bestStreak}</span>
            </div>
            <p className="text-xs text-neutral-500">Best</p>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {/* Day labels */}
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
          <div key={i} className="text-center text-xs text-neutral-500 font-medium pb-1">
            {day}
          </div>
        ))}
        
        {/* Calendar days */}
        {calendarDays.map((day, index) => (
          <motion.div
            key={day.date}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.02 }}
            className={`aspect-square rounded-lg flex items-center justify-center text-xs font-medium transition-all ${getIntensity(day.completed, day.isToday)}`}
            title={day.date}
          >
            {day.isToday ? (
              <span className="text-accent-purple">Today</span>
            ) : day.completed ? (
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : null}
          </motion.div>
        ))}
      </div>

      {/* Legend and Stats */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="flex items-center gap-4 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-success-500" />
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-dark-300/50" />
            <span>Missed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-accent-purple/30 border border-accent-purple" />
            <span>Today</span>
          </div>
        </div>
        <p className="text-sm text-neutral-300">
          <span className="font-bold text-success-400">{totalDaysActive}</span> total active days
        </p>
      </div>

      {/* Motivation */}
      {currentStreak > 0 && currentStreak < bestStreak && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-4 p-3 bg-accent-purple/10 border border-accent-purple/30 rounded-xl"
        >
          <p className="text-sm text-accent-purple text-center">
            🎯 Complete today to reach <strong>{currentStreak + 1} days</strong>! 
            Only <strong>{bestStreak - currentStreak}</strong> more to beat your record!
          </p>
        </motion.div>
      )}

      {currentStreak >= bestStreak && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-4 p-3 bg-success-500/10 border border-success-500/30 rounded-xl"
        >
          <p className="text-sm text-success-400 text-center">
            🏆 You're at your <strong>best streak ever</strong>! Keep the momentum going!
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default StreakVis;
