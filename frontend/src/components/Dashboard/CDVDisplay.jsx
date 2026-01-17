import { useState } from 'react';
import { motion } from 'framer-motion';
import { learnerMetrics, interventions } from '../../data/dummyData';

/**
 * CDVDisplay - Learning Compass visualization (Dark Theme)
 * Shows Competence, Autonomy, and Relatedness indicators
 */
const CDVDisplay = ({ onSelectIntervention }) => {
  const [showInterventions, setShowInterventions] = useState(false);
  const [selectedIntervention, setSelectedIntervention] = useState(null);

  const cdvMetrics = [
    {
      name: 'Competence',
      value: learnerMetrics.competenceDeficiency,
      description: 'Understanding of concepts',
      color: 'from-accent-blue to-accent-cyan',
      icon: '🧠',
    },
    {
      name: 'Autonomy',
      value: learnerMetrics.autonomyDeficiency,
      description: 'Control over learning path',
      color: 'from-accent-purple to-accent-pink',
      icon: '🎯',
    },
    {
      name: 'Relatedness',
      value: learnerMetrics.relatednessDeficiency,
      description: 'Connection with community',
      color: 'from-accent-orange to-warning-500',
      icon: '👥',
    },
  ];

  const getStatusLabel = (value) => {
    if (value > 0.7) return { text: 'Needs Focus', class: 'badge-alert' };
    if (value > 0.5) return { text: 'Improving', class: 'badge-warning' };
    return { text: 'Strong', class: 'badge-success' };
  };

  const hasHighDeficiency = cdvMetrics.some((m) => m.value > 0.5);

  const handleInterventionSelect = (intervention) => {
    setSelectedIntervention(intervention);
    if (onSelectIntervention) onSelectIntervention(intervention);
  };

  return (
    <div className="space-y-4">
      {/* Boost Banner */}
      {hasHighDeficiency && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-gradient-to-r from-accent-purple/20 to-accent-pink/20 border border-accent-purple/30 rounded-2xl"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent-purple/30 flex items-center justify-center">
                <span className="text-xl">💡</span>
              </div>
              <div>
                <h4 className="font-bold text-neutral-100">Quick Boost Available</h4>
                <p className="text-sm text-neutral-400">We've got suggestions to help you progress faster!</p>
              </div>
            </div>
            <button
              onClick={() => setShowInterventions(!showInterventions)}
              className="btn-primary btn-sm"
            >
              {showInterventions ? 'Hide' : 'View Boosts'}
            </button>
          </div>

          {showInterventions && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              {interventions.slice(0, 3).map((intervention) => (
                <motion.button
                  key={intervention.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleInterventionSelect(intervention)}
                  className={`p-3 rounded-xl text-left transition-all ${
                    selectedIntervention?.id === intervention.id
                      ? 'bg-accent-purple/30 border border-accent-purple'
                      : 'bg-white/5 border border-white/10 hover:border-accent-purple/50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">
                      {intervention.type === 'video' && '📺'}
                      {intervention.type === 'quiz' && '❓'}
                      {intervention.type === 'community' && '👥'}
                    </span>
                    <span className="badge-info text-xs">+{intervention.xp} XP</span>
                  </div>
                  <h5 className="font-medium text-neutral-200 text-sm">{intervention.title}</h5>
                  <p className="text-xs text-neutral-500">{intervention.duration} min</p>
                </motion.button>
              ))}
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Learning Compass */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-neutral-100">Your Learning Compass</h3>
          <span className="badge-info">SDT Based</span>
        </div>

        <div className="space-y-5">
          {cdvMetrics.map((metric, index) => {
            const status = getStatusLabel(metric.value);
            const strengthValue = 100 - (metric.value * 100);
            return (
              <motion.div
                key={metric.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{metric.icon}</span>
                    <span className="font-semibold text-neutral-200">{metric.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-neutral-400">{Math.round(strengthValue)}% strength</span>
                    <span className={`badge ${status.class}`}>{status.text}</span>
                  </div>
                </div>
                <div className="progress-bar h-2.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${strengthValue}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className={`progress-bar-fill bg-gradient-to-r ${metric.color}`}
                  />
                </div>
                <p className="text-xs text-neutral-500 mt-1">{metric.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="text-sm text-neutral-400">
            Engagement Trend: <span className="font-bold text-success-400 capitalize">{learnerMetrics.engagementTrend}</span>
          </div>
          <div className="text-sm flex items-center gap-2">
            <span className="text-neutral-400">Completion Confidence:</span>
            <span className="font-bold text-success-400">{100 - learnerMetrics.dropoutRisk * 100}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CDVDisplay;
