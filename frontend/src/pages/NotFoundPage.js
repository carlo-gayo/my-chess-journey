// src/pages/NotFoundPage.js
// Displays when a user navigates to an undefined route.

import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <main style={{ maxWidth: 900, margin: '4rem auto', padding: '2rem', textAlign: 'center', background: 'var(--bg-secondary)', borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}>
    <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1rem' }}>404</h1>
    <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
      Sorry, we couldn't find the page you were looking for.
    </p>
    <Link to="/home" style={{ display: 'inline-block', background: '#D4AF37', color: '#2C2C2C', padding: '0.9rem 1.8rem', borderRadius: 8, fontWeight: 700, textDecoration: 'none' }}>
      Return to Home
    </Link>
  </main>
);

export default NotFoundPage;
