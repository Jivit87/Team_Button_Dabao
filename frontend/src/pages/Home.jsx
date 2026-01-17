import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame, Users, BarChart3, Clock, Award, ChevronRight, Play, Star } from 'lucide-react';
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

const Home = () => {
  const navigate = useNavigate();
  const [showCelebration, setShowCelebration] = useState(false);
  const [showMotivation, setShowMotivation] = useState(false);
  const [motivationMessage, setMotivationMessage] = useState('');
  const [motivationType, setMotivationType] = useState('encouragement');
  const [showWelcomeBack, setShowWelcomeBack] = useState(false);

  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      const timer = setTimeout(() => setShowWelcomeBack(true), 500);
      sessionStorage.setItem('hasSeenWelcome', 'true');
      return () => clearTimeout(timer);
    }
  }, []);

  const currentModule = courseModules.find((m) => m.isCurrentModule);

  useEffect(() => {
    const timer = setTimeout(() => {
      const messages = motivationalMessages.peerComparison;
      setMotivationMessage(messages[Math.floor(Math.random() * messages.length)]);
      setMotivationType('social');
      setShowMotivation(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

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

  return (
    <div className="space-y-8">
      <MotivationToast
        isVisible={showMotivation}
        message={motivationMessage}
        type={motivationType}
        onClose={() => setShowMotivation(false)}
      />
      <WelcomeBackModal
        isOpen={showWelcomeBack}
        onClose={() => setShowWelcomeBack(false)}
        daysSinceLastVisit={3}
      />
      <CelebrationOverlay
        isVisible={showCelebration}
        onClose={() => setShowCelebration(false)}
        achievement={{
          icon: <Flame className="w-12 h-12 text-accent-500" />,
          title: '7-Day Streak!',
          description: "You've been learning consistently for a week!",
          reward: 50,
        }}
      />

      {/* Hero Banner - Dark Charcoal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="promo-banner"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex-1">
            <span className="badge-accent mb-3">New Course</span>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Continue your learning journey, {userProfile.name}!
            </h1>
            <p className="text-white/70 mb-4">
              You're {learnerMetrics.overallProgress}% through the course. Keep the momentum going!
            </p>
            <button onClick={handleStartMission} className="btn-primary">
              <Play className="w-4 h-4" />
              Continue Learning
            </button>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Flame className="w-6 h-6 text-accent-500" />
                <span className="text-3xl font-bold text-white">{momentumData.currentStreak}</span>
              </div>
              <p className="text-xs text-white/50">Day Streak</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Star className="w-6 h-6 text-accent-500" />
                <span className="text-3xl font-bold text-white">{learnerMetrics.totalXP}</span>
              </div>
              <p className="text-xs text-white/50">Total XP</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <TodaysMission onStartMission={handleStartMission} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-lg font-bold text-u-black mb-4">Your Progress</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {courseModules.slice(0, 3).map((module, i) => (
                <div key={module.id} className="card">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`badge ${
                      module.status === 'completed' ? 'badge-success' :
                      module.status === 'in-progress' ? 'badge-primary' :
                      'badge-neutral'
                    }`}>
                      {module.status === 'completed' ? 'Completed' :
                       module.status === 'in-progress' ? 'In Progress' : 'Locked'}
                    </span>
                  </div>
                  <h4 className="font-semibold text-u-black mb-2 text-sm line-clamp-2">
                    {module.title}
                  </h4>
                  <div className="flex items-center justify-between text-xs text-u-muted mb-2">
                    <span>Progress</span>
                    <span className="font-semibold text-u-black">{module.progress}%</span>
                  </div>
                  <div className="progress-bar h-2">
                    <div 
                      className={`progress-fill ${
                        module.status === 'completed' ? 'bg-success-500' : 'bg-primary-500'
                      }`}
                      style={{ width: `${module.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Momentum Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <MomentumCard />
          </motion.div>

          {/* CDV Display */}
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <StreakVis />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card"
          >
            <h3 className="font-bold text-u-black mb-4">This Week</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-u-bg rounded text-center">
                <Clock className="w-5 h-5 text-primary-500 mx-auto mb-1" />
                <p className="text-xl font-bold text-u-black">{learnerMetrics.timeSpentHours}h</p>
                <p className="text-xs text-u-muted">Time Spent</p>
              </div>
              <div className="p-4 bg-u-bg rounded text-center">
                <Award className="w-5 h-5 text-success-500 mx-auto mb-1" />
                <p className="text-xl font-bold text-success-600">{learnerMetrics.averageQuizScore}%</p>
                <p className="text-xs text-u-muted">Avg Score</p>
              </div>
              <div className="p-4 bg-u-bg rounded text-center">
                <Flame className="w-5 h-5 text-accent-500 mx-auto mb-1" />
                <p className="text-xl font-bold text-primary-500">{learnerMetrics.totalXP}</p>
                <p className="text-xs text-u-muted">Total XP</p>
              </div>
              <div className="p-4 bg-u-bg rounded text-center">
                <BarChart3 className="w-5 h-5 text-u-muted mx-auto mb-1" />
                <p className="text-xl font-bold text-u-black">{learnerMetrics.assignmentAttempts}</p>
                <p className="text-xs text-u-muted">Assignments</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <SkillHeatmap />
          </motion.div>
        </div>
      </div>

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
