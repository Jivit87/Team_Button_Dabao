import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { userProfile } from '../data/dummyData';

/**
 * Settings - Profile and preferences page
 * Allows goal editing, schedule preferences, and course pause/resume
 */
const Settings = () => {
  const [profile, setProfile] = useState({
    name: userProfile.name,
    email: userProfile.email,
    location: userProfile.location,
    goal: userProfile.goal,
    timezone: userProfile.timezone,
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    weeklyDigest: true,
    studyReminders: true,
    peerMessages: true,
  });

  const [schedule, setSchedule] = useState({
    preferredDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    preferredTime: 'evening',
    dailyGoal: 20,
  });

  const [isPaused, setIsPaused] = useState(false);

  const handleProfileChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handlePreferenceToggle = (field) => {
    setPreferences((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully!');
  };

  const handlePauseToggle = () => {
    setIsPaused(!isPaused);
    toast.success(
      isPaused
        ? 'Welcome back! Your course has been resumed.'
        : 'Course paused. We will send you gentle reminders.'
    );
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-neutral-800">Settings</h1>
        <p className="text-neutral-500 mt-1">Manage your profile and preferences</p>
      </motion.div>

      {/* Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
      >
        <h2 className="text-lg font-semibold text-neutral-800 mb-4">Profile Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => handleProfileChange('name', e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => handleProfileChange('email', e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Location</label>
            <input
              type="text"
              value={profile.location}
              onChange={(e) => handleProfileChange('location', e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Timezone</label>
            <select
              value={profile.timezone}
              onChange={(e) => handleProfileChange('timezone', e.target.value)}
              className="input"
            >
              <option value="IST">IST (India Standard Time)</option>
              <option value="UTC">UTC</option>
              <option value="EST">EST (Eastern Standard Time)</option>
              <option value="PST">PST (Pacific Standard Time)</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-neutral-700 mb-1">Learning Goal</label>
          <textarea
            value={profile.goal}
            onChange={(e) => handleProfileChange('goal', e.target.value)}
            className="input h-20"
            placeholder="What do you want to achieve?"
          />
        </div>

        <div className="mt-4">
          <button onClick={handleSaveProfile} className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </motion.div>

      {/* Schedule Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card"
      >
        <h2 className="text-lg font-semibold text-neutral-800 mb-4">Study Schedule</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Preferred Study Days
            </label>
            <div className="flex flex-wrap gap-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <button
                  key={day}
                  onClick={() => {
                    setSchedule((prev) => ({
                      ...prev,
                      preferredDays: prev.preferredDays.includes(day)
                        ? prev.preferredDays.filter((d) => d !== day)
                        : [...prev.preferredDays, day],
                    }));
                  }}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    schedule.preferredDays.includes(day)
                      ? 'bg-primary-500 text-white'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Preferred Time
            </label>
            <div className="flex gap-2">
              {[
                { value: 'morning', label: '🌅 Morning' },
                { value: 'afternoon', label: '☀️ Afternoon' },
                { value: 'evening', label: '🌙 Evening' },
              ].map((time) => (
                <button
                  key={time.value}
                  onClick={() => setSchedule((prev) => ({ ...prev, preferredTime: time.value }))}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    schedule.preferredTime === time.value
                      ? 'bg-primary-500 text-white'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {time.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Daily Study Goal: {schedule.dailyGoal} minutes
            </label>
            <input
              type="range"
              min="10"
              max="60"
              step="5"
              value={schedule.dailyGoal}
              onChange={(e) =>
                setSchedule((prev) => ({ ...prev, dailyGoal: parseInt(e.target.value) }))
              }
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
            />
            <div className="flex justify-between text-xs text-neutral-400 mt-1">
              <span>10 min</span>
              <span>60 min</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Notifications Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card"
      >
        <h2 className="text-lg font-semibold text-neutral-800 mb-4">Notifications</h2>

        <div className="space-y-3">
          {[
            { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive updates via email' },
            { key: 'pushNotifications', label: 'Push Notifications', desc: 'Browser push notifications' },
            { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'Summary of your progress' },
            { key: 'studyReminders', label: 'Study Reminders', desc: 'Gentle nudges to keep learning' },
            { key: 'peerMessages', label: 'Peer Messages', desc: 'When study buddies message you' },
          ].map((item) => (
            <label
              key={item.key}
              className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg cursor-pointer hover:bg-neutral-100"
            >
              <div>
                <p className="font-medium text-neutral-700">{item.label}</p>
                <p className="text-sm text-neutral-500">{item.desc}</p>
              </div>
              <div
                onClick={() => handlePreferenceToggle(item.key)}
                className={`w-11 h-6 rounded-full transition-colors cursor-pointer ${
                  preferences[item.key] ? 'bg-primary-500' : 'bg-neutral-300'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform ${
                    preferences[item.key] ? 'translate-x-5' : 'translate-x-0.5'
                  } mt-0.5`}
                />
              </div>
            </label>
          ))}
        </div>
      </motion.div>

      {/* Course Control Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className={`card border-2 ${isPaused ? 'border-warning-300 bg-warning-50' : 'border-neutral-200'}`}
      >
        <h2 className="text-lg font-semibold text-neutral-800 mb-2">Course Status</h2>
        <p className="text-neutral-600 mb-4">
          {isPaused
            ? "Your course is currently paused. We'll send you gentle reminders to come back."
            : 'Need a break? You can pause your course and resume anytime.'}
        </p>

        <button
          onClick={handlePauseToggle}
          className={`btn ${isPaused ? 'btn-success' : 'btn-warning'}`}
        >
          {isPaused ? (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Resume Course
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Pause Course
            </>
          )}
        </button>

        {isPaused && (
          <p className="text-sm text-warning-700 mt-3">
            💡 Taking breaks is healthy! We've seen learners return stronger after rest.
          </p>
        )}
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card border-2 border-alert-200"
      >
        <h2 className="text-lg font-semibold text-alert-700 mb-2">Danger Zone</h2>
        <p className="text-neutral-600 mb-4">
          These actions are permanent and cannot be undone.
        </p>
        <div className="flex gap-3">
          <button className="btn bg-neutral-100 text-neutral-700 hover:bg-neutral-200">
            Export My Data
          </button>
          <button className="btn bg-alert-100 text-alert-700 hover:bg-alert-200">
            Delete Account
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;
