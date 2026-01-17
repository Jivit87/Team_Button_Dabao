import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  buddySuggestions, 
  accountabilityBuddy, 
  discussionThreads, 
  momentumData 
} from '../data/dummyData';

/**
 * Community - Accountability-focused community page (Dark Theme)
 */
const Community = () => {
  const [activeTab, setActiveTab] = useState('buddies');
  const [selectedBuddy, setSelectedBuddy] = useState(accountabilityBuddy);

  const tabs = [
    { id: 'buddies', label: 'Study Buddies', icon: '👥' },
    { id: 'discussions', label: 'Discussions', icon: '💬' },
    { id: 'leaderboard', label: 'Leaderboard', icon: '🏆' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-black text-neutral-100">Community</h1>
          <p className="text-neutral-400">Connect with fellow learners and stay accountable</p>
        </div>
      </motion.div>

      {/* Current Buddy Card */}
      {selectedBuddy && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 bg-gradient-to-r from-accent-purple/20 via-accent-pink/20 to-accent-orange/20 border border-accent-purple/30 rounded-2xl"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-accent-purple to-accent-pink flex items-center justify-center text-white font-bold text-xl">
                  {selectedBuddy.name.split(' ').map(n => n[0]).join('')}
                </div>
                {selectedBuddy.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success-500 rounded-full border-3 border-dark-100" />
                )}
              </div>
              <div>
                <p className="text-xs text-accent-purple font-semibold uppercase tracking-wider mb-1">
                  Your Study Buddy
                </p>
                <h3 className="text-xl font-bold text-neutral-100">{selectedBuddy.name}</h3>
                <p className="text-sm text-neutral-400">{selectedBuddy.sharedGoal || 'Learning together'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-center px-4">
                <div className="flex items-center gap-1 justify-center">
                  <span className="fire-icon">🔥</span>
                  <span className="text-2xl font-black text-accent-orange">{selectedBuddy.streak}</span>
                </div>
                <p className="text-xs text-neutral-500">Their Streak</p>
              </div>
              <div className="text-center px-4 border-l border-white/10">
                <span className="text-2xl font-black text-success-400">{selectedBuddy.mutualEncouragements || 12}</span>
                <p className="text-xs text-neutral-500">Cheers</p>
              </div>
              <button className="btn-primary ml-4">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Send Message
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
        className="flex gap-2 p-1 bg-white/5 rounded-2xl w-fit"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-accent-purple text-white shadow-glow-purple'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/5'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
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
            <h3 className="text-lg font-bold text-neutral-100">Suggested Study Buddies</h3>
            <p className="text-sm text-neutral-400">Matched based on your goals, timezone, and learning pace</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {buddySuggestions.map((buddy, index) => (
                <motion.div
                  key={buddy.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card hover:border-accent-purple/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-accent-purple to-accent-pink flex items-center justify-center text-white font-bold">
                          {buddy.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        {buddy.isOnline && (
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success-500 rounded-full border-2 border-dark-50" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-neutral-100">{buddy.name}</h4>
                        <p className="text-xs text-neutral-500">{buddy.location}</p>
                      </div>
                    </div>
                    <span className="badge-success">{buddy.matchScore}% match</span>
                  </div>

                  <p className="text-sm text-neutral-400 mb-3">{buddy.goal}</p>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-1">
                      <span className="fire-icon text-sm">🔥</span>
                      <span className="text-sm font-bold text-accent-orange">{buddy.streak}</span>
                    </div>
                    <div className="text-sm text-neutral-500">
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
                    <button className="btn-ghost btn-sm">
                      View Profile
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
              <h3 className="text-lg font-bold text-neutral-100">Recent Discussions</h3>
              <button className="btn-primary btn-sm">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Post
              </button>
            </div>

            <div className="space-y-3">
              {discussionThreads.map((thread, index) => (
                <motion.div
                  key={thread.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="card flex items-center gap-4 hover:border-accent-purple/30 transition-colors cursor-pointer"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-neutral-100">{thread.title}</h4>
                      {thread.isHot && (
                        <span className="badge-fire">🔥 Hot</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-neutral-500">
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
                  <div className="text-center">
                    <div className="flex items-center gap-1 text-neutral-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span className="font-bold">{thread.likes}</span>
                    </div>
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
            <h3 className="text-lg font-bold text-neutral-100 mb-6">Weekly Streak Leaderboard</h3>
            
            <div className="space-y-3">
              {[
                { rank: 1, name: 'Rahul Verma', streak: 12, xp: 450, badge: '🥇' },
                { rank: 2, name: 'Anjali Patel', streak: 9, xp: 380, badge: '🥈' },
                { rank: 3, name: 'You', streak: momentumData.currentStreak, xp: 337, badge: '🥉', isYou: true },
                { rank: 4, name: 'Priya Sharma', streak: 5, xp: 290, badge: '' },
                { rank: 5, name: 'Vikram Singh', streak: 3, xp: 210, badge: '' },
              ].map((user, index) => (
                <motion.div
                  key={user.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-4 p-4 rounded-xl ${
                    user.isYou
                      ? 'bg-accent-purple/20 border border-accent-purple/30'
                      : 'bg-white/5'
                  }`}
                >
                  <span className="text-2xl w-10 text-center">{user.badge || user.rank}</span>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-accent-purple to-accent-pink flex items-center justify-center text-white font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className={`font-semibold ${user.isYou ? 'text-accent-purple' : 'text-neutral-100'}`}>
                      {user.name}
                    </p>
                    <p className="text-xs text-neutral-500">{user.xp} XP this week</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="fire-icon text-lg">🔥</span>
                    <span className="text-xl font-black text-accent-orange">{user.streak}</span>
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
