// src/data/galleryImages.js
// Data arrays for the Gallery page.
// Separating data from UI keeps components clean and easy to update.

export const galleryImages = [
  { id: 1, src: '/pictures/schoolTournament (1).jpg.webp', caption: 'My first school tournament - first champion',  alt: 'First school tournament'    },
  { id: 2, src: '/pictures/myChessBuddies.jpg.webp',        caption: 'My Chess Buddies',                            alt: 'Chess buddies'               },
  { id: 3, src: '/pictures/firstuu.jpg.jpg',               caption: 'My first offline Tournament',                alt: 'First offline tournament'    },
  { id: 4, src: '/pictures/outing.jpg.jpg',                caption: 'Outing with my Chess Buddies',               alt: 'Outing with chess buddies'   },
  { id: 5, src: '/pictures/fav.jpg.jpg',                   caption: 'My favorite chess buddy',                    alt: 'Favorite chess buddy'        },
  { id: 6, src: '/pictures/myLast.jpg.webp',               caption: 'My Last Eagles Representation!',             alt: 'Last Eagles representation'  },
];

export const tacticDiagrams = [
  { id: 1, src: '/pictures/fork.jpg',       caption: 'The Knight Fork — A fundamental tactic'       },
  { id: 2, src: '/pictures/backRank.png',   caption: 'Back Rank Mate — Always watch your king!'     },
  { id: 3, src: '/pictures/kingPawn.png',   caption: 'King and Pawn Endgame — Mastering the basics' },
];

export const gameHighlights = [
  {
    id: 1,
    title: 'Victory Against a 1400-Rated Opponent',
    date: 'October 2024',
    body: 'This was a breakthrough moment in my chess development. Playing as Black with the Sicilian Defense, I managed to survive a dangerous attack and convert a slight advantage in the endgame. The game taught me the importance of patience and precise calculation under pressure.',
  },
  {
    id: 2,
    title: 'First Tournament Experience',
    date: 'March 2024',
    body: 'Walking into my first over-the-board tournament was intimidating, but incredibly exciting. Though I finished in the middle of the pack, every game taught me something new. The experience of playing with a clock and recording moves on a scoresheet made chess feel more real than ever.',
  },
  {
    id: 3,
    title: 'Defeating My Chess Mentor',
    date: 'July 2024',
    body: 'After two years of learning from my grandfather, I finally won a fair game against him. That victory wasn\'t just about winning—it was validation that all the hours of study and practice were paying off. He was proud, and so was I.',
  },
];
