// src/pages/SplashPage.js
// Splash / loading screen — the first thing the user sees at "/".
// After 3 seconds it automatically redirects to /home using useNavigate.
// Demonstrates: useEffect for side effects, useNavigate for programmatic routing.

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SplashPage() {
  // Animated dots: ".", "..", "..."
  const [dots, setDots] = useState('...');
  const navigate = useNavigate();

  useEffect(() => {
    // Cycle the loading dots every 500 ms
    const dotInterval = setInterval(() => {
      setDots(current => (current.length >= 3 ? '.' : current + '.'));
    }, 500);

    // After 3 s, redirect to the home page
    const redirectTimer = setTimeout(() => {
      clearInterval(dotInterval);
      navigate('/home');
    }, 3000);

    // Cleanup: cancel both timers when the component unmounts
    return () => {
      clearInterval(dotInterval);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div className='splash-screen'>
      <div className='splash-chess-icon'>♟️</div>
      <h1>My Chess Journey</h1>
      <div className='spinner' />
      <p className='loading-text'>Loading{dots}</p>
    </div>
  );
}

export default SplashPage;
