'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Activity, ArrowLeft, Calendar, User, Clock, Search, ArrowRight } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
}

export default function BlogPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Technology', 'Healthcare', 'Security', 'Compliance'];

  const posts: BlogPost[] = [
    {
      id: '1',
      title: 'How AI is Streamlining Clinic Scheduling Workflows',
      category: 'Technology',
      excerpt: 'Discover how automated slot picking and predictive attendance algorithms are helping hospitals reduce no-shows by 40% globally.',
      date: 'May 18, 2026',
      readTime: '5 min read',
      author: 'Dr. Farhana Aamir',
    },
    {
      id: '2',
      title: '5 Steps to Achieving Strict HIPAA Compliance at Your Facility',
      category: 'Compliance',
      excerpt: 'HIPAA violations can be incredibly costly. Learn the essential protocols for protecting patient electronic records (ePHI) safely.',
      date: 'May 12, 2026',
      readTime: '8 min read',
      author: 'Adnan Khan (Security Lead)',
    },
    {
      id: '3',
      title: 'Cloud vs On-Premises: What is Best for Modern Clinic Databases?',
      category: 'Healthcare',
      excerpt: 'A detailed cost-benefit comparison of local physical servers versus compliant multi-tenant cloud systems like MediCore.',
      date: 'Apr 28, 2026',
      readTime: '6 min read',
      author: 'Sarah Qureshi (Database Architect)',
    },
    {
      id: '4',
      title: 'The Shift to Mobile-Friendly Portals for Patients and Doctors',
      category: 'Technology',
      excerpt: 'Providing responsive dashboards for on-the-go doctors and portal options for patient feedback is reshaping healthcare retention.',
      date: 'Apr 15, 2026',
      readTime: '4 min read',
      author: 'Waqas Ahmed (UI UX Designer)',
    },
    {
      id: '5',
      title: 'Understanding Database Encryption: At-Rest vs In-Transit',
      category: 'Security',
      excerpt: 'A security-first walkthrough explaining the algorithms behind TLS 1.3 tunnels and AES-256 vault configurations.',
      date: 'Mar 30, 2026',
      readTime: '7 min read',
      author: 'Zainab Ali (DevOps Engineer)',
    }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Header */}
      <header className="header" style={{ borderBottom: '1px solid #e2e8f0', background: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Activity color="var(--primary)" size={32} />
          <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-dark)' }}>MediCore Pro</Link>
        </div>
        <Link href="/" className="btn btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '4rem 1rem' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          
          {/* Hero Section */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>The MediCore Blog</h1>
            <p className="text-muted" style={{ fontSize: '1.125rem' }}>Insights, tips, and guidelines for modern healthcare management.</p>
          </div>

          {/* Search and Category Filters */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem', marginBottom: '3.5rem', flexWrap: 'wrap' }}>
            {/* Categories */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {categories.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '0.5rem 1.25rem',
                    borderRadius: '99px',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    backgroundColor: activeCategory === cat ? 'var(--primary)' : 'white',
                    color: activeCategory === cat ? 'white' : 'var(--text-gray)',
                    border: activeCategory === cat ? 'none' : '1px solid #e2e8f0',
                    transition: 'all 0.2s',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div style={{ position: 'relative', width: '280px' }}>
              <input
                type="text"
                placeholder="Search articles..."
                style={{
                  width: '100%',
                  padding: '0.5rem 1rem 0.5rem 2.5rem',
                  borderRadius: '99px',
                  border: '1px solid #e2e8f0',
                  outline: 'none',
                  fontSize: '0.875rem',
                }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search size={16} color="var(--text-gray)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          {/* Blog Articles Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }} className="grid-cols-1">
            {filteredPosts.map((post) => (
              <article key={post.id} className="card" style={{ backgroundColor: 'white', padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'transform 0.2s', height: '100%' }}>
                <div>
                  <span style={{ display: 'inline-block', backgroundColor: 'rgba(30, 136, 229, 0.1)', color: 'var(--primary-dark)', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '1.25rem' }}>
                    {post.category}
                  </span>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem', lineHeight: '1.3' }}>
                    {post.title}
                  </h3>
                  <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                    {post.excerpt}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.825rem', color: 'var(--text-gray)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <User size={14} /> <span>{post.author}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Calendar size={14} /> <span>{post.date}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Clock size={14} /> <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}

            {filteredPosts.length === 0 && (
              <div style={{ gridColumn: 'span 2', textAlign: 'center', padding: '4rem', color: 'var(--text-gray)' }}>
                No blog articles match your search or filter options.
              </div>
            )}
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#0f172a', color: 'white', padding: '2rem 0', textAlign: 'center', fontSize: '0.875rem' }}>
        <div className="container">
          <p style={{ color: '#94a3b8' }}>&copy; {new Date().getFullYear()} MediCore Pro SaaS. Share Knowledge.</p>
        </div>
      </footer>
    </div>
  );
}
