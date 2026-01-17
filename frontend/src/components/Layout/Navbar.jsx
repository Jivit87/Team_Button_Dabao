import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Settings, 
  Search,
  Flame,
  Star,
  TrendingUp
} from 'lucide-react';
import { userProfile, learnerMetrics, momentumData } from '../../data/dummyData';

const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const xpProgress = (learnerMetrics.levelXP / learnerMetrics.nextLevelXP) * 100;

  const notifications = [
    { id: 1, text: 'Priya just completed her lesson!', time: '2m ago', type: 'social' },
    { id: 2, text: "You're 1 lesson away from Module 3 completion!", time: '1h ago', type: 'progress' },
    { id: 3, text: 'New study buddy suggestion available', time: '3h ago', type: 'buddy' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-u-border">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left - Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-u-muted" />
          <input
            type="text"
            placeholder="Search courses, topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pl-10"
          />
        </div>

        {/* Center - Progress Indicators */}
        <div className="hidden md:flex items-center gap-6 mx-8">
          {/* Streak */}
          <div className="flex items-center gap-2">
            <div className="p-2 rounded bg-accent-100">
              <Flame className="w-5 h-5 text-accent-600" />
            </div>
            <span className="font-bold text-u-black">{momentumData.currentStreak}</span>
          </div>

          {/* Level */}
          <div className="flex items-center gap-2">
            <div className="p-2 rounded bg-primary-100">
              <Star className="w-5 h-5 text-primary-500" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-u-gray">Lvl {learnerMetrics.level}</span>
              <div className="w-20 h-2 bg-u-border rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${xpProgress}%` }}
                  className="h-full bg-primary-500 rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Course Progress */}
          <div className="flex items-center gap-2">
            <div className="p-2 rounded bg-success-100">
              <TrendingUp className="w-5 h-5 text-success-600" />
            </div>
            <span className="text-sm">
              <span className="font-bold text-success-600">{learnerMetrics.overallProgress}%</span>
              <span className="text-u-muted ml-1">complete</span>
            </span>
          </div>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 hover:bg-u-bg rounded transition-colors"
            >
              <Bell className="w-5 h-5 text-u-gray" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary-500 rounded-full" />
            </button>

            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg border border-u-border overflow-hidden shadow-elevated"
              >
                <div className="p-4 border-b border-u-border">
                  <h3 className="font-semibold text-u-black">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div key={notif.id} className="p-4 hover:bg-u-bg transition-colors cursor-pointer border-b border-u-border last:border-0">
                      <p className="text-sm text-u-black">{notif.text}</p>
                      <p className="text-xs text-u-muted mt-1">{notif.time}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Settings */}
          <Link
            to="/settings"
            className="p-2.5 hover:bg-u-bg rounded transition-colors"
          >
            <Settings className="w-5 h-5 text-u-gray" />
          </Link>

          {/* Profile */}
          <Link
            to="/settings"
            className="flex items-center gap-2 p-1 hover:bg-u-bg rounded transition-colors"
          >
            <div className="avatar avatar-md">
              {userProfile.name.charAt(0)}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
