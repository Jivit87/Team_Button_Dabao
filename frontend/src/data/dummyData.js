/**
 * dummyData.js - Mock data for the Learning Engagement Platform
 * Focus: Momentum Engine features for reducing learner drop-off
 */

// User Profile - Adult learner transitioning to data analyst
export const userProfile = {
  id: 'user_001',
  name: 'Gaurav',
  email: 'gaurav@example.com',
  location: 'Haryana, IN',
  timezone: 'IST',
  goal: 'Transition to data analyst role',
  enrollmentDate: '2026-01-01',
  currentPhase: 3,
  avatar: null,
};

// ===== MOMENTUM ENGINE DATA =====

// Streak and momentum tracking
export const momentumData = {
  currentStreak: 7,
  bestStreak: 12,
  todayCompleted: false,
  weeklyGoal: 5, // days per week
  weeklyProgress: 3, // days completed this week
  lastSessionDate: '2026-01-17',
  totalDaysActive: 23,
  momentumScore: 78, // 0-100 based on consistency
  streakHistory: [
    { date: '2026-01-11', completed: true },
    { date: '2026-01-12', completed: true },
    { date: '2026-01-13', completed: true },
    { date: '2026-01-14', completed: true },
    { date: '2026-01-15', completed: true },
    { date: '2026-01-16', completed: true },
    { date: '2026-01-17', completed: true },
    { date: '2026-01-18', completed: false }, // Today
  ],
};

// Today's micro-commitment mission
export const todaysMission = {
  id: 'mission_018',
  title: 'Master the While Loop',
  description: 'Complete a 5-minute video and one practice problem',
  estimatedTime: 8, // minutes
  difficulty: 'easy',
  reward: '+15 XP',
  steps: [
    { id: 1, title: 'Watch: While Loops Introduction', type: 'video', duration: 4, completed: false },
    { id: 2, title: 'Practice: Counter Loop', type: 'exercise', duration: 4, completed: false },
  ],
  streakBonus: 'Complete to extend your 7-day streak! 🔥',
  encouragement: 'You\'re just 8 minutes away from progress!',
};

// Quick wins - Easy achievements
export const quickWins = [
  { id: 'qw1', title: '5-min refresher', duration: 5, xp: 10, type: 'video' },
  { id: 'qw2', title: 'Quick quiz', duration: 3, xp: 15, type: 'quiz' },
  { id: 'qw3', title: 'Review notes', duration: 2, xp: 5, type: 'review' },
];

// Celebration triggers
export const celebrations = {
  streakMilestones: [3, 7, 14, 21, 30, 60, 100],
  recentAchievements: [
    { id: 'ach_1', title: 'Week Warrior', description: '7-day streak!', icon: '🔥', date: '2026-01-17' },
    { id: 'ach_2', title: 'Quick Learner', description: 'Completed 5 lessons in one day', icon: '⚡', date: '2026-01-15' },
  ],
  upcomingMilestones: [
    { type: 'streak', value: 10, label: '10-day streak', progress: 70 },
    { type: 'module', value: 'Module 3', label: 'Complete Loops Module', progress: 45 },
  ],
};

// ===== BUDDY SYSTEM DATA =====

export const accountabilityBuddy = {
  id: 'buddy_001',
  name: 'Priya Sharma',
  avatar: null,
  currentModule: 3,
  streak: 5,
  isOnline: true,
  lastActive: '10 mins ago',
  sharedGoal: 'Complete Module 3 together',
  mutualEncouragements: 12,
};

