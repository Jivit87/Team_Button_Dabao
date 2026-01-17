import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  MessageCircle, 
  Users, 
  Trophy, 
  Flame,
  Plus,
  Heart,
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import { 
  buddySuggestions, 
  accountabilityBuddy, 
  discussionThreads, 
  momentumData 
} from '../data/dummyData';

/**
 * Community - Accountability-focused community page (Udemy Style)
 * Nielsen's Heuristic #4: Consistency and standards
 */
const Community = () => {
  const [activeTab, setActiveTab] = useState('buddies');

  const tabs = [
    { id: 'buddies', label: 'Study Buddies', icon: Users },
    { id: 'discussions', label: 'Discussions', icon: MessageSquare },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-u-black">Community</h1>
        <p className="text-u-gray">Connect with fellow learners and stay accountable</p>
      </motion.div>

      {/* Current Buddy Card */}
      {accountabilityBuddy && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card bg-gradient-to-r from-primary-50 to-white border-primary-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="avatar w-16 h-16 text-xl bg-primary-500 text-white flex items-center justify-center rounded-full">
                  {accountabilityBuddy.name.split(' ').map(n => n[0]).join('')}
                </div>
                {accountabilityBuddy.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success-500 rounded-full border-4 border-white" />
                )}
              </div>
              <div>
                <p className="text-xs text-primary-600 font-semibold uppercase tracking-wider mb-1">
                  Your Study Buddy
                </p>
                <h3 className="text-xl font-bold text-u-black">{accountabilityBuddy.name}</h3>
                <p className="text-sm text-u-gray">{accountabilityBuddy.sharedGoal || 'Learning together'}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-center px-4">
                <div className="flex items-center gap-1 justify-center">
                  <Flame className="w-5 h-5 text-accent-500" />
                  <span className="text-2xl font-bold text-accent-600">{accountabilityBuddy.streak}</span>
                </div>
                <p className="text-xs text-u-muted">Their Streak</p>
              </div>
              <div className="text-center px-4 border-l border-u-border">
                <span className="text-2xl font-bold text-success-600">{accountabilityBuddy.mutualEncouragements || 12}</span>
                <p className="text-xs text-u-muted">Cheers</p>
              </div>
              <button className="btn-primary ml-4">
                <MessageCircle className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex gap-2 p-1 bg-u-bg rounded-xl w-fit border border-u-border"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-primary-500 shadow-sm border border-u-border'
                  : 'text-u-gray hover:text-u-black'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </motion.div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'buddies' && (
          <motion.div
            key="buddies"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-u-black">Suggested Study Buddies</h3>
            <p className="text-sm text-u-gray">Matched based on your goals, timezone, and learning pace</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {buddySuggestions.map((buddy, index) => (
                <motion.div
                  key={buddy.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card hover:border-primary-200 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="avatar w-10 h-10 text-sm bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold">
                          {buddy.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        {buddy.isOnline && (
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success-500 rounded-full border-2 border-white" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold text-u-black">{buddy.name}</h4>
                        <p className="text-xs text-u-muted">{buddy.location}</p>
                      </div>
                    </div>
                    <span className="badge-success">{buddy.matchScore}% match</span>
                  </div>

                  <p className="text-sm text-u-gray mb-3">{buddy.goal}</p>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-1">
                      <Flame className="w-4 h-4 text-accent-500" />
                      <span className="text-sm font-semibold text-accent-600">{buddy.streak}</span>
                    </div>
                    <div className="text-sm text-u-muted">
                      Module {buddy.currentModule}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {buddy.sharedInterests?.slice(0, 3).map((interest, i) => (
                      <span key={i} className="badge-neutral text-xs">{interest}</span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button className="btn-primary flex-1 btn-sm">
                      Connect
                    </button>
                    <button className="btn-secondary flex-1 btn-sm">
                      Profile
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'discussions' && (
          <motion.div
            key="discussions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-u-black">Recent Discussions</h3>
              <button className="btn-primary btn-sm">
                <Plus className="w-4 h-4" />
                <span>New Post</span>
              </button>
            </div>

            <div className="space-y-3">
              {discussionThreads.map((thread, index) => (
                <motion.div
                  key={thread.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="card flex items-center gap-4 hover:border-primary-200 transition-colors cursor-pointer"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-u-black">{thread.title}</h4>
                      {thread.isHot && (
                        <span className="badge-accent">
                          <Flame className="w-3 h-3" /> Hot
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-u-muted">
                      <span>{thread.author}</span>
                      <span>•</span>
                      <span>{thread.replies} replies</span>
                      <span>•</span>
                      <span>{thread.lastActivity}</span>
                    </div>
                    <div className="flex gap-1 mt-2">
                      {thread.tags.map((tag, i) => (
                        <span key={i} className="badge-neutral text-xs">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-u-muted">
                    <Heart className="w-4 h-4" />
                    <span className="font-medium">{thread.likes}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'leaderboard' && (
          <motion.div
            key="leaderboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="card"
          >
            <h3 className="text-lg font-semibold text-u-black mb-6">Weekly Streak Leaderboard</h3>
            
            <div className="space-y-3">
              {[
                { rank: 1, name: 'Rahul Verma', streak: 12, xp: 450, badge: 'gold' },
                { rank: 2, name: 'Anjali Patel', streak: 9, xp: 380, badge: 'silver' },
                { rank: 3, name: 'You', streak: momentumData.currentStreak, xp: 337, badge: 'bronze', isYou: true },
                { rank: 4, name: 'Priya Sharma', streak: 5, xp: 290 },
                { rank: 5, name: 'Vikram Singh', streak: 3, xp: 210 },
              ].map((user, index) => (
                <motion.div
                  key={user.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-4 p-4 rounded-xl border ${
                    user.isYou
                      ? 'bg-primary-50 border-primary-200'
                      : 'bg-white border-u-border'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    user.badge === 'gold' ? 'bg-accent-100 text-accent-600' :
                    user.badge === 'silver' ? 'bg-u-border text-u-gray' :
                    user.badge === 'bronze' ? 'bg-orange-100 text-orange-600' :
                    'bg-u-bg text-u-muted'
                  }`}>
                    {user.rank}
                  </div>
                  <div className="avatar w-10 h-10 text-sm bg-u-charcoal text-white flex items-center justify-center rounded-full font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${user.isYou ? 'text-primary-500' : 'text-u-black'}`}>
                      {user.name}
                    </p>
                    <p className="text-xs text-u-muted">{user.xp} XP this week</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Flame className="w-5 h-5 text-accent-500" />
                    <span className="text-xl font-bold text-accent-600">{user.streak}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Community;
