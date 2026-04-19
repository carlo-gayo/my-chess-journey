// src/pages/AdminPage.js
// Admin dashboard — two tabs: Members and All Posts.
//   Members: toggle active/inactive status
//   Posts:   view all (including removed), mark as removed

import { useState, useEffect } from 'react';
import API from '../api/axios';

const mainStyle = { maxWidth: 1200, margin: '2rem auto', padding: '2rem', background: 'var(--bg-secondary)', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: 8 };
const tableStyle = { width: '100%', borderCollapse: 'collapse', marginTop: 16 };
const thStyle = { padding: '0.8rem 1rem', textAlign: 'left', background: '#2C2C2C', color: '#F5F5DC', fontFamily: "'Merriweather', serif", fontSize: '0.9rem' };
const tdStyle = { padding: '0.8rem 1rem', borderBottom: '1px solid var(--bg-accent)', color: 'var(--text-primary)', verticalAlign: 'middle' };

const StatusBadge = ({ status }) => (
  <span style={{ padding: '3px 12px', borderRadius: 12, fontSize: '0.8rem', fontWeight: 700,
    background: status === 'active' || status === 'published' ? '#27ae60' : '#c0392b', color: 'white' }}>
    {status}
  </span>
);

const AdminPage = () => {
  const [users,   setUsers]   = useState([]);
  const [posts,   setPosts]   = useState([]);
  const [tab,     setTab]     = useState('users');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([API.get('/admin/users'), API.get('/admin/posts')])
      .then(([u, p]) => { setUsers(u.data); setPosts(p.data); })
      .catch(err => console.error('Admin fetch error:', err))
      .finally(() => setLoading(false));
  }, []);

  const toggleStatus = async (userId) => {
    try {
      const { data } = await API.put(`/admin/users/${userId}/status`);
      setUsers(prev => prev.map(u => u._id === userId ? data.user : u));
    } catch (err) { alert(err.response?.data?.message || 'Failed to update status.'); }
  };

  const removePost = async (postId) => {
    if (!window.confirm('Remove this post? It will be hidden from public view.')) return;
    try {
      await API.put(`/admin/posts/${postId}/remove`);
      setPosts(prev => prev.map(p => p._id === postId ? { ...p, status: 'removed' } : p));
    } catch (err) { alert(err.response?.data?.message || 'Failed to remove post.'); }
  };

  if (loading) return <main style={mainStyle}><p style={{ fontStyle: 'italic', padding: '2rem' }}>Loading dashboard...</p></main>;

  return (
    <main style={mainStyle}>
      <section style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontFamily: "'Merriweather', serif", borderBottom: '3px solid #D4AF37', paddingBottom: '0.5rem' }}>
          ⭐ Admin Dashboard
        </h2>
      </section>

      {/* ── Tab switcher ── */}
      <div style={{ display: 'flex', gap: 12, marginBottom: '1.5rem' }}>
        {[['users', `Members (${users.length})`], ['posts', `All Posts (${posts.length})`]].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)}
            style={{ background: tab === key ? '#2C2C2C' : '#D4AF37', color: tab === key ? '#F5F5DC' : '#2C2C2C',
              border: 'none', padding: '0.7rem 1.6rem', borderRadius: 5, fontWeight: 600,
              cursor: 'pointer', fontFamily: "'Open Sans', sans-serif", fontSize: '0.95rem' }}>
            {label}
          </button>
        ))}
      </div>

      {/* ── Members tab ── */}
      {tab === 'users' && (
        <section style={{ background: 'var(--bg-accent)', padding: '1.5rem', borderRadius: 8, overflowX: 'auto' }}>
          <h3 style={{ fontFamily: "'Merriweather', serif", marginBottom: '1rem' }}>Member Accounts</h3>
          {users.length === 0 && <p style={{ fontStyle: 'italic' }}>No members registered yet.</p>}
          {users.length > 0 && (
            <table style={tableStyle}>
              <thead>
                <tr>
                  {['Name', 'Email', 'Registered', 'Status', 'Action'].map(h => <th key={h} style={thStyle}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u._id} style={{ background: 'var(--bg-secondary)' }}>
                    <td style={tdStyle}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {u.profilePic && (
                          <img src={`http://localhost:5000/uploads/${u.profilePic}`} alt=''
                            style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', margin: 0 }} />
                        )}
                        {u.name}
                      </div>
                    </td>
                    <td style={tdStyle}>{u.email}</td>
                    <td style={tdStyle}>{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td style={tdStyle}><StatusBadge status={u.status} /></td>
                    <td style={tdStyle}>
                      <button onClick={() => toggleStatus(u._id)}
                        style={{ background: u.status === 'active' ? '#c0392b' : '#27ae60', color: 'white',
                          border: 'none', padding: '5px 14px', borderRadius: 5, fontWeight: 600,
                          cursor: 'pointer', fontFamily: "'Open Sans', sans-serif", fontSize: '0.82rem' }}>
                        {u.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      )}

      {/* ── Posts tab ── */}
      {tab === 'posts' && (
        <section style={{ background: 'var(--bg-accent)', padding: '1.5rem', borderRadius: 8, overflowX: 'auto' }}>
          <h3 style={{ fontFamily: "'Merriweather', serif", marginBottom: '1rem' }}>All Posts</h3>
          {posts.length === 0 && <p style={{ fontStyle: 'italic' }}>No posts yet.</p>}
          {posts.length > 0 && (
            <table style={tableStyle}>
              <thead>
                <tr>
                  {['Title', 'Author', 'Date', 'Status', 'Action'].map(h => <th key={h} style={thStyle}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {posts.map(p => (
                  <tr key={p._id} style={{ background: 'var(--bg-secondary)' }}>
                    <td style={{ ...tdStyle, maxWidth: 280 }}>{p.title}</td>
                    <td style={tdStyle}>{p.author?.name}</td>
                    <td style={tdStyle}>{new Date(p.createdAt).toLocaleDateString()}</td>
                    <td style={tdStyle}><StatusBadge status={p.status} /></td>
                    <td style={tdStyle}>
                      {p.status === 'published' ? (
                        <button onClick={() => removePost(p._id)}
                          style={{ background: '#c0392b', color: 'white', border: 'none',
                            padding: '5px 14px', borderRadius: 5, fontWeight: 600,
                            cursor: 'pointer', fontFamily: "'Open Sans', sans-serif", fontSize: '0.82rem' }}>
                          Remove
                        </button>
                      ) : (
                        <span style={{ fontSize: '0.8rem', fontStyle: 'italic', color: 'var(--text-secondary)' }}>Removed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      )}
    </main>
  );
};
export default AdminPage;
