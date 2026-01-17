import { useState } from 'react';
import { motion } from 'framer-motion';
import { weeklySchedule } from '../../data/dummyData';

/**
 * TimePlanner - Weekly study planner with workload estimator
 * Helps learners maintain consistent study habits
 */
const TimePlanner = () => {
  const [selectedDay, setSelectedDay] = useState(
    weeklySchedule.scheduledDays.find((d) => d.isToday) || weeklySchedule.scheduledDays[0]
  );

  const getDayStatus = (day) => {
    if (day.isRest) return 'rest';
    if (day.completed) return 'completed';
    if (day.isToday) return 'today';
    return 'upcoming';
  };

  const getDayColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success-500 text-white';
      case 'today':
        return 'bg-primary-500 text-white ring-2 ring-primary-200';
      case 'rest':
        return 'bg-neutral-100 text-neutral-400';
      case 'upcoming':
        return 'bg-neutral-200 text-neutral-600';
      default:
        return 'bg-neutral-200 text-neutral-600';
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-neutral-800">Weekly Planner</h3>
          <p className="text-sm text-neutral-500">Track your study consistency</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔥</span>
          <div className="text-right">
            <p className="text-lg font-bold text-neutral-800">{weeklySchedule.currentStreak}</p>
            <p className="text-xs text-neutral-500">day streak</p>
          </div>
        </div>
      </div>

      {/* Week Overview */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {weeklySchedule.scheduledDays.map((day) => {
          const status = getDayStatus(day);
          return (
            <motion.button
              key={day.day}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedDay(day)}
              className={`p-2 rounded-lg text-center transition-all ${getDayColor(status)} ${
                selectedDay.day === day.day ? 'ring-2 ring-offset-2 ring-primary-400' : ''
              }`}
            >
              <p className="text-xs font-medium">{day.day}</p>
              {day.completed && (
                <svg className="w-4 h-4 mx-auto mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
              {day.isToday && !day.completed && (
                <div className="w-2 h-2 bg-white rounded-full mx-auto mt-1"></div>
              )}
              {day.isRest && (
                <span className="text-xs">😴</span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Selected Day Details */}
      <motion.div
        key={selectedDay.day}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 bg-neutral-50 rounded-lg"
      >
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-neutral-800">
            {selectedDay.isToday ? 'Today' : selectedDay.day}
          </h4>
          {selectedDay.isRest ? (
            <span className="badge badge-neutral">Rest Day</span>
          ) : selectedDay.completed ? (
            <span className="badge badge-success">Completed</span>
          ) : (
            <span className="badge badge-info">Planned</span>
          )}
        </div>

        {!selectedDay.isRest && (
          <>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Planned</span>
                <span className="font-medium">{selectedDay.planned} min</span>
              </div>
              {selectedDay.actual > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Actual</span>
                  <span className={`font-medium ${
                    selectedDay.actual >= selectedDay.planned ? 'text-success-600' : 'text-warning-600'
                  }`}>
                    {selectedDay.actual} min
                  </span>
                </div>
              )}
            </div>

            {selectedDay.isToday && !selectedDay.completed && (
              <div className="space-y-3">
                <div className="progress-bar h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(selectedDay.actual / selectedDay.planned) * 100}%` }}
                    className="progress-bar-fill bg-primary-500"
                  />
                </div>
                <p className="text-xs text-neutral-500 text-center">
                  {selectedDay.planned - selectedDay.actual} min remaining to reach today's goal
                </p>
                <button className="btn btn-primary w-full">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Start Session
                </button>
              </div>
            )}
          </>
        )}

        {selectedDay.isRest && (
          <p className="text-sm text-neutral-500">
            Rest is important for learning! Your brain consolidates knowledge during breaks.
          </p>
        )}
      </motion.div>

      {/* Quick Stats */}
      <div className="mt-4 pt-4 border-t border-neutral-100 flex justify-between text-sm">
        <div>
          <span className="text-neutral-500">Best streak</span>
          <p className="font-semibold text-neutral-800">{weeklySchedule.bestStreak} days</p>
        </div>
        <div className="text-right">
          <span className="text-neutral-500">Weekly target</span>
          <p className="font-semibold text-neutral-800">
            {weeklySchedule.scheduledDays.reduce((acc, d) => acc + d.planned, 0)} min
          </p>
        </div>
      </div>
    </div>
  );
};

export default TimePlanner;
