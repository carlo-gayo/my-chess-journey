// src/pages/HomePage.js
// Phase 2: fetches published posts from GET /api/posts on mount.
// Keeps all the original Phase 1 preview sections below the live post feed.
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const sectionStyle = { marginBottom: '3rem' };
const headingStyle = { fontFamily: "'Merriweather', serif", fontSize: 'clamp(1.3rem,3vw,2rem)', borderBottom: '3px solid #D4AF37', paddingBottom: '0.5rem', marginBottom: '1.5rem' };

const HomePage = () => {
  const [posts,   setPosts]   = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    API.get('/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.error('Failed to load posts:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main style={{ maxWidth: 1200, margin: '2rem auto', padding: '2rem', background: 'var(--bg-secondary)', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: 8 }}>

      {/* ── Hero ── */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Welcome to My Chess Adventure</h2>
        <p>Chess has transformed the way I think, plan, and solve problems. What started as a casual game with friends has become a lifelong passion that teaches me patience, strategy, and the importance of learning from every mistake.</p>
      </section>

      {/* ── Live Community Posts ── */}
      <section style={sectionStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: 12 }}>
          <h2 style={{ fontFamily: "'Merriweather', serif", fontSize: 'clamp(1.3rem,3vw,2rem)', borderBottom: '3px solid #D4AF37', paddingBottom: '0.5rem' }}>
            Community Posts
          </h2>
          {user && (
            <Link to='/create-post' style={{ background: '#D4AF37', color: '#2C2C2C', padding: '0.6rem 1.4rem', borderRadius: 5, fontWeight: 600, textDecoration: 'none', fontFamily: "'Open Sans', sans-serif" }}>
              + Write a Post
            </Link>
          )}
        </div>

        {loading && <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)' }}>Loading posts...</p>}

        {!loading && posts.length === 0 && (
          <div style={{ background: 'var(--bg-accent)', padding: '2rem', borderRadius: 8, textAlign: 'center' }}>
            <p>No posts yet.{' '}
              {user ? <Link to='/create-post' style={{ color: '#8B4513' }}>Be the first to write one!</Link>
                     : <><Link to='/register' style={{ color: '#8B4513' }}>Register</Link> to start writing.</>}
            </p>
          </div>
        )}

        {/* Post cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
          {posts.map(post => (
            <div key={post._id} style={{ background: 'var(--bg-accent)', borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
              {post.image && (
                <img src={`http://localhost:5000/uploads/${post.image}`} alt={post.title}
                  style={{ width: '100%', height: 180, objectFit: 'cover', margin: 0, borderRadius: 0 }} />
              )}
              <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: 8, flexGrow: 1 }}>
                <h3 style={{ fontFamily: "'Merriweather', serif", fontSize: '1rem' }}>
                  <Link to={`/posts/${post._id}`} style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>{post.title}</Link>
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', flexGrow: 1 }}>
                  {post.body.substring(0, 110)}{post.body.length > 110 ? '...' : ''}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#D4AF37', alignItems: 'center' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    {post.author?.profilePic && (
                      <img src={`http://localhost:5000/uploads/${post.author.profilePic}`} alt=''
                        style={{ width: 20, height: 20, borderRadius: '50%', objectFit: 'cover', margin: 0 }} />
                    )}
                    {post.author?.name}
                  </span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                <Link to={`/posts/${post._id}`} style={{ fontSize: '0.85rem', color: '#8B4513', fontWeight: 600 }}>Read more →</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Original Phase 1 preview sections ── */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>My Chess Highlights</h2>
        <ul style={{ marginLeft: '1.5rem' }}>
          {['Developed critical thinking skills that help me in school and everyday life',
            'Reached a 1200 rating on Chess.com after one year of dedicated practice',
            'Learned the Italian Game opening and won my first tournament game using it',
            'Completed over 500 tactical puzzles to sharpen my pattern recognition',
            'Joined a local chess club and made friends who share my passion for the game',
          ].map((h, i) => <li key={i} style={{ marginBottom: '0.7rem', lineHeight: '1.8' }}>{h}</li>)}
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>How I Discovered Chess</h2>
        <p style={{ marginBottom: '0.8rem' }}>My chess story began three years ago when my grandfather taught me the basic moves during a family visit. I was immediately fascinated by how each piece had its own unique way of moving and contributing to the game.</p>
        <Link to='/about' style={{ color: '#8B4513' }}>Read my full chess story and learning timeline →</Link>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>Join the Chess Community</h2>
        <p style={{ marginBottom: '0.8rem' }}>Whether you're a complete beginner or an experienced player, I'd love to connect with you! Register to write posts, leave comments, and be part of a growing community.</p>
        <Link to='/register' style={{ color: '#8B4513' }}>Sign up for chess updates and community access →</Link>
      </section>

    </main>
  );
};
export default HomePage;
