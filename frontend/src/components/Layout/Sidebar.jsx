import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { courseModules, momentumData, accountabilityBuddy } from '../../data/dummyData';

/**
 * Sidebar - Premium dark theme navigation with quick actions
 */
const Sidebar = () => {
  const location = useLocation();

  const mainNav = [
    { path: '/', icon: 'home', label: 'Dashboard' },
    { path: '/module/3', icon: 'book', label: 'Continue Learning' },
    { path: '/community', icon: 'users', label: 'Community' },
    { path: '/settings', icon: 'settings', label: 'Settings' },
  ];

  const currentModule = courseModules.find(m => m.isCurrentModule);

  const getIcon = (name) => {
    switch (name) {
      case 'home':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case 'book':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'users':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case 'settings':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <aside className="hidden lg:flex flex-col w-72 min-h-screen glass-dark border-r border-white/5">
      <div className="flex flex-col flex-1 p-4">
        {/* Main Navigation */}
        <nav className="space-y-1">
          {mainNav.map((item) => {
            const isActive = location.pathname === item.path || 
                           (item.path.includes('/module') && location.pathname.includes('/module'));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${isActive ? 'nav-item-active' : ''}`}
              >
                <span className={isActive ? 'text-accent-purple' : ''}>
                  {getIcon(item.icon)}
                </span>
                <span>{item.label}</span>
                {item.label === 'Continue Learning' && currentModule && (
                  <span className="ml-auto text-xs text-neutral-500">{currentModule.progress}%</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Quick Actions */}
        <div className="mt-8">
          <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider px-4 mb-3">
            Quick Actions
          </h4>
          <div className="space-y-2">
            <Link
              to="/module/3"
              className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-accent-purple/20 to-accent-pink/20 border border-accent-purple/30 hover:border-accent-purple/50 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-accent-purple/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-200">Start Mission</p>
                <p className="text-xs text-neutral-500">~8 min today</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Streak Reminder */}
        <div className="mt-6 p-4 rounded-xl bg-accent-orange/10 border border-accent-orange/30">
          <div className="flex items-center gap-2 mb-2">
            <span className="fire-icon">🔥</span>
            <span className="font-bold text-accent-orange">{momentumData.currentStreak}-day streak</span>
          </div>
          <p className="text-xs text-neutral-400">
            Complete today's mission to keep your streak alive!
          </p>
        </div>

        {/* Buddy Widget */}
        {accountabilityBuddy && (
          <div className="mt-6">
            <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider px-4 mb-3">
              Study Buddy
            </h4>
            <Link
              to="/community"
              className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-accent-purple to-accent-pink flex items-center justify-center text-white font-bold text-sm">
                  {accountabilityBuddy.name.split(' ').map(n => n[0]).join('')}
                </div>
                {accountabilityBuddy.isOnline && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success-500 rounded-full border-2 border-dark-100" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-200 truncate">
                  {accountabilityBuddy.name}
                </p>
                <p className="text-xs text-success-400">Online now</p>
              </div>
              <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </Link>
          </div>
        )}

        {/* Course Progress */}
        <div className="mt-auto pt-6">
          <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider px-4 mb-3">
            Course Progress
          </h4>
          <div className="space-y-3">
            {courseModules.slice(0, 4).map((module) => (
              <div key={module.id} className="px-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className={`truncate ${module.isCurrentModule ? 'text-accent-purple font-medium' : 'text-neutral-400'}`}>
                    M{module.id}. {module.title}
                  </span>
                  <span className={`text-xs ${
                    module.status === 'completed' ? 'text-success-400' :
                    module.status === 'in-progress' ? 'text-accent-purple' :
                    'text-neutral-600'
                  }`}>
                    {module.progress}%
                  </span>
                </div>
                <div className="progress-bar h-1">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${module.progress}%` }}
                    className={`progress-bar-fill ${
                      module.status === 'completed' ? 'bg-success-500' :
                      module.status === 'in-progress' ? 'bg-accent-purple' :
                      'bg-neutral-700'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
