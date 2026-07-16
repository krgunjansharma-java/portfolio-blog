import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Blog } from './components/Blog';
import { CVEditor } from './components/CVEditor';
import { DeployInfo } from './components/DeployInfo';
import { initialCVData } from './data/cvData';
import type { CVData } from './data/cvData';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState<string>('portfolio');
  const [cvData, setCvData] = useState<CVData>(() => {
    const saved = localStorage.getItem('gunjan_cv_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved CV data', e);
      }
    }
    return initialCVData;
  });

  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  // Apply theme class
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Persist CV Data updates
  const handleUpdateCVData = (newData: CVData) => {
    setCvData(newData);
    localStorage.setItem('gunjan_cv_data', JSON.stringify(newData));
  };

  const handleResetCVData = () => {
    if (window.confirm('Are you sure you want to reset all CV details to defaults?')) {
      setCvData(initialCVData);
      localStorage.removeItem('gunjan_cv_data');
    }
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <main className="container" style={{ minHeight: 'calc(100vh - 140px)' }}>
        {activeTab === 'portfolio' && (
          <>
            <Hero cvData={cvData} setActiveTab={setActiveTab} />
            <Skills cvData={cvData} />
            <Experience cvData={cvData} />
          </>
        )}

        {activeTab === 'blog' && <Blog />}

        {activeTab === 'editor' && (
          <CVEditor
            cvData={cvData}
            onUpdateCVData={handleUpdateCVData}
            onResetCVData={handleResetCVData}
          />
        )}

        {activeTab === 'deploy' && <DeployInfo />}
      </main>

      <footer className="no-print" style={{ borderTop: '1px solid var(--border-color)', padding: '30px 0', marginTop: '60px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        <div className="container">
          <p>© {new Date().getFullYear()} {cvData.name}. All rights reserved.</p>
          <p style={{ marginTop: '6px', fontSize: '0.8rem' }}>Built using React, TypeScript, and custom styling. Optimized for dynamic PDF generation.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