export const buddySuggestions = [
  {
    id: 'peer_1',
    name: 'Priya Sharma',
    location: 'Mumbai, IN',
    timezone: 'IST',
    goal: 'Career change to data analysis',
    currentModule: 3,
    streak: 5,
    matchScore: 95,
    isOnline: true,
    sharedInterests: ['Python', 'Data Analysis', 'Weekend Learning'],
  },
  {
    id: 'peer_2',
    name: 'Rahul Verma',
    location: 'Delhi, IN',
    timezone: 'IST',
    goal: 'Upskilling for promotion',
    currentModule: 4,
    streak: 12,
    matchScore: 88,
    isOnline: true,
    sharedInterests: ['Python', 'Career Growth'],
  },
  {
    id: 'peer_3',
    name: 'Anjali Patel',
    location: 'Bangalore, IN',
    timezone: 'IST',
    goal: 'Transition to data analyst role',
    currentModule: 3,
    streak: 9,
    matchScore: 92,
    isOnline: false,
    sharedInterests: ['Data Analysis', 'Python', 'Same Goal'],
  },
];

// ===== LEARNING PHASES =====

export const learningPhases = [
  {
    id: 1,
    name: 'Awareness & Sign-up',
    shortName: 'Sign-up',
    emotions: ['curiosity', 'hope'],
    support: 'Inspiration, platform familiarity',
    status: 'completed',
    icon: 'sparkles',
  },
  {
    id: 2,
    name: 'Orientation & Initial Engagement',
    shortName: 'Orientation',
    emotions: ['curiosity', 'hope'],
    support: 'Onboarding guidance, goal setting',
    status: 'completed',
    icon: 'compass',
  },
  {
    id: 3,
    name: 'Active Learning & Application',
    shortName: 'Active Learning',
    emotions: ['building momentum', 'growing confidence'],
    support: 'Daily missions, peer motivation',
    status: 'current',
    icon: 'book-open',
    highlight: true,
  },
  {
    id: 4,
    name: 'Advancing & Overcoming Challenges',
    shortName: 'Advancing',
    emotions: ['determination', 'mastery'],
    support: 'Advanced resources, mentorship',
    status: 'upcoming',
    icon: 'trending-up',
  },
  {
    id: 5,
    name: 'Completion & Reflection',
    shortName: 'Completion',
    emotions: ['success', 'pride'],
    support: 'Certificate, career resources',
    status: 'upcoming',
    icon: 'award',
  },
];

// ===== COURSE MODULES =====

export const courseModules = [
  {
    id: 1,
    title: 'Python Basics',
    description: 'Variables, data types, and basic syntax',
    status: 'completed',
    progress: 100,
    difficulty: 'easy',
    timeEstimate: 3,
    quizzes: [{ score: 92 }, { score: 88 }],
    xpEarned: 150,
  },
  {
    id: 2,
    title: 'Working with Strings',
    description: 'String manipulation and formatting',
    status: 'completed',
    progress: 100,
    difficulty: 'easy',
    timeEstimate: 2.5,
    quizzes: [{ score: 85 }, { score: 90 }],
    xpEarned: 120,
  },
  {
    id: 3,
    title: 'Introduction to Loops',
    description: 'For loops, while loops, and iteration patterns',
    status: 'in-progress',
    progress: 45,
    difficulty: 'medium',
    timeEstimate: 4,
    quizzes: [{ score: 60 }, { score: 45 }],
    isCurrentModule: true,
    xpEarned: 67,
  },
  {
    id: 4,
    title: 'Conditionals & Logic',
    description: 'If/else statements, boolean logic, and flow control',
    status: 'locked',
    progress: 0,
    difficulty: 'medium',
    timeEstimate: 3.5,
    quizzes: [],
    xpEarned: 0,
  },
  {
    id: 5,
    title: 'Functions & Scope',
    description: 'Defining functions, parameters, and return values',
    status: 'locked',
    progress: 0,
    difficulty: 'hard',
    timeEstimate: 5,
    quizzes: [],
    xpEarned: 0,
  },
  {
    id: 6,
    title: 'Lists & Collections',
    description: 'Working with lists, tuples, and dictionaries',
    status: 'locked',
    progress: 0,
    difficulty: 'medium',
    timeEstimate: 4,
    quizzes: [],
    xpEarned: 0,
  },
  {
    id: 7,
    title: 'File Operations',
    description: 'Reading and writing files in Python',
    status: 'locked',
    progress: 0,
    difficulty: 'medium',
    timeEstimate: 3,
    quizzes: [],
    xpEarned: 0,
  },
  {
    id: 8,
    title: 'Data Analysis Project',
    description: 'Capstone project: Analyze a real dataset',
    status: 'locked',
    progress: 0,
    difficulty: 'hard',
    timeEstimate: 8,
    quizzes: [],
    xpEarned: 0,
  },
];

