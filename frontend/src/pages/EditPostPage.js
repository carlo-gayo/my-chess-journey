// src/pages/EditPostPage.js
// Loads existing post data into a form (useEffect), lets owner/admin
// edit it, and saves via PUT /api/posts/:id.

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const mainStyle  = { maxWidth: 1200, margin: '2rem auto', padding: '2rem', background: 'var(--bg-secondary)', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: 8 };
const labelStyle = { display: 'block', fontWeight: 600, marginBottom: 4 };
const inputStyle = { width: '100%', padding: '0.8rem', border: '2px solid #D4AF37', borderRadius: 5, fontFamily: "'Open Sans', sans-serif", fontSize: '0.95rem', background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none' };

const EditPostPage = () => {
  const { id }   = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [title,   setTitle]   = useState('');
  const [body,    setBody]    = useState('');
  const [image,   setImage]   = useState(null);
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);

  // Pre-fill form with existing post data
  useEffect(() => {
    API.get(`/posts/${id}`)
      .then(res => { setTitle(res.data.title); setBody(res.data.body); })
      .catch(() => setError('Could not load post.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    const fd = new FormData();
    fd.append('title', title);
    fd.append('body',  body);
    if (image) fd.append('image', image);
    try {
      await API.put(`/posts/${id}`, fd);
      navigate(`/posts/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save changes.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <main style={mainStyle}><p style={{ fontStyle: 'italic', padding: '2rem' }}>Loading post...</p></main>;

  return (
    <main style={mainStyle}>
      <section style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontFamily: "'Merriweather', serif", borderBottom: '3px solid #D4AF37', paddingBottom: '0.5rem' }}>
          Edit Post
        </h2>
      </section>

      <section style={{ background: 'var(--bg-accent)', padding: '2rem', borderRadius: 8 }}>
        {error && <p style={{ color: '#ff6b6b', fontWeight: 600, marginBottom: 12 }}>{error}</p>}

        <div style={{ marginBottom: '1.2rem' }}>
          <label style={labelStyle} htmlFor='edit-title'>Title:</label>
          <input id='edit-title' type='text' value={title} onChange={e => setTitle(e.target.value)}
            style={inputStyle} required />
        </div>

        <div style={{ marginBottom: '1.2rem' }}>
          <label style={labelStyle} htmlFor='edit-body'>Content:</label>
          <textarea id='edit-body' value={body} onChange={e => setBody(e.target.value)}
            rows={14} style={{ ...inputStyle, resize: 'vertical', minHeight: 280 }} required />
        </div>

        {/* Image replacement — admins only */}
        {user?.role === 'admin' && (
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={labelStyle} htmlFor='edit-image'>Replace Cover Image (Admin only):</label>
            <input id='edit-image' type='file' accept='image/*'
              onChange={e => setImage(e.target.files[0])}
              style={{ fontFamily: "'Open Sans', sans-serif", marginBottom: 4 }} />
          </div>
        )}

        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={handleSubmit} disabled={saving}
            style={{ background: '#D4AF37', color: '#2C2C2C', border: 'none', padding: '0.8rem 2rem', borderRadius: 5, fontWeight: 600, cursor: 'pointer', fontFamily: "'Open Sans', sans-serif", fontSize: '1rem' }}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button onClick={() => navigate(`/posts/${id}`)}
            style={{ background: '#2C2C2C', color: '#F5F5DC', border: 'none', padding: '0.8rem 2rem', borderRadius: 5, fontWeight: 600, cursor: 'pointer', fontFamily: "'Open Sans', sans-serif", fontSize: '1rem' }}>
            Cancel
          </button>
        </div>
      </section>
    </main>
  );
};
export default EditPostPage;
