import React, { useState, useMemo } from 'react';
import { Search, Calendar, Clock, X, ChevronRight, MessageSquareCode } from 'lucide-react';
import { initialBlogPosts } from '../data/blogPosts';
import type { BlogPost } from '../data/blogPosts';

export const Blog: React.FC = () => {
  const [posts] = useState<BlogPost[]>(initialBlogPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  // Gather all unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    posts.forEach(post => post.tags.forEach(t => tagsSet.add(t)));
    return Array.from(tagsSet);
  }, [posts]);

  // Count posts per tag
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    posts.forEach(post => {
      post.tags.forEach(tag => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });
    return counts;
  }, [posts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
      
      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, selectedTag]);

  return (
    <section className="section animate-fade-in" style={{ paddingTop: '40px' }}>
      <h2 className="section-title">Technical Log & Blog</h2>
      <p className="section-subtitle">Deep dives into Spring Boot microservices, Vert.x reactive systems, and automation tooling</p>

      <div className="blog-layout">
        {/* Sidebar */}
        <aside className="blog-sidebar no-print">
          <div className="blog-search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          <h4 className="sidebar-title">Categories</h4>
          <div className="tag-filter-list">
            <button
              onClick={() => setSelectedTag(null)}
              className={`tag-filter-btn ${selectedTag === null ? 'active' : ''}`}
            >
              <span>All Articles</span>
              <span className="tag-count">{posts.length}</span>
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={`tag-filter-btn ${selectedTag === tag ? 'active' : ''}`}
              >
                <span>{tag}</span>
                <span className="tag-count">{tagCounts[tag] || 0}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Posts List */}
        <div className="blog-posts-list">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <article
                key={post.id}
                className="blog-card"
                onClick={() => setActivePost(post)}
              >
                <div className="blog-meta-row">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={14} />
                    {post.date}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={14} />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-excerpt">{post.excerpt}</p>

                <div className="blog-card-footer">
                  <div className="tech-tags" style={{ border: 'none', paddingTop: 0 }}>
                    {post.tags.map(t => (
                      <span
                        key={t}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTag(t === selectedTag ? null : t);
                        }}
                        className={`tech-tag`}
                        style={{
                          cursor: 'pointer',
                          backgroundColor: selectedTag === t ? 'var(--accent)' : 'var(--bg-accent)',
                          color: selectedTag === t ? '#0b0f19' : 'var(--accent)'
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  
                  <span className="read-more-link">
                    Read Article
                    <ChevronRight size={16} />
                  </span>
                </div>
              </article>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius)', border: '1px solid var(--border-color)' }}>
              <MessageSquareCode size={40} style={{ color: 'var(--text-muted)', marginBottom: '16px' }} />
              <h3>No Articles Found</h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Try adjusting your search query or filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* Reader Modal */}
      {activePost && (
        <div className="modal-overlay" onClick={() => setActivePost(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setActivePost(null)}>
              <X size={20} />
            </button>
            <div className="modal-body">
              <header className="post-header">
                <div className="blog-meta-row" style={{ marginBottom: '16px' }}>
                  <span>{activePost.date}</span>
                  <span>•</span>
                  <span>{activePost.readTime}</span>
                </div>
                <h1 className="post-title">{activePost.title}</h1>
                <div className="tech-tags" style={{ border: 'none', paddingTop: 0 }}>
                  {activePost.tags.map(t => (
                    <span key={t} className="tech-tag">{t}</span>
                  ))}
                </div>
              </header>

              <div className="post-body">
                {/* Basic parsing for our markdown-like mock body */}
                {activePost.content.split('\n\n').map((paragraph, pIdx) => {
                  const trimmed = paragraph.trim();
                  if (!trimmed) return null;

                  if (trimmed.startsWith('### ')) {
                    return <h3 key={pIdx}>{trimmed.replace('### ', '')}</h3>;
                  }

                  if (trimmed.startsWith('* ')) {
                    return (
                      <ul key={pIdx}>
                        {trimmed.split('\n').map((li, lIdx) => (
                          <li key={lIdx}>{li.replace('* ', '')}</li>
                        ))}
                      </ul>
                    );
                  }

                  if (trimmed.startsWith('```')) {
                    // Extract code block
                    const lines = trimmed.split('\n');
                    // Language extracted if needed: lines[0].replace('```', '');
                    const code = lines.slice(1, -1).join('\n');
                    return (
                      <pre key={pIdx}>
                        <code>{code}</code>
                      </pre>
                    );
                  }

                  return <p key={pIdx} dangerouslySetInnerHTML={{ 
                    __html: trimmed
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/`(.*?)`/g, '<code>$1</code>')
                  }} />;
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
