import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { userProfile, learnerMetrics, momentumData } from '../../data/dummyData';

/**
 * Navbar - Premium dark theme header with streak and progress
 */
const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  
  // Calculate XP progress
  const xpProgress = (learnerMetrics.levelXP / learnerMetrics.nextLevelXP) * 100;

  const notifications = [
    { id: 1, text: 'Priya just completed her mission! 🎉', time: '2m ago', type: 'social' },
    { id: 2, text: "You're 1 lesson away from Module 3 completion!", time: '1h ago', type: 'progress' },
    { id: 3, text: 'New study buddy suggestion available', time: '3h ago', type: 'buddy' },
  ];

  return (
    <header className="sticky top-0 z-30 glass-dark border-b border-white/5">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left - Logo & Brand */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-accent-purple to-accent-pink flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-black text-gradient">Momentum</h1>
            <p className="text-xs text-neutral-500 -mt-0.5">Learn. Grow. Achieve.</p>
          </div>
        </Link>

        {/* Center - Progress Bar (Desktop) */}
        <div className="hidden md:flex items-center gap-4 px-6 py-2 bg-white/5 rounded-full">
          <div className="flex items-center gap-2">
            <span className="fire-icon text-lg">🔥</span>
            <span className="text-sm font-bold text-accent-orange">{momentumData.currentStreak}</span>
          </div>
          <div className="w-px h-6 bg-white/10" />
          <div className="flex items-center gap-2">
            <span className="text-lg">⭐</span>
            <span className="text-sm font-medium text-neutral-200">Lvl {learnerMetrics.level}</span>
            <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${xpProgress}%` }}
                className="h-full bg-gradient-to-r from-accent-purple to-accent-pink rounded-full"
              />
            </div>
          </div>
          <div className="w-px h-6 bg-white/10" />
          <div className="text-sm text-neutral-300">
            <span className="font-bold text-success-400">{learnerMetrics.overallProgress}%</span> complete
          </div>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 hover:bg-white/5 rounded-xl transition-colors"
            >
              <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-pink rounded-full" />
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 top-full mt-2 w-80 glass-dark rounded-2xl border border-white/10 overflow-hidden shadow-xl"
              >
                <div className="p-4 border-b border-white/10">
                  <h3 className="font-bold text-neutral-100">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div key={notif.id} className="p-4 hover:bg-white/5 transition-colors cursor-pointer border-b border-white/5 last:border-0">
                      <p className="text-sm text-neutral-200">{notif.text}</p>
                      <p className="text-xs text-neutral-500 mt-1">{notif.time}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Settings */}
          <Link
            to="/settings"
            className="p-2.5 hover:bg-white/5 rounded-xl transition-colors"
          >
            <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </Link>

          {/* Profile */}
          <Link
            to="/settings"
            className="flex items-center gap-2 p-1.5 hover:bg-white/5 rounded-xl transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-accent-purple to-accent-pink flex items-center justify-center text-white font-bold text-sm">
              {userProfile.name.charAt(0)}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
