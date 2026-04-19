// src/pages/RegisterPage.js
// Phase 2: hits POST /api/auth/register — replaces the Phase 1 demo form.
// On success saves the JWT token and redirects to /home.
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/axios';

const inputStyle = {
  width: '100%', padding: '0.8rem', border: '2px solid #D4AF37', borderRadius: 5,
  fontFamily: "'Open Sans', sans-serif", fontSize: '0.95rem',
  background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none',
};

const RegisterPage = () => {
  const [form,    setForm]    = useState({ name: '', email: '', password: '' });
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await API.post('/auth/register', form);
      localStorage.setItem('token', data.token);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: 1200, margin: '2rem auto', padding: '2rem', background: 'var(--bg-secondary)', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: 8 }}>
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: "'Merriweather', serif", borderBottom: '3px solid #D4AF37', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
          Join the Chess Community
        </h2>
        <p>Register to write posts, leave comments, and connect with fellow chess enthusiasts.</p>
      </section>

      <section style={{ maxWidth: 520 }}>
        {error && <p style={{ color: '#ff6b6b', fontWeight: 600, marginBottom: 12 }}>{error}</p>}
        <div style={{ background: 'var(--bg-accent)', padding: '2rem', borderRadius: 8 }}>
          {[
            { id: 'name',     label: 'Full Name:',       type: 'text',     ph: 'Enter your full name' },
            { id: 'email',    label: 'Email Address:',   type: 'email',    ph: 'your.email@example.com' },
            { id: 'password', label: 'Password:',        type: 'password', ph: 'Minimum 6 characters' },
          ].map(({ id, label, type, ph }) => (
            <div key={id} style={{ marginBottom: '1.2rem' }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 4 }}>{label}</label>
              <input id={id} name={id} type={type} placeholder={ph}
                value={form[id]} onChange={handleChange} style={inputStyle} required />
            </div>
          ))}
          <button onClick={handleSubmit} disabled={loading}
            style={{ background: '#D4AF37', color: '#2C2C2C', border: 'none', padding: '0.8rem 2rem', borderRadius: 5, fontWeight: 600, cursor: 'pointer', fontFamily: "'Open Sans', sans-serif", fontSize: '1rem' }}>
            {loading ? 'Creating account...' : 'Register Now'}
          </button>
        </div>
        <p style={{ marginTop: 16 }}>Already have an account? <Link to='/login' style={{ color: '#8B4513' }}>Login here</Link></p>
      </section>
    </main>
  );
};
export default RegisterPage;
