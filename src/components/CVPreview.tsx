import React from 'react';
import type { CVData } from '../data/cvData';

interface CVPreviewProps {
  cvData: CVData;
}

export const CVPreview: React.FC<CVPreviewProps> = ({ cvData }) => {
  return (
    <div className="cv-preview-paper">
      {/* Header */}
      <div className="cv-preview-header">
        <h1 className="cv-preview-name">{cvData.name}</h1>
        <div className="cv-preview-title">{cvData.title}</div>
        <div className="cv-preview-contact">
          <span>{cvData.contact.phone}</span>
          <span>|</span>
          <span>{cvData.contact.email}</span>
          <span>|</span>
          <span>{cvData.contact.linkedin}</span>
          <span>|</span>
          <span>{cvData.contact.location}</span>
        </div>
      </div>

      {/* Summary */}
      {cvData.summary && (
        <div className="cv-preview-section">
          <h2 className="cv-preview-section-title">Professional Summary</h2>
          <p className="cv-preview-summary">{cvData.summary}</p>
        </div>
      )}

      {/* Skills */}
      {cvData.skillCategories && cvData.skillCategories.length > 0 && (
        <div className="cv-preview-section">
          <h2 className="cv-preview-section-title">Technical Skills</h2>
          <div className="cv-preview-skills-grid">
            {cvData.skillCategories.map((cat, idx) => (
              <div key={idx} className="cv-preview-skill-row">
                <div className="cv-preview-skill-cat">{cat.category}:</div>
                <div className="cv-preview-skill-vals">{cat.skills.join(', ')}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {cvData.experience && cvData.experience.length > 0 && (
        <div className="cv-preview-section">
          <h2 className="cv-preview-section-title">Professional Experience</h2>
          {cvData.experience.map((exp) => (
            <div key={exp.id} className="cv-preview-exp-item">
              <div className="cv-preview-exp-header">
                <div>
                  <span className="cv-preview-exp-role">{exp.role}</span>
                  <span className="cv-preview-exp-meta"> | </span>
                  <span className="cv-preview-exp-company">{exp.company}</span>
                  <span className="cv-preview-exp-meta">, {exp.location}</span>
                </div>
                <span className="cv-preview-exp-date">{exp.startDate} – {exp.endDate}</span>
              </div>
              
              {/* Highlight Projects if any */}
              {exp.projects && exp.projects.map((proj, pIdx) => (
                <div key={pIdx} style={{ fontSize: '11px', marginTop: '3px', fontWeight: 600, color: '#334155' }}>
                  Project: {proj.name} {proj.client ? `(Client: ${proj.client})` : ''}
                </div>
              ))}

              <ul className="cv-preview-bullet-list">
                {exp.highlights && exp.highlights.map((high, hIdx) => (
                  <li key={hIdx}>{high}</li>
                ))}
              </ul>
              <div className="cv-preview-tech-used">
                <strong>Technologies Used:</strong> {exp.technologies.join(', ')}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {cvData.education && cvData.education.length > 0 && (
        <div className="cv-preview-section">
          <h2 className="cv-preview-section-title">Education</h2>
          {cvData.education.map((edu, idx) => (
            <div key={idx} className="cv-preview-edu-item">
              <div>
                <span className="cv-preview-edu-deg">{edu.degree}</span>
                <span> | </span>
                <span className="cv-preview-edu-sch">{edu.school}</span>
                <span>, {edu.location}</span>
              </div>
              <span style={{ fontWeight: 700 }}>{edu.startDate} – {edu.endDate}</span>
            </div>
          ))}
        </div>
      )}

      {/* Certifications & Achievements */}
      {((cvData.certifications && cvData.certifications.length > 0) || 
        (cvData.achievements && cvData.achievements.length > 0)) && (
        <div className="cv-preview-section" style={{ marginBottom: 0 }}>
          <h2 className="cv-preview-section-title">Certifications & Achievements</h2>
          <ul className="cv-preview-bullet-list" style={{ marginTop: 0 }}>
            {cvData.certifications.map((cert, idx) => (
              <li key={idx}>{cert}</li>
            ))}
            {cvData.achievements.map((ach, idx) => (
              <li key={idx}>{ach}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
