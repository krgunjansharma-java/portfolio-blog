import React, { useState, useRef } from 'react';
import { Download, Upload, RotateCcw, Printer, Plus, Trash, User, FileText, Briefcase, GraduationCap } from 'lucide-react';
import type { CVData, Experience, Education } from '../data/cvData';
import { CVPreview } from './CVPreview';

interface CVEditorProps {
  cvData: CVData;
  onUpdateCVData: (data: CVData) => void;
  onResetCVData: () => void;
}

type EditorTab = 'personal' | 'skills' | 'experience' | 'education';

export const CVEditor: React.FC<CVEditorProps> = ({
  cvData,
  onUpdateCVData,
  onResetCVData,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<EditorTab>('personal');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Field change handler
  const handlePersonalChange = (field: string, value: string) => {
    onUpdateCVData({
      ...cvData,
      contact: {
        ...cvData.contact,
        [field]: value,
      },
    });
  };

  const handleBaseChange = (field: keyof CVData, value: string) => {
    onUpdateCVData({
      ...cvData,
      [field]: value,
    });
  };

  // Skill updates
  const handleSkillCategoryNameChange = (idx: number, newName: string) => {
    const updated = [...cvData.skillCategories];
    updated[idx] = { ...updated[idx], category: newName };
    onUpdateCVData({ ...cvData, skillCategories: updated });
  };

  const handleSkillValuesChange = (idx: number, valuesStr: string) => {
    const updated = [...cvData.skillCategories];
    updated[idx] = { 
      ...updated[idx], 
      skills: valuesStr.split(',').map(s => s.trim()).filter(s => s.length > 0)
    };
    onUpdateCVData({ ...cvData, skillCategories: updated });
  };

  const addSkillCategory = () => {
    onUpdateCVData({
      ...cvData,
      skillCategories: [...cvData.skillCategories, { category: 'New Category', skills: ['Skill 1'] }]
    });
  };

  const removeSkillCategory = (idx: number) => {
    const updated = cvData.skillCategories.filter((_, i) => i !== idx);
    onUpdateCVData({ ...cvData, skillCategories: updated });
  };

  // Experience updates
  const handleExperienceChange = (expIdx: number, field: keyof Experience, value: any) => {
    const updated = [...cvData.experience];
    updated[expIdx] = { ...updated[expIdx], [field]: value };
    onUpdateCVData({ ...cvData, experience: updated });
  };

  const handleExperienceHighlightsChange = (expIdx: number, textValue: string) => {
    const updated = [...cvData.experience];
    updated[expIdx] = { 
      ...updated[expIdx], 
      highlights: textValue.split('\n').filter(line => line.trim().length > 0)
    };
    onUpdateCVData({ ...cvData, experience: updated });
  };

  const handleExperienceTechChange = (expIdx: number, valueStr: string) => {
    const updated = [...cvData.experience];
    updated[expIdx] = { 
      ...updated[expIdx], 
      technologies: valueStr.split(',').map(s => s.trim()).filter(s => s.length > 0)
    };
    onUpdateCVData({ ...cvData, experience: updated });
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: `exp-${Date.now()}`,
      role: 'Software Engineer',
      company: 'Company Name',
      location: 'City, Country',
      startDate: 'Start Date',
      endDate: 'End Date',
      highlights: ['Key contribution or responsibility'],
      technologies: ['React', 'TypeScript']
    };
    onUpdateCVData({
      ...cvData,
      experience: [newExp, ...cvData.experience]
    });
  };

  const removeExperience = (idx: number) => {
    const updated = cvData.experience.filter((_, i) => i !== idx);
    onUpdateCVData({ ...cvData, experience: updated });
  };

  // Education updates
  const handleEducationChange = (eduIdx: number, field: keyof Education, value: string) => {
    const updated = [...cvData.education];
    updated[eduIdx] = { ...updated[eduIdx], [field]: value };
    onUpdateCVData({ ...cvData, education: updated });
  };

  const addEducation = () => {
    const newEdu: Education = {
      degree: 'Degree Name',
      school: 'School/University Name',
      location: 'City, Country',
      startDate: 'Start Year',
      endDate: 'End Year'
    };
    onUpdateCVData({
      ...cvData,
      education: [...cvData.education, newEdu]
    });
  };

  const removeEducation = (idx: number) => {
    const updated = cvData.education.filter((_, i) => i !== idx);
    onUpdateCVData({ ...cvData, education: updated });
  };

  // Certifications & Achievements list updates
  const handleCertificationsChange = (text: string) => {
    onUpdateCVData({
      ...cvData,
      certifications: text.split('\n').filter(line => line.trim().length > 0)
    });
  };

  const handleAchievementsChange = (text: string) => {
    onUpdateCVData({
      ...cvData,
      achievements: text.split('\n').filter(line => line.trim().length > 0)
    });
  };

  // Export JSON
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(cvData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${cvData.name.toLowerCase().replace(/\s+/g, '_')}_cv.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON
  const handleImportJSONClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.name && parsed.contact && parsed.experience) {
          onUpdateCVData(parsed as CVData);
          alert('CV data imported successfully!');
        } else {
          alert('Invalid CV schema. Please check the JSON format.');
        }
      } catch (err) {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="section animate-fade-in" style={{ paddingTop: '40px' }}>
      <h2 className="section-title no-print">Interactive CV Editor</h2>
      <p className="section-subtitle no-print">Update your CV details in real-time. Changes are instantly reflected in the preview on the right and on the homepage. Print directly to save a polished PDF.</p>

      {/* Action Bar */}
      <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={handleExportJSON} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
            <Download size={16} />
            Export JSON
          </button>
          <button onClick={handleImportJSONClick} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
            <Upload size={16} />
            Import JSON
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json"
            style={{ display: 'none' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={onResetCVData} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem', color: '#ef4444', borderColor: 'rgba(239,68,68,0.2)' }}>
            <RotateCcw size={16} />
            Reset Default
          </button>
          <button onClick={handlePrint} className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
            <Printer size={16} />
            Print / Save PDF
          </button>
        </div>
      </div>

      <div className="editor-layout">
        {/* Left Side: Forms */}
        <div className="editor-sidebar-panel no-print">
          <div className="editor-tabs">
            <button
              onClick={() => setActiveSubTab('personal')}
              className={`editor-tab-btn ${activeSubTab === 'personal' ? 'active' : ''}`}
            >
              <User size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
              Personal Info
            </button>
            <button
              onClick={() => setActiveSubTab('skills')}
              className={`editor-tab-btn ${activeSubTab === 'skills' ? 'active' : ''}`}
            >
              <FileText size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
              Summary & Skills
            </button>
            <button
              onClick={() => setActiveSubTab('experience')}
              className={`editor-tab-btn ${activeSubTab === 'experience' ? 'active' : ''}`}
            >
              <Briefcase size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
              Experience
            </button>
            <button
              onClick={() => setActiveSubTab('education')}
              className={`editor-tab-btn ${activeSubTab === 'education' ? 'active' : ''}`}
            >
              <GraduationCap size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
              Education & Certs
            </button>
          </div>

          {/* Personal Info Tab */}
          {activeSubTab === 'personal' && (
            <div>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={cvData.name}
                  onChange={e => handleBaseChange('name', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Headline Title</label>
                <input
                  type="text"
                  value={cvData.title}
                  onChange={e => handleBaseChange('title', e.target.value)}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    value={cvData.contact.phone}
                    onChange={e => handlePersonalChange('phone', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={cvData.contact.email}
                    onChange={e => handlePersonalChange('email', e.target.value)}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>LinkedIn Profile Link</label>
                  <input
                    type="text"
                    value={cvData.contact.linkedin}
                    onChange={e => handlePersonalChange('linkedin', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Location (City, State)</label>
                  <input
                    type="text"
                    value={cvData.contact.location}
                    onChange={e => handlePersonalChange('location', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Summary & Skills Tab */}
          {activeSubTab === 'skills' && (
            <div>
              <div className="form-group">
                <label>Professional Summary</label>
                <textarea
                  rows={6}
                  value={cvData.summary}
                  onChange={e => handleBaseChange('summary', e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                <h4 style={{ fontWeight: 600 }}>Skill Categories</h4>
                <button onClick={addSkillCategory} className="btn-secondary" style={{ padding: '4px 10px', fontSize: '0.8rem' }}>
                  <Plus size={12} /> Add Category
                </button>
              </div>

              {cvData.skillCategories.map((cat, idx) => (
                <div key={idx} className="editor-item-card">
                  <button onClick={() => removeSkillCategory(idx)} className="remove-btn">
                    <Trash size={12} /> Remove
                  </button>
                  <div className="form-group">
                    <label>Category Title</label>
                    <input
                      type="text"
                      value={cat.category}
                      onChange={e => handleSkillCategoryNameChange(idx, e.target.value)}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Skills (Comma-separated)</label>
                    <textarea
                      rows={2}
                      value={cat.skills.join(', ')}
                      onChange={e => handleSkillValuesChange(idx, e.target.value)}
                      placeholder="Java, Spring Boot, etc."
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Experience Tab */}
          {activeSubTab === 'experience' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h4 style={{ fontWeight: 600 }}>Work History</h4>
                <button onClick={addExperience} className="btn-secondary" style={{ padding: '4px 10px', fontSize: '0.8rem' }}>
                  <Plus size={12} /> Add Role
                </button>
              </div>

              {cvData.experience.map((exp, idx) => (
                <div key={exp.id} className="editor-item-card">
                  <button onClick={() => removeExperience(idx)} className="remove-btn">
                    <Trash size={12} /> Remove
                  </button>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Job Title/Role</label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={e => handleExperienceChange(idx, 'role', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Company</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={e => handleExperienceChange(idx, 'company', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Start Date</label>
                      <input
                        type="text"
                        value={exp.startDate}
                        onChange={e => handleExperienceChange(idx, 'startDate', e.target.value)}
                        placeholder="e.g. Aug 2025"
                      />
                    </div>
                    <div className="form-group">
                      <label>End Date</label>
                      <input
                        type="text"
                        value={exp.endDate}
                        onChange={e => handleExperienceChange(idx, 'endDate', e.target.value)}
                        placeholder="e.g. Present"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Location</label>
                      <input
                        type="text"
                        value={exp.location}
                        onChange={e => handleExperienceChange(idx, 'location', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Responsibilities & Achievements (One per line)</label>
                    <textarea
                      rows={4}
                      value={exp.highlights ? exp.highlights.join('\n') : ''}
                      onChange={e => handleExperienceHighlightsChange(idx, e.target.value)}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Technologies Used (Comma-separated)</label>
                    <input
                      type="text"
                      value={exp.technologies.join(', ')}
                      onChange={e => handleExperienceTechChange(idx, e.target.value)}
                      placeholder="e.g. Java, Vert.x, Go"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Education & Certs Tab */}
          {activeSubTab === 'education' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h4 style={{ fontWeight: 600 }}>Education History</h4>
                <button onClick={addEducation} className="btn-secondary" style={{ padding: '4px 10px', fontSize: '0.8rem' }}>
                  <Plus size={12} /> Add School
                </button>
              </div>

              {cvData.education.map((edu, idx) => (
                <div key={idx} className="editor-item-card">
                  <button onClick={() => removeEducation(idx)} className="remove-btn">
                    <Trash size={12} /> Remove
                  </button>

                  <div className="form-group">
                    <label>Degree/Certification Name</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={e => handleEducationChange(idx, 'degree', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>School/Institution Name</label>
                    <input
                      type="text"
                      value={edu.school}
                      onChange={e => handleEducationChange(idx, 'school', e.target.value)}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Start Date</label>
                      <input
                        type="text"
                        value={edu.startDate}
                        onChange={e => handleEducationChange(idx, 'startDate', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>End Date</label>
                      <input
                        type="text"
                        value={edu.endDate}
                        onChange={e => handleEducationChange(idx, 'endDate', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Location</label>
                    <input
                      type="text"
                      value={edu.location}
                      onChange={e => handleEducationChange(idx, 'location', e.target.value)}
                    />
                  </div>
                </div>
              ))}

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', marginTop: '16px' }}>
                <div className="form-group">
                  <label>Certifications (One per line)</label>
                  <textarea
                    rows={3}
                    value={cvData.certifications.join('\n')}
                    onChange={e => handleCertificationsChange(e.target.value)}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Achievements (One per line)</label>
                  <textarea
                    rows={3}
                    value={cvData.achievements.join('\n')}
                    onChange={e => handleAchievementsChange(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Live A4 PDF Preview */}
        <div className="editor-preview-panel">
          <CVPreview cvData={cvData} />
        </div>
      </div>
    </section>
  );
};
