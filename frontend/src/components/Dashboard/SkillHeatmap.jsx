
import { motion } from 'framer-motion';
import { skillMastery } from '../../data/dummyData';

const SkillHeatmap = () => {
  const categories = [...new Set(skillMastery.map(s => s.category))];

  const getMasteryColor = (mastery) => {
    if (mastery >= 80) return 'bg-success-500';
    if (mastery >= 50) return 'bg-accent-500';
    if (mastery > 0) return 'bg-primary-500';
    return 'bg-u-border';
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-u-black">Skill Mastery</h3>
        <span className="text-xs text-u-muted">Hover for details</span>
      </div>

      <div className="space-y-4">
        {categories.slice(0, 3).map((category) => {
          const skills = skillMastery.filter(s => s.category === category);
          const avgMastery = Math.round(skills.reduce((acc, s) => acc + s.mastery, 0) / skills.length);
          
          return (
            <div key={category}>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="font-medium text-u-black">{category}</span>
                <span className={`font-semibold ${
                  avgMastery >= 80 ? 'text-success-600' :
                  avgMastery >= 50 ? 'text-accent-600' :
                  avgMastery > 0 ? 'text-primary-500' :
                  'text-u-muted'
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
                    className={`flex-1 h-3 rounded ${getMasteryColor(skill.mastery)} transition-transform hover:scale-110 cursor-pointer`}
                    title={`${skill.name}: ${skill.mastery}%`}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-u-border text-xs text-u-muted">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-success-500" />
          <span>Mastered</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-accent-500" />
          <span>Learning</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-primary-500" />
          <span>Started</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-u-border" />
          <span>Not Started</span>
        </div>
      </div>
    </div>
  );
};

export default SkillHeatmap;
