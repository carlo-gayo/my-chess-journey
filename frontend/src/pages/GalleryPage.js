// src/pages/GalleryPage.js
// Gallery page — photo grid, game highlights, and tactical diagrams.
// Demonstrates: .map() over data arrays imported from src/data/,
// and onError fallback for missing image files.

import { galleryImages, gameHighlights, tacticDiagrams } from '../data/galleryImages';

function GalleryPage() {
  return (
    <>
      <main className='main-content'>

        {/* ── Gallery intro ── */}
        <section style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className='section-heading'>My Chess Gallery</h2>
          <p style={{ maxWidth: 800, margin: '0 auto', color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            This gallery captures the memorable moments of my chess journey — from my first
            tournament to casual games with friends. Each photograph tells a story of growth,
            challenge, and the pure joy of playing the game I love.
          </p>
        </section>

        {/* ── Photo grid ── */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 className='section-heading'>Moments from the Board</h2>

          {/* CSS Grid layout defined in index.css (.gallery-grid) */}
          <div className='gallery-grid'>
            {/* Render each gallery image using .map() — Step 6 pattern */}
            {galleryImages.map(({ id, src, caption, alt }) => (
              <div key={id} className='gallery-item'>
                <img
                  src={src}
                  alt={alt}
                  // Hide broken images gracefully if the file isn't found
                  onError={e => { e.target.style.display = 'none'; }}
                />
                <p className='image-caption'>{caption}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Game highlights ── */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 className='section-heading'>Memorable Games & Achievements</h2>
          {gameHighlights.map(({ id, title, date, body }) => (
            <div key={id} className='game-highlight'>
              <h3>{title}</h3>
              <p className='game-date'>{date}</p>
              <p>{body}</p>
            </div>
          ))}
        </section>

        {/* ── Tactical diagrams ── */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 className='section-heading'>Favorite Tactical Patterns</h2>
          <p style={{ marginBottom: '1rem' }}>
            Here are some of my favorite chess positions and tactical themes that I've
            encountered and studied throughout my journey:
          </p>
          <div className='diagrams-grid'>
            {tacticDiagrams.map(({ id, src, caption }) => (
              <div key={id} className='diagram-item'>
                <img
                  src={src}
                  alt={caption}
                  onError={e => { e.target.style.display = 'none'; }}
                />
                <p className='diagram-caption'>{caption}</p>
              </div>
            ))}
          </div>
        </section>

      </main>
    </>
  );
}

export default GalleryPage;
