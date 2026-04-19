// src/components/Nav.js
// Shared navigation bar rendered on every page except the splash screen.
// Uses <Link> (not <a href>) so navigation never triggers a full page reload.
// useLocation detects the current path to highlight the active link.

import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Navigation links shared across all pages
const NAV_LINKS = [
  { path: '/home',     label: 'Home'     },
  { path: '/about',    label: 'About'    },
  { path: '/gallery',  label: 'Gallery'  },
  { path: '/contact',  label: 'Contact'  },
  { path: '/register', label: 'Register' },
];

function Nav() {
  // useLocation gives us the current URL path so we can mark the active link
  const location = useLocation();

  // Theme state — reads from localStorage so the choice persists across pages
  const [theme, setTheme] = useState(
    () => localStorage.getItem('chessTheme') || 'light'
  );

  // Apply the theme attribute to <html> whenever theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('chessTheme', theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme(current => (current === 'dark' ? 'light' : 'dark'));

  return (
    <header className='site-header'>
      {/* Site logo / title */}
      <div className='logo'>
        <h1>♟ My Chess Journey</h1>
        <p className='tagline'>From First Move to Every Lesson Learned</p>
      </div>

      {/* Navigation links */}
      <nav className='navbar'>
        <ul>
          {NAV_LINKS.map(link => (
            <li key={link.path}>
              {/* className comparison highlights the active page */}
              <Link
                to={link.path}
                className={location.pathname === link.path ? 'active' : ''}
              >
                {link.label}
              </Link>
            </li>
          ))}

          {/* Dark / Light mode toggle */}
          <li>
            <button
              className='theme-toggle-btn'
              onClick={toggleTheme}
              aria-label='Toggle theme'
            >
              {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Nav;
