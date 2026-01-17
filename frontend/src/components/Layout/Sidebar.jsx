import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Settings, 
  Play,
  Flame,
  MessageCircle
} from 'lucide-react';
import { courseModules, momentumData, accountabilityBuddy } from '../../data/dummyData';

/**
 * Sidebar - Dark Charcoal with Red Highlights (Udemy Style)
 */
const Sidebar = () => {
  const location = useLocation();

  const mainNav = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/module/3', icon: BookOpen, label: 'Continue Learning' },
    { path: '/community', icon: Users, label: 'Community' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  const currentModule = courseModules.find(m => m.isCurrentModule);

  return (
    <aside className="hidden lg:flex flex-col w-72 min-h-screen bg-u-charcoal">
      <div className="flex flex-col flex-1 p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 px-4 py-3 mb-8">
          <div className="w-10 h-10 rounded bg-primary-500 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Momentum</h1>
            <p className="text-xs text-white/50">Learn. Grow. Achieve.</p>
          </div>
        </Link>

        {/* Main Navigation */}
        <nav className="space-y-1">
          {mainNav.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || 
                           (item.path.includes('/module') && location.pathname.includes('/module'));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${isActive ? 'nav-item-active' : ''}`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
                {item.label === 'Continue Learning' && currentModule && (
                  <span className="ml-auto text-xs text-white/50">{currentModule.progress}%</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Quick Actions */}
        <div className="mt-8">
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3 px-4">Quick Actions</h4>
          <div className="space-y-2 px-4">
            <Link
              to="/module/3"
              className="flex items-center gap-3 p-3 rounded bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="w-10 h-10 rounded bg-primary-500 flex items-center justify-center">
                <Play className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Start Mission</p>
                <p className="text-xs text-white/50">~8 min today</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Streak Reminder */}
        <div className="mt-6 mx-4 p-4 rounded bg-accent-500/20 border border-accent-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-5 h-5 text-accent-500" />
            <span className="font-semibold text-white">{momentumData.currentStreak}-day streak</span>
          </div>
          <p className="text-xs text-white/70">
            Complete today's mission to keep your streak alive!
          </p>
        </div>

        {/* Buddy Widget */}
        {accountabilityBuddy && (
          <div className="mt-6">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3 px-4">Study Buddy</h4>
            <div className="px-4">
              <Link
                to="/community"
                className="flex items-center gap-3 p-3 rounded bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="relative">
                  <div className="avatar avatar-md">
                    {accountabilityBuddy.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  {accountabilityBuddy.isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success-500 rounded-full border-2 border-u-charcoal" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {accountabilityBuddy.name}
                  </p>
                  <p className="text-xs text-success-500">Online now</p>
                </div>
                <MessageCircle className="w-4 h-4 text-white/50" />
              </Link>
            </div>
          </div>
        )}

        {/* Course Progress */}
        <div className="mt-auto pt-6">
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3 px-4">Course Progress</h4>
          <div className="space-y-3 pb-4">
            {courseModules.slice(0, 4).map((module) => (
              <div key={module.id} className="px-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className={`truncate ${module.isCurrentModule ? 'text-white font-medium' : 'text-white/70'}`}>
                    M{module.id}. {module.title}
                  </span>
                  <span className={`text-xs ${
                    module.status === 'completed' ? 'text-success-500' :
                    module.status === 'in-progress' ? 'text-primary-500' :
                    'text-white/40'
                  }`}>
                    {module.progress}%
                  </span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${module.progress}%` }}
                    className={`h-full rounded-full ${
                      module.status === 'completed' ? 'bg-success-500' :
                      module.status === 'in-progress' ? 'bg-primary-500' :
                      'bg-white/30'
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
