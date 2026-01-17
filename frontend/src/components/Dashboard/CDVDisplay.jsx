import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Brain, Target, Users, TrendingUp } from 'lucide-react';
import { learnerMetrics, interventions } from '../../data/dummyData';

const CDVDisplay = ({ onSelectIntervention }) => {
  const [showInterventions, setShowInterventions] = useState(false);

  const cdvMetrics = [
    { name: 'Competence', value: learnerMetrics.competenceDeficiency, description: 'Understanding of concepts', color: 'bg-primary-500', icon: Brain },
    { name: 'Autonomy', value: learnerMetrics.autonomyDeficiency, description: 'Control over learning path', color: 'bg-accent-500', icon: Target },
    { name: 'Relatedness', value: learnerMetrics.relatednessDeficiency, description: 'Connection with community', color: 'bg-success-500', icon: Users },
  ];

  const getStatusLabel = (value) => {
    if (value > 0.7) return { text: 'Needs Focus', class: 'badge-primary' };
    if (value > 0.5) return { text: 'Improving', class: 'badge-accent' };
    return { text: 'Strong', class: 'badge-success' };
  };

  const hasHighDeficiency = cdvMetrics.some((m) => m.value > 0.5);

  return (
    <div className="space-y-4">
      {hasHighDeficiency && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
          style={{ borderLeft: '4px solid #FFB81C' }}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-accent-100">
                <Lightbulb className="w-5 h-5 text-accent-600" />
              </div>
              <div>
                <h4 className="font-semibold text-u-black">Quick Boost Available</h4>
                <p className="text-sm text-u-muted">We've got suggestions to help you progress faster!</p>
              </div>
            </div>
            <button
              onClick={() => setShowInterventions(!showInterventions)}
              className="btn-secondary btn-sm"
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
                <button
                  key={intervention.id}
                  onClick={() => onSelectIntervention?.(intervention)}
                  className="p-3 bg-u-bg rounded text-left border border-u-border hover:border-primary-300 transition-all"
                >
                  <span className="badge-accent text-xs mb-2">+{intervention.xp} XP</span>
                  <h5 className="font-medium text-u-black text-sm">{intervention.title}</h5>
                  <p className="text-xs text-u-muted">{intervention.duration} min</p>
                </button>
              ))}
            </motion.div>
          )}
        </motion.div>
      )}

      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-u-black">Your Learning Compass</h3>
          <span className="badge-neutral">SDT Based</span>
        </div>

        <div className="space-y-5">
          {cdvMetrics.map((metric, index) => {
            const status = getStatusLabel(metric.value);
            const strengthValue = 100 - (metric.value * 100);
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-u-muted" />
                    <span className="font-medium text-u-black">{metric.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-u-muted">{Math.round(strengthValue)}%</span>
                    <span className={status.class}>{status.text}</span>
                  </div>
                </div>
                <div className="progress-bar h-2.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${strengthValue}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className={`progress-fill ${metric.color}`}
                  />
                </div>
                <p className="text-xs text-u-muted mt-1">{metric.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CDVDisplay;
