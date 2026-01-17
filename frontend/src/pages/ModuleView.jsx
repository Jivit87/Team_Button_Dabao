import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { BiteSelector, InterventionModal, EndNudge } from '../components/Module';
import { CelebrationOverlay, MotivationToast } from '../components/common';
import { courseModules, biteSizedContent, momentumData, motivationalMessages } from '../data/dummyData';

/**
 * ModuleView - Immersive learning experience with dark theme
 */
const ModuleView = () => {
  const { id } = useParams();
  const moduleId = parseInt(id);

  const [selectedContent, setSelectedContent] = useState(null);
  const [showIntervention, setShowIntervention] = useState(false);
  const [showEndNudge, setShowEndNudge] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showMotivation, setShowMotivation] = useState(false);
  const [motivationMessage, setMotivationMessage] = useState('');
  const [completedBites, setCompletedBites] = useState(['bite_1', 'bite_2', 'bite_3']);

  const module = courseModules.find((m) => m.id === moduleId);

  // Session timer
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setSessionTime((prev) => {
          const newTime = prev + 1;
          // Show encouragement at 5 minutes
          if (newTime === 300) {
            setMotivationMessage("🎯 5 minutes of focused learning! You're doing great!");
            setShowMotivation(true);
          }
          // Show break suggestion at 15 minutes
          if (newTime === 900) {
            setShowEndNudge(true);
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Auto-hide motivation
  useEffect(() => {
    if (showMotivation) {
      const timer = setTimeout(() => setShowMotivation(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showMotivation]);

  const handleContentSelect = (content) => {
    setSelectedContent(content);
    setIsPlaying(true);
    setQuizAnswer('');
    setAttempts(0);
  };

  const handleQuizSubmit = () => {
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    const score = Math.random() > 0.5 ? Math.floor(Math.random() * 30) + 70 : Math.floor(Math.random() * 30) + 20;

    if (score >= 70) {
      toast.custom(
        (t) => (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-dark border border-success-500/30 rounded-2xl p-4 max-w-md"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-success-500/20 flex items-center justify-center">
                <span className="text-xl">🎉</span>
              </div>
              <div>
                <p className="font-bold text-success-400">Great job!</p>
                <p className="text-sm text-neutral-300">Score: {score}% • +15 XP earned!</p>
              </div>
            </div>
          </motion.div>
        ),
        { duration: 4000 }
      );
      
      // Mark as complete and maybe celebrate
      if (selectedContent && !completedBites.includes(selectedContent.id)) {
        setCompletedBites([...completedBites, selectedContent.id]);
        if (completedBites.length + 1 === biteSizedContent.length) {
          setShowCelebration(true);
        }
      }
    } else {
      toast.custom(
        (t) => (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-dark border border-warning-500/30 rounded-2xl p-4 max-w-md"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-warning-500/20 flex items-center justify-center">
                <span className="text-xl">💪</span>
              </div>
              <div>
                <p className="font-bold text-warning-400">Keep trying!</p>
                <p className="text-sm text-neutral-300">Score: {score}% • You're getting better!</p>
              </div>
            </div>
          </motion.div>
        ),
        { duration: 4000 }
      );

      if (newAttempts >= 3 || score < 50) {
        setTimeout(() => setShowIntervention(true), 2000);
      }
    }

    setQuizAnswer('');
  };

  const handleMarkComplete = () => {
    if (selectedContent && !completedBites.includes(selectedContent.id)) {
      setCompletedBites([...completedBites, selectedContent.id]);
      
      toast.custom(
        (t) => (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-dark border border-success-500/30 rounded-2xl p-4 max-w-md"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-success-500/20 flex items-center justify-center">
                <span className="text-xl">✅</span>
              </div>
              <div>
                <p className="font-bold text-success-400">Lesson Complete!</p>
                <p className="text-sm text-neutral-300">+{selectedContent.xp || 15} XP earned!</p>
              </div>
            </div>
          </motion.div>
        ),
        { duration: 3000 }
      );
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate progress
  const totalProgress = (completedBites.length / biteSizedContent.length) * 100;

  if (!module) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <span className="text-6xl mb-4">📚</span>
        <h2 className="text-2xl font-bold text-neutral-100 mb-2">Module not found</h2>
        <p className="text-neutral-400 mb-6">The module you're looking for doesn't exist.</p>
        <Link to="/" className="btn-primary">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Motivation Toast */}
      <MotivationToast
        isVisible={showMotivation}
        message={motivationMessage}
        type="success"
        onClose={() => setShowMotivation(false)}
      />

      {/* Celebration */}
      <CelebrationOverlay
        isVisible={showCelebration}
        onClose={() => setShowCelebration(false)}
        achievement={{
          icon: '🏆',
          title: 'Module Complete!',
          description: 'You finished all lessons in this module!',
          reward: 100,
        }}
      />

      {/* Module Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-sm text-neutral-400 mb-2">
              <Link to="/" className="hover:text-accent-purple transition-colors">Dashboard</Link>
              <span>/</span>
              <span className="text-neutral-300">Module {module.id}</span>
            </div>
            <h1 className="text-2xl font-black text-neutral-100 mb-1">{module.title}</h1>
            <p className="text-neutral-400">{module.description}</p>
          </div>

          {/* Session Timer */}
          <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/10">
            <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-success-500 animate-pulse' : 'bg-neutral-500'}`} />
            <span className="font-mono text-xl font-bold text-neutral-100">{formatTime(sessionTime)}</span>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-neutral-400">Module Progress</span>
            <span className="font-bold text-accent-purple">{Math.round(totalProgress)}%</span>
          </div>
          <div className="progress-bar h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${totalProgress}%` }}
              transition={{ duration: 0.8 }}
              className="progress-bar-gradient"
            />
          </div>
          <p className="text-xs text-neutral-500 mt-2">
            {completedBites.length} of {biteSizedContent.length} lessons completed
          </p>
        </div>
      </motion.div>

      {/* Bite-sized Content Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
      >
        <h3 className="text-lg font-bold text-neutral-100 mb-4">Choose Your Next Lesson</h3>
        <BiteSelector
          items={biteSizedContent.map(item => ({
            ...item,
            completed: completedBites.includes(item.id),
          }))}
          selectedItem={selectedContent}
          onSelect={handleContentSelect}
        />
      </motion.div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        {selectedContent && (
          <motion.div
            key={selectedContent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="card"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent-purple/20 flex items-center justify-center">
                  {selectedContent.type === 'video' && (
                    <svg className="w-5 h-5 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    </svg>
                  )}
                  {selectedContent.type === 'quiz' && (
                    <svg className="w-5 h-5 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {selectedContent.type === 'exercise' && (
                    <svg className="w-5 h-5 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  )}
                  {selectedContent.type === 'project' && (
                    <svg className="w-5 h-5 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-neutral-100">{selectedContent.title}</h3>
                  <p className="text-sm text-neutral-400">{selectedContent.duration} min • +{selectedContent.xp || 15} XP</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedContent(null)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Video Content */}
            {selectedContent.type === 'video' && (
              <div className="space-y-4">
                <div className="aspect-video bg-dark-300 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/20 to-accent-pink/20" />
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="relative z-10 w-20 h-20 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110"
                  >
                    {isPlaying ? (
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                      </svg>
                    ) : (
                      <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>
                  <p className="absolute bottom-4 left-4 text-white/60 text-sm">
                    Simulated video player for demo
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-400">{selectedContent.duration} min video</span>
                  <button onClick={handleMarkComplete} className="btn-success">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Mark Complete
                  </button>
                </div>
              </div>
            )}

            {/* Quiz Content */}
            {selectedContent.type === 'quiz' && (
              <div className="space-y-4">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <p className="font-semibold text-neutral-100 mb-4">
                    What is the output of the following code?
                  </p>
                  <pre className="p-4 bg-dark-300 text-neutral-100 rounded-xl text-sm font-mono mb-6 overflow-x-auto">
{`for i in range(3):
    print(i * 2)`}
                  </pre>
                  <div className="grid grid-cols-2 gap-3">
                    {['0 2 4', '1 2 3', '0 1 2', '2 4 6'].map((option, i) => (
                      <label
                        key={i}
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          quizAnswer === option
                            ? 'border-accent-purple bg-accent-purple/10'
                            : 'border-white/10 hover:border-accent-purple/50 hover:bg-white/5'
                        }`}
                      >
                        <input
                          type="radio"
                          name="quiz"
                          value={option}
                          checked={quizAnswer === option}
                          onChange={(e) => setQuizAnswer(e.target.value)}
                          className="w-4 h-4 text-accent-purple"
                        />
                        <span className="font-mono text-sm text-neutral-200">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-400">Attempt {attempts + 1}</span>
                  <button
                    onClick={handleQuizSubmit}
                    disabled={!quizAnswer}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Answer
                  </button>
                </div>
              </div>
            )}

            {/* Exercise Content */}
            {selectedContent.type === 'exercise' && (
              <div className="space-y-4">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <p className="font-semibold text-neutral-100 mb-4">
                    Write a while loop that prints numbers 1 to 5:
                  </p>
                  <textarea
                    className="input font-mono text-sm h-40 bg-dark-300 text-neutral-100"
                    placeholder="# Write your code here..."
                    defaultValue={`# Start with counter = 1
counter = 1

# Your while loop here:
`}
                  />
                </div>
                <div className="flex gap-3">
                  <button className="btn-secondary flex-1">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    </svg>
                    Run Code
                  </button>
                  <button onClick={handleMarkComplete} className="btn-success flex-1">
                    Submit Solution
                  </button>
                </div>
              </div>
            )}

            {/* Project Content */}
            {selectedContent.type === 'project' && (
              <div className="space-y-4">
                <div className="p-6 bg-gradient-to-br from-accent-purple/10 to-accent-pink/10 rounded-2xl border border-accent-purple/30">
                  <h4 className="font-bold text-accent-purple text-lg mb-2">Mini Project: Number Guessing Game</h4>
                  <p className="text-neutral-300 mb-4">
                    Create a simple game where the computer picks a random number and the user tries to guess it!
                  </p>
                  <div className="space-y-2 text-sm text-neutral-300">
                    <p className="flex items-center gap-2">
                      <span className="text-success-400">✅</span>
                      Use a while loop to keep asking for guesses
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-success-400">✅</span>
                      Give hints: "Too high!" or "Too low!"
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-success-400">✅</span>
                      Count the number of attempts
                    </p>
                  </div>
                </div>
                <button onClick={handleMarkComplete} className="btn-glow w-full py-4">
                  Open Project Workspace
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Intervention Modal */}
      <InterventionModal
        isOpen={showIntervention}
        onClose={() => setShowIntervention(false)}
        trigger={attempts >= 3 ? 'attempts' : 'score'}
      />

      {/* End Session Nudge */}
      <EndNudge
        isVisible={showEndNudge}
        onDismiss={() => setShowEndNudge(false)}
        duration={Math.floor(sessionTime / 60)}
      />
    </div>
  );
};

export default ModuleView;
