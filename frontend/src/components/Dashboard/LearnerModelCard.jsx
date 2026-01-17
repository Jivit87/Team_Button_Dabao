import { useState } from 'react';
import { motion } from 'framer-motion';
import { learnerModelStatic, learnerModelDynamic } from '../../data/dummyData';

/**
 * LearnerModelCard - Visualization of the Model of Learner (MLi)
 * Shows both static profile info and dynamic course performance
 */
const LearnerModelCard = () => {
  const [activeTab, setActiveTab] = useState('dynamic');

  const getStatusColor = (status) => {
    switch (status) {
      case 'At Risk':
        return 'text-alert-600 bg-alert-50';
      case 'On Track':
        return 'text-success-600 bg-success-50';
      case 'Warning':
        return 'text-warning-600 bg-warning-50';
      default:
        return 'text-neutral-600 bg-neutral-50';
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-neutral-800">Learner Model</h3>
        <div className="flex bg-neutral-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('static')}
            className={`px-3 py-1 text-sm rounded-md transition-all ${
              activeTab === 'static'
                ? 'bg-white shadow-sm text-neutral-800 font-medium'
                : 'text-neutral-600 hover:text-neutral-800'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('dynamic')}
            className={`px-3 py-1 text-sm rounded-md transition-all ${
              activeTab === 'dynamic'
                ? 'bg-white shadow-sm text-neutral-800 font-medium'
                : 'text-neutral-600 hover:text-neutral-800'
            }`}
          >
            Performance
          </button>
        </div>
      </div>

      {/* Static Part - Profile Info */}
      {activeTab === 'static' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
            <div className="w-10 h-10 bg-neutral-200 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-neutral-500">Username</p>
              <p className="font-medium text-neutral-800">{learnerModelStatic.pseudo}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
            <div className="w-10 h-10 bg-neutral-200 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-neutral-500">Email</p>
              <p className="font-medium text-neutral-800">{learnerModelStatic.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
            <div className="w-10 h-10 bg-neutral-200 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-neutral-500">Enrolled Courses</p>
              <p className="font-medium text-neutral-800">{learnerModelStatic.enrolledCourses.join(', ')}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Dynamic Part - Course Performance */}
      {activeTab === 'dynamic' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {/* Course Header */}
          <div className="flex items-center justify-between p-3 bg-primary-50 rounded-lg">
            <div>
              <p className="text-xs text-primary-600">Current Course</p>
              <p className="font-medium text-primary-800">{learnerModelDynamic.courseName}</p>
            </div>
            <span className={`badge ${getStatusColor(learnerModelDynamic.CPS)}`}>
              {learnerModelDynamic.CPS}
            </span>
          </div>

          {/* Performance Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Progress */}
            <div className="p-3 bg-neutral-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-neutral-500">Progress (CP)</p>
                <p className="text-lg font-bold text-primary-600">{learnerModelDynamic.CP}%</p>
              </div>
              <div className="progress-bar h-1.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${learnerModelDynamic.CP}%` }}
                  transition={{ duration: 0.8 }}
                  className="progress-bar-fill bg-primary-500"
                />
              </div>
            </div>

            {/* Dropout Prediction */}
            <div className="p-3 bg-neutral-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-neutral-500">Dropout Risk (CDP)</p>
                <p className="text-lg font-bold text-alert-600">{learnerModelDynamic.CDP}%</p>
              </div>
              <div className="progress-bar h-1.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${learnerModelDynamic.CDP}%` }}
                  transition={{ duration: 0.8 }}
                  className="progress-bar-fill bg-alert-500"
                />
              </div>
            </div>

            {/* Difficulty Level */}
            <div className="p-3 bg-neutral-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-neutral-500">Difficulty (CDDL)</p>
                <p className="text-lg font-bold text-warning-600">{learnerModelDynamic.CDDL}%</p>
              </div>
              <div className="progress-bar h-1.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${learnerModelDynamic.CDDL}%` }}
                  transition={{ duration: 0.8 }}
                  className="progress-bar-fill bg-warning-500"
                />
              </div>
            </div>

            {/* Status */}
            <div className="p-3 bg-neutral-50 rounded-lg">
              <p className="text-xs text-neutral-500 mb-2">Difficulty Status (CDDS)</p>
              <span className={`badge ${getStatusColor(learnerModelDynamic.CDDS)}`}>
                {learnerModelDynamic.CDDS}
              </span>
            </div>
          </div>

          {/* CDV Mini Heatmap */}
          <div className="p-3 bg-neutral-50 rounded-lg">
            <p className="text-xs text-neutral-500 mb-2">Difficulty Vector (CDV)</p>
            <div className="flex gap-2">
              {['Competence', 'Autonomy', 'Relatedness'].map((label, i) => {
                const value = learnerModelDynamic.CDV[i];
                const color = value > 0.7 ? 'bg-alert-500' : value > 0.5 ? 'bg-warning-500' : 'bg-success-500';
                return (
                  <div key={label} className="flex-1 text-center">
                    <div
                      className={`h-8 rounded-md flex items-center justify-center text-white text-sm font-medium ${color}`}
                    >
                      {Math.round(value * 100)}%
                    </div>
                    <p className="text-[10px] text-neutral-500 mt-1">{label}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Enrollment Date */}
          <div className="flex items-center justify-between text-sm text-neutral-500">
            <span>Enrolled</span>
            <span>{new Date(learnerModelDynamic.CED).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })}</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default LearnerModelCard;
