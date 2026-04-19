// src/components/MiniChessGame.js
// Self-contained interactive chess board.
// Demonstrates: useState for board state, click handling, and conditional rendering.

import { useState } from 'react';

// Unicode chess piece symbols keyed by piece code (color + type)
const PIECE_SYMBOLS = {
  wK: '♔', wQ: '♕', wR: '♖', wB: '♗', wN: '♘', wP: '♙',
  bK: '♚', bQ: '♛', bR: '♜', bB: '♝', bN: '♞', bP: '♟',
};

// Starting board position — 8×8 array, null = empty square
const INIT_BOARD = [
  ['bR','bN','bB','bQ','bK','bB','bN','bR'],
  ['bP','bP','bP','bP','bP','bP','bP','bP'],
  [null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null],
  ['wP','wP','wP','wP','wP','wP','wP','wP'],
  ['wR','wN','wB','wQ','wK','wB','wN','wR'],
];

// ─── Move validation (no check detection) ────────────────────────────────
function isLegalMove(board, piece, fromR, fromC, toR, toC) {
  if (!piece) return false;
  const color  = piece[0];
  const target = board[toR][toC];

  // Cannot capture your own piece
  if (target && target[0] === color) return false;

  const dr = toR - fromR;
  const dc = toC - fromC;
  const absR = Math.abs(dr);
  const absC = Math.abs(dc);

  // Check that the path between two squares is clear (for sliding pieces)
  const pathClear = () => {
    const stepR = Math.sign(dr);
    const stepC = Math.sign(dc);
    let r = fromR + stepR;
    let c = fromC + stepC;
    while (r !== toR || c !== toC) {
      if (board[r][c]) return false;
      r += stepR;
      c += stepC;
    }
    return true;
  };

  switch (piece.slice(1)) {
    case 'P': {
      const forward  = color === 'w' ? -1 : 1;
      const startRow = color === 'w' ?  6 : 1;
      if (dc === 0 && dr === forward && !board[toR][toC]) return true;
      if (dc === 0 && dr === 2 * forward && fromR === startRow
          && !board[fromR + forward][fromC] && !board[toR][toC]) return true;
      if (absC === 1 && dr === forward && target && target[0] !== color) return true;
      return false;
    }
    case 'N': return (absR === 2 && absC === 1) || (absR === 1 && absC === 2);
    case 'B': return absR === absC && absR > 0 && pathClear();
    case 'R': return ((dr === 0 && dc !== 0) || (dc === 0 && dr !== 0)) && pathClear();
    case 'Q': return ((absR === absC && absR > 0) || (dr === 0 && dc !== 0) || (dc === 0 && dr !== 0)) && pathClear();
    case 'K': return Math.max(absR, absC) === 1;
    default:  return false;
  }
}

// ─── Component ───────────────────────────────────────────────────────────
function MiniChessGame() {
  // board: current 8×8 piece positions
  const [board, setBoard]           = useState(() => INIT_BOARD.map(r => [...r]));
  // turn: 'w' (white) or 'b' (black)
  const [turn, setTurn]             = useState('w');
  // selected: [row, col] of the currently selected piece, or null
  const [selected, setSelected]     = useState(null);
  // highlights: array of [row, col] squares the selected piece can move to
  const [highlights, setHighlights] = useState([]);

  // Calculate all legal destination squares for a piece
  const getValidMoves = (b, row, col) => {
    const moves = [];
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (isLegalMove(b, b[row][col], row, col, r, c)) {
          moves.push([r, c]);
        }
      }
    }
    return moves;
  };

  // Handle a square being clicked
  const handleSquareClick = (row, col) => {
    const piece = board[row][col];

    if (selected) {
      const [selRow, selCol] = selected;
      const isHighlighted = highlights.some(([hr, hc]) => hr === row && hc === col);

      if (isHighlighted) {
        // Execute the move: copy the board, move the piece, clear source square
        const newBoard = board.map(r => [...r]);
        newBoard[row][col]     = newBoard[selRow][selCol];
        newBoard[selRow][selCol] = null;
        setBoard(newBoard);
        setTurn(t => (t === 'w' ? 'b' : 'w'));
        setSelected(null);
        setHighlights([]);
      } else if (piece && piece[0] === turn) {
        // Clicked a different friendly piece — switch selection
        setSelected([row, col]);
        setHighlights(getValidMoves(board, row, col));
      } else {
        // Clicked an empty/enemy square that's not a valid move — deselect
        setSelected(null);
        setHighlights([]);
      }
    } else if (piece && piece[0] === turn) {
      // Select this piece and show its valid moves
      setSelected([row, col]);
      setHighlights(getValidMoves(board, row, col));
    }
  };

  // Reset the board to the starting position
  const handleRestart = () => {
    setBoard(INIT_BOARD.map(r => [...r]));
    setTurn('w');
    setSelected(null);
    setHighlights([]);
  };

  return (
    <div className='chessboard-wrapper'>
      {/* Render 8×8 grid */}
      <div className='chessboard'>
        {board.map((row, r) =>
          row.map((piece, c) => {
            const isLight      = (r + c) % 2 === 0;
            const isSelected   = selected && selected[0] === r && selected[1] === c;
            const isHighlighted = highlights.some(([hr, hc]) => hr === r && hc === c);

            // Determine CSS class for square colouring
            let squareClass = 'chess-square ';
            if (isSelected)        squareClass += 'selected';
            else if (isHighlighted) squareClass += 'highlight';
            else                   squareClass += isLight ? 'light' : 'dark';

            return (
              <div
                key={`${r}-${c}`}
                className={squareClass}
                onClick={() => handleSquareClick(r, c)}
              >
                {/* Render piece symbol */}
                {piece && (
                  <span className={piece[0] === 'w' ? 'chess-piece-white' : 'chess-piece-black'}>
                    {PIECE_SYMBOLS[piece]}
                  </span>
                )}
                {/* Render a dot on empty highlighted squares */}
                {isHighlighted && !piece && <div className='move-dot' />}
              </div>
            );
          })
        )}
      </div>

      {/* Controls below the board */}
      <div className='board-controls'>
        <button className='btn-primary' onClick={handleRestart}>
          Restart
        </button>
        <span className='turn-indicator'>
          Turn: {turn === 'w' ? '⬜ White' : '⬛ Black'}
        </span>
      </div>

      <p className='chess-instructions'>
        Click a piece to see valid moves, then click a highlighted square to move.
      </p>
    </div>
  );
}

export default MiniChessGame;
