// src/pages/LoginPage.js
// Login form — calls POST /api/auth/login via AuthContext.login().
// Admins redirect to /admin, members redirect to /home.

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const { login } = useAuth();
  const navigate  = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(email, password);
      navigate(user.role === 'admin' ? '/admin' : '/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: 1200, margin: '2rem auto', padding: '2rem', background: 'var(--bg-secondary)', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: 8 }}>
      <section style={{ maxWidth: 480, margin: '0 auto' }}>
        <h2 style={{ fontFamily: "'Merriweather', serif", borderBottom: '3px solid #D4AF37', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
          Login to My Chess Journey
        </h2>

        {error && <p style={{ color: '#ff6b6b', fontWeight: 600, marginBottom: 12 }}>{error}</p>}

        <div style={{ background: 'var(--bg-accent)', padding: '2rem', borderRadius: 8 }}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 4 }}>Email Address:</label>
            <input type='email' value={email} onChange={e => setEmail(e.target.value)}
              placeholder='your.email@example.com'
              style={{ width: '100%', padding: '0.8rem', border: '2px solid #D4AF37', borderRadius: 5, fontFamily: "'Open Sans', sans-serif", background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 4 }}>Password:</label>
            <input type='password' value={password} onChange={e => setPassword(e.target.value)}
              placeholder='Your password'
              style={{ width: '100%', padding: '0.8rem', border: '2px solid #D4AF37', borderRadius: 5, fontFamily: "'Open Sans', sans-serif", background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
          </div>
          <button onClick={handleSubmit} disabled={loading}
            style={{ background: '#D4AF37', color: '#2C2C2C', border: 'none', padding: '0.8rem 2rem', borderRadius: 5, fontWeight: 600, cursor: 'pointer', fontFamily: "'Open Sans', sans-serif", fontSize: '1rem' }}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>

        <p style={{ marginTop: 16 }}>
          Don't have an account? <Link to='/register' style={{ color: '#8B4513' }}>Register here</Link>
        </p>
      </section>
    </main>
  );
};

export default LoginPage;
