// src/components/Navbar.js
// Phase 2 navigation bar — auth-aware version of the Phase 1 Nav.js.
// Shows different links depending on login state and role:
//   Guest  → Home, About, Gallery, Contact, Register, Login
//   Member → Home, About, Gallery, Contact, Write, Profile, Logout
//   Admin  → all Member links + Admin

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const location = useLocation();
  const navigate  = useNavigate();
  const { user, logout } = useAuth();

  // Theme toggle — preserved from Phase 1
  const [theme, setTheme] = useState(
    () => localStorage.getItem('chessTheme') || 'light'
  );
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('chessTheme', theme);
  }, [theme]);
  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

  const handleLogout = () => {
    logout();
    navigate('/home');
  };

  const active = (path) => location.pathname === path ? 'active' : '';

  // Shared link style
  const linkStyle = {
    color: '#F5F5DC',
    fontWeight: 600,
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    transition: 'background-color 0.3s, color 0.3s',
    textDecoration: 'none',
    fontFamily: "'Open Sans', sans-serif",
    fontSize: '0.95rem',
  };

  return (
    <header style={{ background: '#2C2C2C', color: '#F5F5DC', padding: '1.5rem 2rem', textAlign: 'center' }}>
      <div>
        <h1 style={{ color: '#D4AF37', fontSize: 'clamp(1.4rem, 4vw, 2.5rem)', marginBottom: '0.3rem', fontFamily: "'Merriweather', serif" }}>
          ♟ My Chess Journey
        </h1>
        <p style={{ fontStyle: 'italic', color: '#F5F5DC', fontSize: '1rem', marginBottom: '1rem' }}>
          From First Move to Every Lesson Learned
        </p>
      </div>

      <nav>
        <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', padding: 0, margin: 0 }}>

          {/* ── Always visible ── */}
          <li><Link to='/home'    style={linkStyle} className={active('/home')}>Home</Link></li>
          <li><Link to='/about'   style={linkStyle} className={active('/about')}>About</Link></li>
          <li><Link to='/gallery' style={linkStyle} className={active('/gallery')}>Gallery</Link></li>
          <li><Link to='/contact' style={linkStyle} className={active('/contact')}>Contact</Link></li>

          {/* ── Guest only ── */}
          {!user && (
            <>
              <li><Link to='/register' style={linkStyle} className={active('/register')}>Register</Link></li>
              <li><Link to='/login'    style={linkStyle} className={active('/login')}>Login</Link></li>
            </>
          )}

          {/* ── Logged-in ── */}
          {user && (
            <>
              <li><Link to='/create-post' style={linkStyle} className={active('/create-post')}>Write</Link></li>
              <li><Link to='/profile'     style={linkStyle} className={active('/profile')}>
                {user.profilePic
                  ? <img src={`http://localhost:5000/uploads/${user.profilePic}`} alt=''
                      style={{ width: 24, height: 24, borderRadius: '50%', objectFit: 'cover', verticalAlign: 'middle', marginRight: 6 }} />
                  : null
                }
                {user.name}
              </Link></li>
              {user.role === 'admin' && (
                <li><Link to='/admin' style={{ ...linkStyle, background: '#D4AF37', color: '#2C2C2C' }} className={active('/admin')}>Admin</Link></li>
              )}
              <li>
                <button onClick={handleLogout} style={{ ...linkStyle, background: 'transparent', border: 'none', cursor: 'pointer', color: '#F5F5DC' }}>
                  Logout
                </button>
              </li>
            </>
          )}

          {/* Theme toggle */}
          <li>
            <button onClick={toggleTheme} aria-label='Toggle theme' style={{
              background: 'transparent', border: '2px solid #D4AF37', color: '#F5F5DC',
              padding: '0.4rem 1rem', borderRadius: '25px', cursor: 'pointer',
              fontFamily: "'Open Sans', sans-serif", fontSize: '0.9rem', transition: 'all 0.3s'
            }}>
              {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
