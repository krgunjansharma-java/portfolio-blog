import React, { useState } from 'react';
import { Cloud, Terminal, Check, Copy, Settings } from 'lucide-react';

export const DeployInfo: React.FC = () => {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const gitCommands = `git init
git add .
git commit -m "feat: initialize custom portfolio and blog"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main`;

  return (
    <section className="section animate-fade-in" style={{ paddingTop: '40px' }}>
      <h2 className="section-title">Deployment & CI/CD Guide</h2>
      <p className="section-subtitle">A DevOps-focused dashboard detailing how to host this site live with automated deployments</p>

      <div className="deploy-card">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <Cloud className="text-accent" />
          Option A: Deploy to GitHub Pages (Recommended / Automated)
        </h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
          This project is already pre-configured with a GitHub Actions workflow in <code>.github/workflows/deploy.yml</code>. Pushing this project to a GitHub repository will automatically run the build and deploy it.
        </p>

        <div className="deploy-step">
          <div className="deploy-step-num">1</div>
          <div className="deploy-step-content">
            <h4 className="deploy-step-title">Create a new Repository on GitHub</h4>
            <p style={{ color: 'var(--text-secondary)' }}>Create a public or private repository named e.g., <code>portfolio-blog</code> on your GitHub account.</p>
          </div>
        </div>

        <div className="deploy-step">
          <div className="deploy-step-num">2</div>
          <div className="deploy-step-content">
            <h4 className="deploy-step-title">Push your project to GitHub</h4>
            <p style={{ color: 'var(--text-secondary)' }}>Run the following commands in your local project directory terminal to commit and push your code:</p>
            
            <div className="deploy-code-block">
              <button 
                onClick={() => handleCopy(gitCommands, 'git')} 
                className="copy-btn"
              >
                {copiedText === 'git' ? <Check size={14} /> : <Copy size={14} />}
              </button>
              <pre style={{ margin: 0 }}>{gitCommands}</pre>
            </div>
          </div>
        </div>

        <div className="deploy-step">
          <div className="deploy-step-num">3</div>
          <div className="deploy-step-content">
            <h4 className="deploy-step-title">Configure GitHub Pages Source</h4>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>Once the code is pushed:</p>
            <ol style={{ marginLeft: '20px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>Navigate to your repository page on GitHub.</li>
              <li>Go to <strong>Settings</strong> &gt; <strong>Pages</strong>.</li>
              <li>Under <strong>Build and deployment</strong> &gt; <strong>Source</strong>, switch the dropdown from <em>"Deploy from a branch"</em> to <strong>"GitHub Actions"</strong>.</li>
            </ol>
          </div>
        </div>

        <div className="deploy-step" style={{ marginBottom: 0 }}>
          <div className="deploy-step-num">4</div>
          <div className="deploy-step-content">
            <h4 className="deploy-step-title">Live Pipeline Run</h4>
            <p style={{ color: 'var(--text-secondary)' }}>
              Check the <strong>Actions</strong> tab on your repo. The deployment workflow will execute automatically in about 1 minute. Once finished, GitHub will display your portfolio's live public URL!
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        <div className="deploy-card" style={{ marginBottom: 0 }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Terminal className="text-accent" />
            Option B: Vercel Deploy (Zero Config)
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '16px' }}>
            Vercel offers lightning-fast globally distributed hosting. To deploy manually via CLI:
          </p>
          <div className="deploy-code-block" style={{ fontSize: '0.82rem' }}>
            <button 
              onClick={() => handleCopy('npm install -g vercel\nvercel', 'vercel')} 
              className="copy-btn"
            >
              {copiedText === 'vercel' ? <Check size={14} /> : <Copy size={14} />}
            </button>
            <pre style={{ margin: 0 }}>npm install -g vercel{"\n"}vercel</pre>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '12px' }}>
            Follow the prompt steps to log in, link the project, and output a production release URL in seconds.
          </p>
        </div>

        <div className="deploy-card" style={{ marginBottom: 0 }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Settings className="text-accent" />
            Continuous Deployment Config
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '12px' }}>
            Our pipeline configuration at <code>.github/workflows/deploy.yml</code> handles:
          </p>
          <ul style={{ marginLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <li>Checking out branches on main pushes</li>
            <li>Setting up stable Node.js v22 environments</li>
            <li>Running clean package installs (<code>npm ci</code>)</li>
            <li>Building TypeScript and Vite outputs into static files</li>
            <li>Publishing build artifacts to Pages securely</li>
          </ul>
        </div>
      </div>
    </section>
  );
};