// ===== LEARNER METRICS (Improved) =====

export const learnerMetrics = {
  // CDV Components (reframed positively)
  competenceDeficiency: 0.42,
  autonomyDeficiency: 0.35, // Improved with micro-commitments
  relatednessDeficiency: 0.25, // Improved with buddy system

  // Additional Progress Metrics
  overallProgress: 45,
  timeSpentHours: 4.5,
  averageQuizScore: 58,
  quizScores: [92, 88, 85, 90, 60, 45],
  forumPosts: 2,
  forumReplies: 1,
  assignmentAttempts: 4,
  lastActiveDate: '2026-01-17',

  // Positive Framing
  consistencyScore: 85, // Based on streaks
  engagementTrend: 'improving', // up, down, stable
  dropoutRisk: 0.25, // Reduced with momentum features
  predictedCompletion: '2026-02-08',
  estimatedHoursLeft: 12,
  weeksRemaining: 3,

  // XP System
  totalXP: 337,
  levelXP: 87,
  nextLevelXP: 100,
  level: 4,
};

// ===== SKILL HEATMAP =====

export const skillMastery = [
  { name: 'Variables', category: 'Basics', mastery: 95, color: 'green' },
  { name: 'Data Types', category: 'Basics', mastery: 90, color: 'green' },
  { name: 'Operators', category: 'Basics', mastery: 85, color: 'green' },
  { name: 'Strings', category: 'Basics', mastery: 88, color: 'green' },
  { name: 'Input/Output', category: 'Basics', mastery: 80, color: 'green' },
  
  { name: 'For Loops', category: 'Loops', mastery: 45, color: 'yellow' },
  { name: 'While Loops', category: 'Loops', mastery: 35, color: 'red' },
  { name: 'Nested Loops', category: 'Loops', mastery: 20, color: 'red' },
  { name: 'Loop Control', category: 'Loops', mastery: 30, color: 'red' },
  { name: 'Iteration Patterns', category: 'Loops', mastery: 40, color: 'yellow' },
  
  { name: 'If/Else', category: 'Conditionals', mastery: 25, color: 'red' },
  { name: 'Boolean Logic', category: 'Conditionals', mastery: 0, color: 'gray' },
  { name: 'Nested Conditionals', category: 'Conditionals', mastery: 0, color: 'gray' },
  { name: 'Switch Patterns', category: 'Conditionals', mastery: 0, color: 'gray' },
  { name: 'Guard Clauses', category: 'Conditionals', mastery: 0, color: 'gray' },
  
  { name: 'Function Def', category: 'Functions', mastery: 0, color: 'gray' },
  { name: 'Parameters', category: 'Functions', mastery: 0, color: 'gray' },
  { name: 'Return Values', category: 'Functions', mastery: 0, color: 'gray' },
  { name: 'Scope', category: 'Functions', mastery: 0, color: 'gray' },
  { name: 'Lambda', category: 'Functions', mastery: 0, color: 'gray' },
  
  { name: 'Lists', category: 'Collections', mastery: 0, color: 'gray' },
  { name: 'Tuples', category: 'Collections', mastery: 0, color: 'gray' },
  { name: 'Dictionaries', category: 'Collections', mastery: 0, color: 'gray' },
  { name: 'Sets', category: 'Collections', mastery: 0, color: 'gray' },
  { name: 'Comprehensions', category: 'Collections', mastery: 0, color: 'gray' },
];

