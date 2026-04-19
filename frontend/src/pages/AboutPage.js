// src/pages/AboutPage.js
// About page — chess origin story, lessons learned, mini game, and timeline.
// Demonstrates: importing a child component (MiniChessGame), .map() for lists.

import MiniChessGame from '../components/MiniChessGame';

// Timeline items kept as a data array so we render them with .map()
const TIMELINE = [
  { label: 'Months 1-3 (Complete Beginner)',  body: 'Learned how all pieces move, discovered basic rules like castling and en passant, played my first 50 games online and lost most of them.' },
  { label: 'Months 4-6 (Early Learning)',     body: 'Started studying basic openings like the Italian Game, learned fundamental tactics such as forks and pins, joined Chess.com and reached a 600 rating.' },
  { label: 'Months 7-12 (Building Foundation)', body: 'Completed 200+ tactical puzzles, studied endgame basics, won my first rated game against a 700-rated opponent, reached 900 rating.' },
  { label: 'Year 2 (Steady Improvement)',     body: 'Joined a local chess club, participated in my first tournament, expanded my opening repertoire, broke through to 1200 rating.' },
  { label: 'Year 3 (Current Stage)',           body: 'Studying intermediate strategy and positional play, analyzing grandmaster games weekly, maintaining consistent practice.' },
  { label: 'Future Goals',                    body: 'Reach 1500 rating within the next year, compete in regional tournaments, develop a solid repertoire for both colors.' },
];

// Life lessons chess has taught
const LESSONS = [
  { title: 'Patience and Planning',        body: 'In chess, rushing leads to mistakes. I\'ve learned to think several moves ahead and consider the consequences of my decisions before acting.' },
  { title: 'Learning from Failure',        body: 'I\'ve lost hundreds of games, but each loss taught me something new. Chess showed me that failure isn\'t the end — it\'s feedback.' },
  { title: 'Focus and Concentration',      body: 'A single moment of distraction can cost you the game. Chess has trained me to stay present, focused, and attentive.' },
];

function AboutPage() {
  return (
    <>
      <main className='main-content'>

        {/* ── Introduction ── */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 className='section-heading'>About My Chess Journey</h2>
          <p>Chess is more than just a game to me — it's a journey of continuous growth, learning, and self-discovery.</p>
        </section>

        {/* ── Origin story ── */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 className='section-heading'>How I Started Playing Chess</h2>
          <p style={{ marginBottom: '1rem' }}>
            Three years ago, during a quiet afternoon at my grandparents' house, my grandfather
            pulled out an old wooden chess set from his study. He began teaching me the basics —
            how the pawns march forward, how the knight jumps in an L-shape, and how the queen
            commands the board.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            At first, I lost every single game. But my grandfather always encouraged me to look at
            what went wrong and try again. That patience became the foundation of my chess mindset.
          </p>
          <p>
            Within six months, I had learned basic openings, common tactical patterns, and the
            importance of controlling the center of the board.
          </p>
        </section>

        {/* ── Life lessons ── */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 className='section-heading'>What Chess Has Taught Me</h2>
          {LESSONS.map(({ title, body }) => (
            <p key={title} style={{ marginBottom: '1rem' }}>
              <strong>{title}:</strong> {body}
            </p>
          ))}
        </section>

        {/* ── Interactive chess game ── */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 className='section-heading'>Play a Mini Chess Game!</h2>
          {/* MiniChessGame is a separate component — keeps this file clean */}
          <MiniChessGame />
        </section>

        {/* ── Famous quote ── */}
        <section className='chess-quote' style={{ marginBottom: '3rem' }}>
          <blockquote>
            <p>"Chess is the struggle against the error."</p>
            <cite>— Johannes Zukertort, Chess Grandmaster</cite>
          </blockquote>
        </section>

        {/* ── Learning timeline ── */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 className='section-heading'>My Chess Learning Timeline</h2>
          <p style={{ marginBottom: '1rem' }}>Here's how my chess journey has progressed from complete beginner to where I am today:</p>
          <ol style={{ marginLeft: '1.5rem' }}>
            {TIMELINE.map(({ label, body }) => (
              <li key={label} style={{ marginBottom: '0.8rem', lineHeight: '1.8' }}>
                <strong>{label}:</strong> {body}
              </li>
            ))}
          </ol>
        </section>

        {/* ── Why I love chess ── */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 className='section-heading'>Why I Love Chess</h2>
          <p style={{ marginBottom: '1rem' }}>
            Chess captivates me because it's infinitely deep — no matter how much I learn,
            there's always more to discover. The game is perfectly balanced between creativity
            and logic.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            I also love the community aspect of chess. Whether playing online or at my local
            club, I've met people from all backgrounds who share this passion. Chess connects
            generations, cultures, and skill levels in a way few other activities can.
          </p>
          <p>
            Most importantly, chess gives me a sense of continuous growth. There's no finish
            line — every day offers a chance to improve, to understand something new, and to
            push my boundaries.
          </p>
        </section>

      </main>
    </>
  );
}

export default AboutPage;
