import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { userProfile } from '../data/dummyData';
import { Play, Pause, AlertTriangle, Download, Trash2, Bell, Clock, Calendar } from 'lucide-react';

/**
 * Settings - Profile and preferences page (Udemy Style)
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
        <h1 className="text-2xl font-bold text-u-black">Settings</h1>
        <p className="text-u-muted mt-1">Manage your profile and preferences</p>
      </motion.div>

      {/* Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
      >
        <h2 className="text-lg font-semibold text-u-black mb-4">Profile Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-u-gray mb-1">Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => handleProfileChange('name', e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-u-gray mb-1">Email</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => handleProfileChange('email', e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-u-gray mb-1">Location</label>
            <input
              type="text"
              value={profile.location}
              onChange={(e) => handleProfileChange('location', e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-u-gray mb-1">Timezone</label>
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
          <label className="block text-sm font-medium text-u-gray mb-1">Learning Goal</label>
          <textarea
            value={profile.goal}
            onChange={(e) => handleProfileChange('goal', e.target.value)}
            className="input h-20"
            placeholder="What do you want to achieve?"
          />
        </div>

        <div className="mt-4">
          <button onClick={handleSaveProfile} className="btn-primary">
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
        <h2 className="text-lg font-semibold text-u-black mb-4">Study Schedule</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-u-gray mb-2">
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
                      ? 'bg-u-charcoal text-white'
                      : 'bg-u-bg text-u-muted hover:bg-u-border'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-u-gray mb-2">
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
                      : 'bg-u-bg text-u-muted hover:bg-u-border'
                  }`}
                >
                  {time.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-u-gray mb-2">
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
              className="w-full h-2 bg-u-border rounded-lg appearance-none cursor-pointer accent-primary-500"
            />
            <div className="flex justify-between text-xs text-u-muted mt-1">
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
        <h2 className="text-lg font-semibold text-u-black mb-4">Notifications</h2>

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
              className="flex items-center justify-between p-3 bg-u-bg rounded-lg cursor-pointer hover:bg-u-border/50 border border-u-border"
            >
              <div>
                <p className="font-medium text-u-black">{item.label}</p>
                <p className="text-sm text-u-muted">{item.desc}</p>
              </div>
              <div
                onClick={() => handlePreferenceToggle(item.key)}
                className={`w-11 h-6 rounded-full transition-colors cursor-pointer ${
                  preferences[item.key] ? 'bg-success-500' : 'bg-u-muted'
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
        className={`card border-2 ${isPaused ? 'border-accent-200 bg-accent-50' : 'border-u-border'}`}
      >
        <h2 className="text-lg font-semibold text-u-black mb-2">Course Status</h2>
        <p className="text-u-gray mb-4">
          {isPaused
            ? "Your course is currently paused. We'll send you gentle reminders to come back."
            : 'Need a break? You can pause your course and resume anytime.'}
        </p>

        <button
          onClick={handlePauseToggle}
          className={`btn ${isPaused ? 'btn-primary bg-success-500 hover:bg-success-600 border-none' : 'btn-outline border-u-charcoal text-u-charcoal hover:bg-u-charcoal'}`}
        >
          {isPaused ? (
            <>
              <Play className="w-4 h-4 mr-2" />
              Resume Course
            </>
          ) : (
            <>
              <Pause className="w-4 h-4 mr-2" />
              Pause Course
            </>
          )}
        </button>

        {isPaused && (
          <p className="text-sm text-accent-700 mt-3 pt-3 border-t border-accent-200">
            💡 Taking breaks is healthy! We've seen learners return stronger after rest.
          </p>
        )}
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card border-2 border-primary-200"
      >
        <h2 className="text-lg font-semibold text-primary-600 mb-2 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Danger Zone
        </h2>
        <p className="text-u-gray mb-4">
          These actions are permanent and cannot be undone.
        </p>
        <div className="flex gap-3">
          <button className="btn bg-u-bg text-u-gray border border-u-border hover:bg-u-border">
            <Download className="w-4 h-4 mr-2" />
            Export My Data
          </button>
          <button className="btn bg-primary-50 text-primary-600 hover:bg-primary-100 border border-primary-200">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Account
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;
