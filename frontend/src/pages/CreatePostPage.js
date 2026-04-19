// src/pages/CreatePostPage.js
// Write and publish a new chess post via POST /api/posts.
// Uses FormData because image uploads need multipart/form-data.
// Cover image upload is only shown to admins (per the PDF spec).
// Redirects to the new post's page on success.

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const mainStyle  = { maxWidth: 1200, margin: '2rem auto', padding: '2rem', background: 'var(--bg-secondary)', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: 8 };
const labelStyle = { display: 'block', fontWeight: 600, marginBottom: 4 };
const inputStyle = { width: '100%', padding: '0.8rem', border: '2px solid #D4AF37', borderRadius: 5, fontFamily: "'Open Sans', sans-serif", fontSize: '0.95rem', background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none' };

const CreatePostPage = () => {
  const [title,   setTitle]   = useState('');
  const [body,    setBody]    = useState('');
  const [image,   setImage]   = useState(null);
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const { user }  = useAuth();
  const navigate  = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const fd = new FormData();
    fd.append('title', title);
    fd.append('body',  body);
    if (image) fd.append('image', image);
    try {
      const { data } = await API.post('/posts', fd);
      navigate(`/posts/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to publish post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={mainStyle}>
      <section style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontFamily: "'Merriweather', serif", borderBottom: '3px solid #D4AF37', paddingBottom: '0.5rem', marginBottom: '0.8rem' }}>
          Write a New Post
        </h2>
        <p>Share your chess knowledge, games, or thoughts with the community.</p>
      </section>

      <section style={{ background: 'var(--bg-accent)', padding: '2rem', borderRadius: 8 }}>
        {error && <p style={{ color: '#ff6b6b', fontWeight: 600, marginBottom: 12 }}>{error}</p>}

        <div style={{ marginBottom: '1.2rem' }}>
          <label style={labelStyle} htmlFor='title'>Post Title:</label>
          <input id='title' type='text' value={title} onChange={e => setTitle(e.target.value)}
            placeholder='Give your post a title' style={inputStyle} required />
        </div>

        <div style={{ marginBottom: '1.2rem' }}>
          <label style={labelStyle} htmlFor='body'>Post Content:</label>
          <textarea id='body' value={body} onChange={e => setBody(e.target.value)}
            placeholder='Write your chess post here...' rows={14}
            style={{ ...inputStyle, resize: 'vertical', minHeight: 280 }} required />
        </div>

        {/* Image upload — admins only, as per the Phase 2 PDF spec */}
        {user?.role === 'admin' && (
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={labelStyle} htmlFor='image'>Cover Image (Admin only):</label>
            <input id='image' type='file' accept='image/*'
              onChange={e => setImage(e.target.files[0])}
              style={{ fontFamily: "'Open Sans', sans-serif", marginBottom: 4 }} />
            <p style={{ fontSize: '0.82rem', color: '#D4AF37', fontStyle: 'italic' }}>JPG, PNG, GIF or WebP — max 5 MB</p>
          </div>
        )}

        <button onClick={handleSubmit} disabled={loading}
          style={{ background: '#D4AF37', color: '#2C2C2C', border: 'none', padding: '0.8rem 2rem', borderRadius: 5, fontWeight: 600, cursor: 'pointer', fontFamily: "'Open Sans', sans-serif", fontSize: '1rem' }}>
          {loading ? 'Publishing...' : 'Publish Post'}
        </button>
      </section>
    </main>
  );
};
export default CreatePostPage;
