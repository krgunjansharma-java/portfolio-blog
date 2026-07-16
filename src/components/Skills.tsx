import React from 'react';
import { Code, Server, Database, Cloud, Settings, Wrench } from 'lucide-react';
import type { CVData } from '../data/cvData';

interface SkillsProps {
  cvData: CVData;
}

const getCategoryIcon = (category: string) => {
  const cat = category.toLowerCase();
  if (cat.includes('languages') || cat.includes('frameworks')) {
    return <Code size={20} />;
  }
  if (cat.includes('architect') || cat.includes('competen')) {
    return <Server size={20} />;
  }
  if (cat.includes('database') || cat.includes('orm') || cat.includes('sql')) {
    return <Database size={20} />;
  }
  if (cat.includes('cloud') || cat.includes('devops') || cat.includes('pipeline')) {
    return <Cloud size={20} />;
  }
  if (cat.includes('tools') || cat.includes('develop')) {
    return <Settings size={20} />;
  }
  return <Wrench size={20} />;
};

export const Skills: React.FC<SkillsProps> = ({ cvData }) => {
  return (
    <section className="section" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
      <h2 className="section-title">Technical Skills</h2>
      <p className="section-subtitle">A curated view of technologies, platforms, and methodologies I work with</p>
      
      <div className="skills-grid">
        {cvData.skillCategories.map((cat, idx) => (
          <div key={idx} className="skill-card animate-fade-in" style={{ animationDelay: `${idx * 0.05}s` }}>
            <h3 className="skill-category-title">
              {getCategoryIcon(cat.category)}
              {cat.category}
            </h3>
            <div className="skill-tags">
              {cat.skills.map((skill, sIdx) => (
                <span key={sIdx} className="skill-badge">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
