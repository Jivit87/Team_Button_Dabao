import { motion } from 'framer-motion';
import { skillMastery } from '../../data/dummyData';

/**
 * SkillHeatmap - Skill mastery visualization (Dark Theme)
 */
const SkillHeatmap = () => {
  const categories = [...new Set(skillMastery.map(s => s.category))];

  const getMasteryColor = (mastery) => {
    if (mastery >= 80) return 'bg-success-500';
    if (mastery >= 50) return 'bg-warning-500';
    if (mastery > 0) return 'bg-alert-500';
    return 'bg-neutral-700';
  };

  const getMasteryGlow = (mastery) => {
    if (mastery >= 80) return 'shadow-glow-green';
    if (mastery >= 50) return 'shadow-glow-orange';
    return '';
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-neutral-100">Skill Mastery</h3>
        <span className="text-xs text-neutral-500">Hover for details</span>
      </div>

      <div className="space-y-4">
        {categories.slice(0, 3).map((category) => {
          const skills = skillMastery.filter(s => s.category === category);
          const avgMastery = Math.round(skills.reduce((acc, s) => acc + s.mastery, 0) / skills.length);
          
          return (
            <div key={category}>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-neutral-300 font-medium">{category}</span>
                <span className={`font-bold ${
                  avgMastery >= 80 ? 'text-success-400' :
                  avgMastery >= 50 ? 'text-warning-400' :
                  avgMastery > 0 ? 'text-alert-400' :
                  'text-neutral-500'
                }`}>
                  {avgMastery}%
                </span>
              </div>
              <div className="flex gap-1">
                {skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className={`flex-1 h-3 rounded ${getMasteryColor(skill.mastery)} ${getMasteryGlow(skill.mastery)} transition-all cursor-pointer hover:scale-110`}
                    title={`${skill.name}: ${skill.mastery}%`}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/10 text-xs text-neutral-400">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-success-500" />
          <span>Mastered</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-warning-500" />
          <span>Learning</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-alert-500" />
          <span>Needs Work</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-neutral-700" />
          <span>Not Started</span>
        </div>
      </div>
    </div>
  );
};

export default SkillHeatmap;
