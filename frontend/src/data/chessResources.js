// src/data/chessResources.js
// Static data array for the chess resources table on the Contact page.
// Keeping data separate from components follows the same pattern shown in
// Step 6 of the migration guide (src/data/posts.js).

const chessResources = [
  {
    id: 1,
    name: 'Chess.com',
    type: 'Online Platform',
    description:
      'Comprehensive chess website with lessons, puzzles, tournaments, and millions of players worldwide. Great for all skill levels.',
  },
  {
    id: 2,
    name: 'Lichess.org',
    type: 'Online Platform',
    description:
      'Free and open-source chess server with excellent analysis tools, training exercises, and no advertisements.',
  },
  {
    id: 3,
    name: 'GothamChess YouTube',
    type: 'Video Content',
    description:
      'Entertaining and educational chess videos covering openings, game analysis, and chess news from IM Levy Rozman.',
  },
  {
    id: 4,
    name: 'Chess Tactics for Students',
    type: 'Book',
    description:
      'Excellent beginner book by John Bain focusing on fundamental tactical patterns and combinations.',
  },
  {
    id: 5,
    name: 'ChessBase',
    type: 'Software',
    description:
      'Professional database and analysis software used by chess players worldwide to study games and openings.',
  },
];

export default chessResources;