// ===== INTERVENTIONS (Reframed as Boosts) =====

export const interventions = [
  {
    id: 'int_1',
    type: 'video',
    title: '5-min Loop Refresher',
    description: 'Quick visual explanation of loop concepts',
    duration: 5,
    icon: 'play-circle',
    priority: 1,
    xp: 10,
  },
  {
    id: 'int_2',
    type: 'quiz',
    title: 'Quick Practice',
    description: 'Build confidence with easier examples',
    duration: 10,
    icon: 'help-circle',
    priority: 2,
    xp: 15,
  },
  {
    id: 'int_3',
    type: 'community',
    title: 'Study with Buddy',
    description: 'Connect with your accountability partner',
    duration: 15,
    icon: 'users',
    priority: 3,
    xp: 20,
  },
  {
    id: 'int_4',
    type: 'exercise',
    title: 'Guided Exercise',
    description: 'Step-by-step with hints',
    duration: 20,
    icon: 'code',
    priority: 2,
    xp: 25,
  },
  {
    id: 'int_5',
    type: 'break',
    title: 'Mindful Break',
    description: 'A pause helps concepts click',
    duration: 5,
    icon: 'coffee',
    priority: 4,
    xp: 5,
  },
];

// ===== COMMUNITY =====

export const communityPeers = [
  {
    id: 'peer_1',
    name: 'Priya Sharma',
    location: 'Mumbai, IN',
    timezone: 'IST',
    goal: 'Career change to data analysis',
    currentModule: 3,
    avatar: null,
    isOnline: true,
    matchScore: 95,
    streak: 5,
  },
  {
    id: 'peer_2',
    name: 'Rahul Verma',
    location: 'Delhi, IN',
    timezone: 'IST',
    goal: 'Upskilling for promotion',
    currentModule: 4,
    avatar: null,
    isOnline: true,
    matchScore: 88,
    streak: 12,
  },
  {
    id: 'peer_3',
    name: 'Anjali Patel',
    location: 'Bangalore, IN',
    timezone: 'IST',
    goal: 'Transition to data analyst role',
    currentModule: 3,
    avatar: null,
    isOnline: false,
    matchScore: 92,
    streak: 9,
  },
  {
    id: 'peer_4',
    name: 'Vikram Singh',
    location: 'Hyderabad, IN',
    timezone: 'IST',
    goal: 'Starting tech career',
    currentModule: 2,
    avatar: null,
    isOnline: true,
    matchScore: 75,
    streak: 3,
  },
];

export const discussionThreads = [
  {
    id: 'thread_1',
    title: 'Just hit my 10-day streak! 🔥',
    author: 'Priya Sharma',
    replies: 18,
    lastActivity: '1 hour ago',
    tags: ['celebration', 'motivation'],
    isHot: true,
    likes: 24,
  },
  {
    id: 'thread_2',
    title: 'Study group for Module 3 - Weekend sessions',
    author: 'Rahul Verma',
    replies: 8,
    lastActivity: '5 hours ago',
    tags: ['study-group', 'loops'],
    isHot: false,
    likes: 12,
  },
  {
    id: 'thread_3',
    title: 'How I finally understood while loops',
    author: 'Anjali Patel',
    replies: 24,
    lastActivity: '1 day ago',
    tags: ['loops', 'success-story'],
    isHot: true,
    likes: 45,
  },
  {
    id: 'thread_4',
    title: 'Looking for an accountability buddy!',
    author: 'Vikram Singh',
    replies: 15,
    lastActivity: '2 days ago',
    tags: ['buddy-system', 'discussion'],
    isHot: false,
    likes: 8,
  },
];

// ===== BITE-SIZED CONTENT =====

