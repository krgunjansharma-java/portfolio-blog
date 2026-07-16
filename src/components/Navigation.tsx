import React from 'react';
import { Sun, Moon, Terminal, Layout, BookOpen, Edit, CloudLightning } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  theme: string;
  toggleTheme: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  setActiveTab,
  theme,
  toggleTheme,
}) => {
  return (
    <header className="header no-print">
      <div className="container nav-container">
        <div className="logo">
          <Terminal size={22} className="text-accent" />
          <span>GUNJAN.DEV</span>
        </div>

        <nav className="nav-links">
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`nav-btn ${activeTab === 'portfolio' ? 'active' : ''}`}
          >
            <Layout size={16} style={{ marginRight: '6px', display: 'inline-block', verticalAlign: 'middle' }} />
            <span style={{ verticalAlign: 'middle' }}>Portfolio</span>
          </button>
          
          <button
            onClick={() => setActiveTab('blog')}
            className={`nav-btn ${activeTab === 'blog' ? 'active' : ''}`}
          >
            <BookOpen size={16} style={{ marginRight: '6px', display: 'inline-block', verticalAlign: 'middle' }} />
            <span style={{ verticalAlign: 'middle' }}>Blog</span>
          </button>

          <button
            onClick={() => setActiveTab('editor')}
            className={`nav-btn ${activeTab === 'editor' ? 'active' : ''}`}
          >
            <Edit size={16} style={{ marginRight: '6px', display: 'inline-block', verticalAlign: 'middle' }} />
            <span style={{ verticalAlign: 'middle' }}>CV Editor & PDF</span>
          </button>

          <button
            onClick={() => setActiveTab('deploy')}
            className={`nav-btn ${activeTab === 'deploy' ? 'active' : ''}`}
          >
            <CloudLightning size={16} style={{ marginRight: '6px', display: 'inline-block', verticalAlign: 'middle' }} />
            <span style={{ verticalAlign: 'middle' }}>DevOps & CD</span>
          </button>

          <button
            onClick={toggleTheme}
            className="icon-btn theme-toggle"
            aria-label="Toggle Theme"
            style={{ marginLeft: '12px' }}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>
      </div>
    </header>
  );
};
