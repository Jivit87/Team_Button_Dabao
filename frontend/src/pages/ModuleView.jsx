import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { 
  Play, 
  Pause, 
  X, 
  Check, 
  ChevronLeft,
  Video,
  HelpCircle,
  Code,
  FolderOpen,
  Clock,
  Award
} from 'lucide-react';
import { BiteSelector, InterventionModal, EndNudge } from '../components/Module';
import { CelebrationOverlay, MotivationToast } from '../components/common';
import { courseModules, biteSizedContent, momentumData } from '../data/dummyData';

/**
 * ModuleView - Immersive learning experience (Udemy Style)
 * Nielsen's Heuristic #3: User control and freedom
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
          if (newTime === 300) {
            setMotivationMessage("5 minutes of focused learning! You're doing great!");
            setShowMotivation(true);
          }
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
            className="bg-success-50 border border-success-200 rounded-xl p-4 max-w-md shadow-card"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-success-100 flex items-center justify-center">
                <Award className="w-5 h-5 text-success-600" />
              </div>
              <div>
                <p className="font-semibold text-success-700">Great job!</p>
                <p className="text-sm text-success-600">Score: {score}% • +15 XP earned!</p>
              </div>
            </div>
          </motion.div>
        ),
        { duration: 4000 }
      );
      
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
            className="bg-accent-50 border border-accent-200 rounded-xl p-4 max-w-md shadow-card"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-accent-600" />
              </div>
              <div>
                <p className="font-semibold text-accent-700">Keep trying!</p>
                <p className="text-sm text-accent-600">Score: {score}% • You're getting better!</p>
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
            className="bg-success-50 border border-success-200 rounded-xl p-4 max-w-md shadow-card"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-success-100 flex items-center justify-center">
                <Check className="w-5 h-5 text-success-600" />
              </div>
              <div>
                <p className="font-semibold text-success-700">Lesson Complete!</p>
                <p className="text-sm text-success-600">+{selectedContent.xp || 15} XP earned!</p>
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

  const totalProgress = (completedBites.length / biteSizedContent.length) * 100;

  const getContentIcon = (type) => {
    switch (type) {
      case 'video': return Video;
      case 'quiz': return HelpCircle;
      case 'exercise': return Code;
      case 'project': return FolderOpen;
      default: return Video;
    }
  };

  if (!module) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <FolderOpen className="w-16 h-16 text-u-muted mb-4" />
        <h2 className="text-2xl font-bold text-u-black mb-2">Module not found</h2>
        <p className="text-u-gray mb-6">The module you're looking for doesn't exist.</p>
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
            <div className="flex items-center gap-2 text-sm text-u-muted mb-2">
              <Link to="/" className="hover:text-primary-500 transition-colors flex items-center gap-1">
                <ChevronLeft className="w-4 h-4" />
                Dashboard
              </Link>
              <span>/</span>
              <span className="text-u-gray">Module {module.id}</span>
            </div>
            <h1 className="text-2xl font-bold text-u-black mb-1">{module.title}</h1>
            <p className="text-u-gray">{module.description}</p>
          </div>

          {/* Session Timer */}
          <div className="flex items-center gap-3 px-4 py-3 bg-u-bg rounded-xl border border-u-border">
            <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-success-500 animate-pulse' : 'bg-u-muted'}`} />
            <Clock className="w-5 h-5 text-u-muted" />
            <span className="font-mono text-xl font-bold text-u-black">{formatTime(sessionTime)}</span>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-u-gray">Module Progress</span>
            <span className="font-semibold text-primary-500">{Math.round(totalProgress)}%</span>
          </div>
          <div className="progress-bar h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${totalProgress}%` }}
              transition={{ duration: 0.8 }}
              className="h-full bg-primary-500"
            />
          </div>
          <p className="text-xs text-u-muted mt-2">
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
        <h3 className="text-lg font-semibold text-u-black mb-4">Choose Your Next Lesson</h3>
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
                <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                  {(() => { const Icon = getContentIcon(selectedContent.type); return <Icon className="w-5 h-5 text-primary-500" />; })()}
                </div>
                <div>
                  <h3 className="font-semibold text-u-black">{selectedContent.title}</h3>
                  <p className="text-sm text-u-muted">{selectedContent.duration} min • +{selectedContent.xp || 15} XP</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedContent(null)}
                className="p-2 hover:bg-u-bg rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-u-muted" />
              </button>
            </div>

            {/* Video Content */}
            {selectedContent.type === 'video' && (
              <div className="space-y-4">
                <div className="aspect-video bg-u-charcoal rounded-2xl flex items-center justify-center relative overflow-hidden border border-u-border">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="relative z-10 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-card hover:shadow-card-hover transition-all hover:scale-105"
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8 text-u-black" />
                    ) : (
                      <Play className="w-8 h-8 text-u-black ml-1" />
                    )}
                  </button>
                  <p className="absolute bottom-4 left-4 text-white/70 text-sm">
                    Simulated video player for demo
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-u-muted">{selectedContent.duration} min video</span>
                  <button onClick={handleMarkComplete} className="btn-primary bg-success-500 hover:bg-success-600 border-none">
                    <Check className="w-4 h-4" />
                    <span>Mark Complete</span>
                  </button>
                </div>
              </div>
            )}

            {/* Quiz Content */}
            {selectedContent.type === 'quiz' && (
              <div className="space-y-4">
                <div className="p-6 bg-u-bg rounded-2xl border border-u-border">
                  <p className="font-medium text-u-black mb-4">
                    What is the output of the following code?
                  </p>
                  <pre className="p-4 bg-u-charcoal text-white rounded-xl text-sm font-mono mb-6 overflow-x-auto">
{`for i in range(3):
    print(i * 2)`}
                  </pre>
                  <div className="grid grid-cols-2 gap-3">
                    {['0 2 4', '1 2 3', '0 1 2', '2 4 6'].map((option, i) => (
                      <label
                        key={i}
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          quizAnswer === option
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-u-border hover:border-primary-200 hover:bg-white'
                        }`}
                      >
                        <input
                          type="radio"
                          name="quiz"
                          value={option}
                          checked={quizAnswer === option}
                          onChange={(e) => setQuizAnswer(e.target.value)}
                          className="w-4 h-4 text-primary-500"
                        />
                        <span className="font-mono text-sm text-u-black">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-u-muted">Attempt {attempts + 1}</span>
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
                <div className="p-6 bg-u-bg rounded-2xl border border-u-border">
                  <p className="font-medium text-u-black mb-4">
                    Write a while loop that prints numbers 1 to 5:
                  </p>
                  <textarea
                    className="input font-mono text-sm h-40"
                    placeholder="# Write your code here..."
                    defaultValue={`# Start with counter = 1
counter = 1

# Your while loop here:
`}
                  />
                </div>
                <div className="flex gap-3">
                  <button className="btn-secondary flex-1">
                    <Play className="w-4 h-4" />
                    <span>Run Code</span>
                  </button>
                  <button onClick={handleMarkComplete} className="btn-primary bg-success-500 hover:bg-success-600 border-none flex-1">
                    <Check className="w-4 h-4" />
                    <span>Submit Solution</span>
                  </button>
                </div>
              </div>
            )}

            {/* Project Content */}
            {selectedContent.type === 'project' && (
              <div className="space-y-4">
                <div className="p-6 bg-primary-50 rounded-2xl border border-primary-200">
                  <h4 className="font-bold text-primary-600 text-lg mb-2">Mini Project: Number Guessing Game</h4>
                  <p className="text-u-gray mb-4">
                    Create a simple game where the computer picks a random number and the user tries to guess it!
                  </p>
                  <div className="space-y-2 text-sm text-u-gray">
                    <p className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-success-500" />
                      Use a while loop to keep asking for guesses
                    </p>
                    <p className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-success-500" />
                      Give hints: "Too high!" or "Too low!"
                    </p>
                    <p className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-success-500" />
                      Count the number of attempts
                    </p>
                  </div>
                </div>
                <button onClick={handleMarkComplete} className="btn-primary w-full py-4">
                  <FolderOpen className="w-5 h-5" />
                  <span>Open Project Workspace</span>
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
