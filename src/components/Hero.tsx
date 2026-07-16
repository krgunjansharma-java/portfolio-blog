import React from 'react';
import { Mail, Phone, MapPin, Linkedin, FileText, ArrowRight } from 'lucide-react';
import type { CVData } from '../data/cvData';

interface HeroProps {
  cvData: CVData;
  setActiveTab: (tab: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ cvData, setActiveTab }) => {
  return (
    <section className="section animate-fade-in" style={{ paddingBottom: '40px' }}>
      <div className="hero-wrapper">
        <div className="hero-glow"></div>
        <span className="hero-tag">Senior Software Engineer</span>
        <h1 className="hero-title">{cvData.name}</h1>
        <h2 className="hero-subtitle">{cvData.title}</h2>
        <p className="hero-summary">{cvData.summary}</p>
        
        <div className="hero-actions">
          <button onClick={() => setActiveTab('editor')} className="btn-primary">
            <FileText size={18} />
            Update & Print CV
          </button>
          <button onClick={() => setActiveTab('blog')} className="btn-secondary">
            Read My Blog
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="hero-contact">
          <div className="contact-item">
            <Mail size={16} />
            <a href={`mailto:${cvData.contact.email}`}>{cvData.contact.email}</a>
          </div>
          <div className="contact-item">
            <Phone size={16} />
            <a href={`tel:${cvData.contact.phone}`}>{cvData.contact.phone}</a>
          </div>
          <div className="contact-item">
            <Linkedin size={16} />
            <a href={`https://${cvData.contact.linkedin}`} target="_blank" rel="noopener noreferrer">
              LinkedIn Profile
            </a>
          </div>
          <div className="contact-item">
            <MapPin size={16} />
            <span>{cvData.contact.location}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