export const biteSizedContent = [
  {
    id: 'bite_1',
    type: 'video',
    title: 'Loop Basics Explained',
    duration: 3,
    icon: 'play-circle',
    completed: true,
    xp: 10,
  },
  {
    id: 'bite_2',
    type: 'video',
    title: 'For Loop Deep Dive',
    duration: 5,
    icon: 'play-circle',
    completed: true,
    xp: 15,
  },
  {
    id: 'bite_3',
    type: 'quiz',
    title: 'Quick Check: For Loops',
    duration: 2,
    icon: 'help-circle',
    completed: true,
    score: 60,
    xp: 10,
  },
  {
    id: 'bite_4',
    type: 'video',
    title: 'While Loops Introduction',
    duration: 4,
    icon: 'play-circle',
    completed: false,
    isCurrent: true,
    xp: 15,
  },
  {
    id: 'bite_5',
    type: 'exercise',
    title: 'Practice: While Loop Counter',
    duration: 5,
    icon: 'code',
    completed: false,
    xp: 20,
  },
  {
    id: 'bite_6',
    type: 'quiz',
    title: 'Quick Check: While Loops',
    duration: 2,
    icon: 'help-circle',
    completed: false,
    xp: 10,
  },
  {
    id: 'bite_7',
    type: 'project',
    title: 'Mini Project: Number Guessing Game',
    duration: 15,
    icon: 'folder',
    completed: false,
    xp: 50,
  },
];

// ===== WEEKLY SCHEDULE =====

export const weeklySchedule = {
  recommendedMinutesPerDay: 20,
  currentStreak: 7,
  bestStreak: 12,
  scheduledDays: [
    { day: 'Mon', planned: 20, actual: 25, completed: true },
    { day: 'Tue', planned: 20, actual: 15, completed: true },
    { day: 'Wed', planned: 20, actual: 20, completed: true },
    { day: 'Thu', planned: 20, actual: 0, completed: false, isToday: true },
    { day: 'Fri', planned: 20, actual: 0, completed: false },
    { day: 'Sat', planned: 30, actual: 0, completed: false },
    { day: 'Sun', planned: 0, actual: 0, completed: false, isRest: true },
  ],
};

// ===== LEARNER MODEL =====

export const learnerModelStatic = {
  pseudo: 'gaurav_learner',
  fullName: 'Gaurav',
  email: 'gaurav@example.com',
  enrolledCourses: ['Python for Data Analysis'],
};

export const learnerModelDynamic = {
  courseId: 'python_101',
  courseName: 'Python for Data Analysis',
  CPS: 'On Track', // Course Predicted Status - improved!
  CDP: 25, // Course Dropout Prediction (%) - reduced!
  CDDS: 'Improving', // Course Difficulty Detection Status
  CDDL: 35, // Course Difficulty Detection Level (%)
  CDV: [0.42, 0.35, 0.25], // Improved with momentum features
  CP: 45, // Course Progress (%)
  CED: '2026-01-01',
};

// ===== MOTIVATIONAL MESSAGES =====

export const motivationalMessages = {
  morning: [
    "Good morning, {name}! Ready for today's mission? ☀️",
    "Rise and code! Your brain is freshest in the morning 🧠",
    "7 learners already started today. Join them! 🚀",
  ],
  encouragement: [
    "You're doing amazing! Keep going 💪",
    "Every line of code is progress 🎯",
    "Your future self will thank you 🌟",
  ],
  streak: [
    "🔥 {streak} days strong! Don't break the chain!",
    "You're on fire! {streak} days and counting! 🔥",
    "Incredible consistency! {streak} day streak! 🏆",
  ],
  completion: [
    "Mission accomplished! +{xp} XP earned 🎉",
    "You did it! Another step closer to mastery 🌟",
    "Boom! That's progress! 💥",
  ],
  peerComparison: [
    "You're in the top 20% of active learners today! 🏆",
    "15 learners completed this lesson. You're next! 🎯",
    "Your buddy Priya completed her mission. Your turn! 💪",
  ],
};
