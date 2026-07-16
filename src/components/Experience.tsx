import React from 'react';
import { Award, GraduationCap } from 'lucide-react';
import type { CVData } from '../data/cvData';

interface ExperienceProps {
  cvData: CVData;
}

export const Experience: React.FC<ExperienceProps> = ({ cvData }) => {
  return (
    <section className="section" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '50px' }}>
        {/* Work Experience */}
        <div>
          <h2 className="section-title">Professional Experience</h2>
          <p className="section-subtitle">A detailed look at my career history and engineering roles</p>
          
          <div className="timeline">
            {cvData.experience.map((exp, idx) => (
              <div key={exp.id} className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className="timeline-header">
                    <div>
                      <h3 className="timeline-role">{exp.role}</h3>
                      <div className="timeline-company">{exp.company} — <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{exp.location}</span></div>
                    </div>
                    <span className="timeline-date">{exp.startDate} – {exp.endDate}</span>
                  </div>

                  {/* If there are projects (like Splunk to ELF Migration at Infosys) */}
                  {exp.projects && exp.projects.map((proj, pIdx) => (
                    <div key={pIdx} style={{ marginBottom: '16px', background: 'var(--bg-primary)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                      <h4 style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '1.05rem', marginBottom: '4px' }}>Project: {proj.name}</h4>
                      {proj.client && <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Client: <strong>{proj.client}</strong></div>}
                      <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>{proj.description}</p>
                    </div>
                  ))}

                  <ul className="timeline-list">
                    {exp.highlights && exp.highlights.map((highlight, hIdx) => (
                      <li key={hIdx}>{highlight}</li>
                    ))}
                  </ul>

                  <div className="tech-tags">
                    {exp.technologies.map((tech, tIdx) => (
                      <span key={tIdx} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Certifications Side-by-Side */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', marginTop: '20px' }}>
          <div>
            <h2 className="section-title">Education</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
              {cvData.education.map((edu, idx) => (
                <div key={idx} className="edu-card animate-fade-in">
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div className="cert-icon" style={{ backgroundColor: 'var(--bg-accent)', color: 'var(--accent)', padding: '8px', borderRadius: '6px' }}>
                      <GraduationCap size={20} />
                    </div>
                    <div style={{ flexGrow: 1 }}>
                      <h3 className="edu-school" style={{ fontSize: '1.05rem' }}>{edu.school}</h3>
                      <div className="edu-degree" style={{ fontSize: '0.92rem', marginBottom: '4px' }}>{edu.degree}</div>
                      <div className="edu-meta">
                        <span>{edu.location}</span>
                        <span>{edu.startDate} – {edu.endDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="section-title">Certifications & Achievements</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
              {cvData.certifications.map((cert, idx) => (
                <div key={idx} className="cert-card animate-fade-in">
                  <div className="cert-icon">
                    <Award size={20} />
                  </div>
                  <div>
                    <h3 className="cert-title">{cert}</h3>
                  </div>
                </div>
              ))}
              
              {cvData.achievements.map((ach, idx) => (
                <div key={idx} className="cert-card animate-fade-in">
                  <div className="cert-icon" style={{ color: 'var(--accent)' }}>
                    <Award size={20} />
                  </div>
                  <div>
                    <h3 className="cert-title">{ach}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
