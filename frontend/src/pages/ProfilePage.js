// src/pages/ProfilePage.js
// Lets a logged-in user update their name, bio, and profile picture,
// and change their password.
// Uses FormData for profile update because it includes a file upload.
// Never set Content-Type manually with FormData — Axios handles it automatically.

import { useState } from 'react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const mainStyle  = { maxWidth: 1200, margin: '2rem auto', padding: '2rem', background: 'var(--bg-secondary)', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: 8 };
const cardStyle  = { background: 'var(--bg-accent)', padding: '2rem', borderRadius: 8, marginBottom: '2rem' };
const labelStyle = { display: 'block', fontWeight: 600, marginBottom: 4 };
const inputStyle = { width: '100%', padding: '0.8rem', border: '2px solid #D4AF37', borderRadius: 5, fontFamily: "'Open Sans', sans-serif", background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none', marginBottom: '1rem' };

const ProfilePage = () => {
  const { user, setUser } = useAuth();

  const [name,    setName]    = useState(user?.name || '');
  const [bio,     setBio]     = useState(user?.bio  || '');
  const [pic,     setPic]     = useState(null);
  const [curPw,   setCurPw]   = useState('');
  const [newPw,   setNewPw]   = useState('');
  const [msg,     setMsg]     = useState('');
  const [isError, setIsError] = useState(false);

  const showMsg = (text, err = false) => { setMsg(text); setIsError(err); };

  // ── Update profile (name, bio, picture) ──────────────────────────────
  const handleProfile = async (e) => {
    e.preventDefault();
    setMsg('');
    const fd = new FormData();
    fd.append('name', name);
    fd.append('bio',  bio);
    if (pic) fd.append('profilePic', pic);
    try {
      const { data } = await API.put('/auth/profile', fd);
      setUser(data);
      showMsg('✓ Profile updated successfully!');
    } catch (err) {
      showMsg(err.response?.data?.message || 'Update failed.', true);
    }
  };

  // ── Change password ───────────────────────────────────────────────────
  const handlePassword = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      await API.put('/auth/change-password', { currentPassword: curPw, newPassword: newPw });
      showMsg('✓ Password changed successfully!');
      setCurPw('');
      setNewPw('');
    } catch (err) {
      showMsg(err.response?.data?.message || 'Password change failed.', true);
    }
  };

  const picSrc = user?.profilePic ? `http://localhost:5000/uploads/${user.profilePic}` : null;

  return (
    <main style={mainStyle}>

      {/* ── Profile header ── */}
      <section style={{ textAlign: 'center', marginBottom: '2rem' }}>
        {picSrc
          ? <img src={picSrc} alt='Profile' style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 12px', border: '3px solid #D4AF37' }} />
          : <div style={{ fontSize: 64, marginBottom: 8 }}>♟️</div>
        }
        <h2 style={{ fontFamily: "'Merriweather', serif" }}>{user?.name}</h2>
        {user?.bio && <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)', marginTop: 6 }}>{user.bio}</p>}
        <p style={{ fontSize: '0.85rem', color: '#D4AF37', marginTop: 4, fontWeight: 600 }}>
          Role: {user?.role === 'admin' ? '⭐ Admin' : 'Member'}
        </p>
      </section>

      {/* Status message */}
      {msg && (
        <p style={{ fontWeight: 600, marginBottom: 16, color: isError ? '#ff6b6b' : '#27ae60' }}>{msg}</p>
      )}

      {/* ── Edit Profile ── */}
      <section style={cardStyle}>
        <h3 style={{ fontFamily: "'Merriweather', serif", marginBottom: '1.2rem', borderBottom: '2px solid #D4AF37', paddingBottom: '0.5rem' }}>Edit Profile</h3>
        <div>
          <label style={labelStyle} htmlFor='prof-name'>Display Name:</label>
          <input id='prof-name' type='text' value={name} onChange={e => setName(e.target.value)}
            placeholder='Your name' style={inputStyle} />

          <label style={labelStyle} htmlFor='prof-bio'>Short Bio:</label>
          <textarea id='prof-bio' value={bio} onChange={e => setBio(e.target.value)}
            placeholder='Tell us about yourself...' rows={3}
            style={{ ...inputStyle, resize: 'vertical', minHeight: 90 }} />

          <label style={labelStyle} htmlFor='prof-pic'>Change Profile Picture:</label>
          <input id='prof-pic' type='file' accept='image/*'
            onChange={e => setPic(e.target.files[0])}
            style={{ marginBottom: '0.5rem', fontFamily: "'Open Sans', sans-serif" }} />
          <p style={{ fontSize: '0.82rem', color: '#D4AF37', fontStyle: 'italic', marginBottom: '1rem' }}>JPG, PNG, GIF or WebP — max 5 MB</p>

          <button style={{ background: '#D4AF37', color: '#2C2C2C', border: 'none', padding: '0.8rem 2rem', borderRadius: 5, fontWeight: 600, cursor: 'pointer', fontFamily: "'Open Sans', sans-serif", fontSize: '1rem' }}
            onClick={handleProfile}>
            Save Profile
          </button>
        </div>
      </section>

      {/* ── Change Password ── */}
      <section style={cardStyle}>
        <h3 style={{ fontFamily: "'Merriweather', serif", marginBottom: '1.2rem', borderBottom: '2px solid #D4AF37', paddingBottom: '0.5rem' }}>Change Password</h3>
        <div>
          <label style={labelStyle} htmlFor='cur-pw'>Current Password:</label>
          <input id='cur-pw' type='password' value={curPw} onChange={e => setCurPw(e.target.value)}
            placeholder='Enter current password' style={inputStyle} required />

          <label style={labelStyle} htmlFor='new-pw'>New Password:</label>
          <input id='new-pw' type='password' value={newPw} onChange={e => setNewPw(e.target.value)}
            placeholder='New password (min 6 chars)' style={inputStyle} required minLength={6} />

          <button style={{ background: '#D4AF37', color: '#2C2C2C', border: 'none', padding: '0.8rem 2rem', borderRadius: 5, fontWeight: 600, cursor: 'pointer', fontFamily: "'Open Sans', sans-serif", fontSize: '1rem' }}
            onClick={handlePassword}>
            Change Password
          </button>
        </div>
      </section>

    </main>
  );
};
export default ProfilePage;
