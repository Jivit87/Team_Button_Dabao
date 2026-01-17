import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MomentumCard,
  TodaysMission,
  StreakVis,
  CDVDisplay,
  SkillHeatmap,
  PersonalizedPathWidget,
} from '../components/Dashboard';
import { CelebrationOverlay, MotivationToast, WelcomeBackModal } from '../components/common';
import { 
  userProfile, 
  learnerMetrics, 
  courseModules, 
  momentumData,
  accountabilityBuddy,
  motivationalMessages, 
} from '../data/dummyData';

/**
 * Home - Main Dashboard with Momentum Engine
 * Focus: Today's Mission, Streak, and Quick Progress
 */
const Home = () => {
  const navigate = useNavigate();
  const [showCelebration, setShowCelebration] = useState(false);
  const [showMotivation, setShowMotivation] = useState(false);
  const [motivationMessage, setMotivationMessage] = useState('');
  const [motivationType, setMotivationType] = useState('encouragement');
  const [showWelcomeBack, setShowWelcomeBack] = useState(false);

  // Simulate returning user - show welcome back modal on first load
  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      // Simulate user returning after 3 days
      const timer = setTimeout(() => setShowWelcomeBack(true), 500);
      sessionStorage.setItem('hasSeenWelcome', 'true');
      return () => clearTimeout(timer);
    }
  }, []);

  const currentModule = courseModules.find((m) => m.isCurrentModule);

  // Show motivation toast on load
  useEffect(() => {
    const timer = setTimeout(() => {
      const messages = motivationalMessages.peerComparison;
      setMotivationMessage(messages[Math.floor(Math.random() * messages.length)]);
      setMotivationType('social');
      setShowMotivation(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Auto-hide motivation toast
  useEffect(() => {
    if (showMotivation) {
      const timer = setTimeout(() => setShowMotivation(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showMotivation]);

  const handleStartMission = () => {
    if (currentModule) {
      navigate(`/module/${currentModule.id}`);
    }
  };

  // Calculate XP progress
  const xpProgress = (learnerMetrics.levelXP / learnerMetrics.nextLevelXP) * 100;

  return (
    <div className="space-y-8">
      {/* Motivation Toast */}
      <MotivationToast
        isVisible={showMotivation}
        message={motivationMessage}
        type={motivationType}
        onClose={() => setShowMotivation(false)}
      />

      {/* Welcome Back Modal - Shows for returning users */}
      <WelcomeBackModal
        isOpen={showWelcomeBack}
        onClose={() => setShowWelcomeBack(false)}
        daysSinceLastVisit={3}
      />
      {/* Celebration Overlay */}
      <CelebrationOverlay
        isVisible={showCelebration}
        onClose={() => setShowCelebration(false)}
        achievement={{
          icon: '🔥',
          title: '7-Day Streak!',
          description: "You've been learning consistently for a week!",
          reward: 50,
        }}
      />

      {/* Hero Section - Personalized Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/30 via-accent-pink/20 to-accent-orange/30" />
        <div className="absolute inset-0 backdrop-blur-3xl" />
        
        {/* Floating orbs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-purple/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-pink/20 rounded-full blur-3xl" />

        <div className="relative p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              {/* Greeting */}
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl font-black text-white mb-2"
              >
                Welcome back, {userProfile.name}! 👋
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-neutral-300 text-lg mb-4"
              >
                You're making great progress! Keep the momentum going.
              </motion.p>

              {/* Quick Stats Row */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap items-center gap-4"
              >
                {/* Streak Badge */}
                <div className="streak-badge">
                  <span className="fire-icon">🔥</span>
                  <span className="font-bold">{momentumData.currentStreak} day streak</span>
                </div>

                {/* Level Progress */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20">
                  <span className="text-lg">⭐</span>
                  <span className="text-sm text-white font-medium">Level {learnerMetrics.level}</span>
                  <div className="w-16 h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${xpProgress}%` }}
                      className="h-full bg-accent-purple rounded-full"
                    />
                  </div>
                </div>

                {/* Course Progress */}
                <div className="flex items-center gap-2 text-sm text-neutral-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>{learnerMetrics.overallProgress}% course complete</span>
                </div>
              </motion.div>
            </div>

            {/* Buddy Card */}
            {accountabilityBuddy && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-3 px-4 py-3 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20"
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-accent-purple to-accent-pink flex items-center justify-center text-white font-bold text-lg">
                    {accountabilityBuddy.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  {accountabilityBuddy.isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-success-500 rounded-full border-2 border-dark-100" />
                  )}
                </div>
                <div>
                  <p className="text-xs text-neutral-400">Study Buddy</p>
                  <p className="text-white font-medium">{accountabilityBuddy.name}</p>
                  <p className="text-xs text-success-400">Online now</p>
                </div>
                <Link
                  to="/community"
                  className="ml-2 p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Today's Mission (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Mission - Hero Widget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <TodaysMission onStartMission={handleStartMission} />
          </motion.div>

          {/* Momentum Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <MomentumCard />
          </motion.div>

          {/* CDV Display - Reframed as Learning Compass */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <CDVDisplay />
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Streak Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <StreakVis />
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card"
          >
            <h3 className="text-lg font-bold text-neutral-100 mb-4">This Week's Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-xl text-center">
                <p className="text-2xl font-black text-gradient">{learnerMetrics.timeSpentHours}h</p>
                <p className="text-xs text-neutral-400">Time Spent</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl text-center">
                <p className="text-2xl font-black text-success-400">{learnerMetrics.averageQuizScore}%</p>
                <p className="text-xs text-neutral-400">Avg Score</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl text-center">
                <p className="text-2xl font-black text-accent-purple">{learnerMetrics.totalXP}</p>
                <p className="text-xs text-neutral-400">Total XP</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl text-center">
                <p className="text-2xl font-black text-accent-orange">{learnerMetrics.assignmentAttempts}</p>
                <p className="text-xs text-neutral-400">Assignments</p>
              </div>
            </div>
          </motion.div>

          {/* Skill Progress Compact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <SkillHeatmap />
          </motion.div>
        </div>
      </div>

      {/* Personalized Path */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <PersonalizedPathWidget />
      </motion.div>
    </div>
  );
};

export default Home;
