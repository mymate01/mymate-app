'use client';

import React from 'react';
import { PracticeQuestion } from '../../types/practice';

interface SlidingPuzzleProps {
  question: PracticeQuestion;
  onComplete: (questionId: string, solved: boolean) => void;
}

const TILE_COLORS = [
  '#FFB3BA', // pastel pink
  '#FFDFBA', // pastel peach
  '#FFFFBA', // pastel yellow
  '#BAFFC9', // pastel green
  '#BAE1FF', // pastel blue
  '#D4BAFF', // pastel purple
  '#FFB3E6', // pastel magenta
  '#B3FFF0', // pastel teal
  '#FFDAB3', // pastel orange
  '#C9BAFF', // pastel indigo
  '#FFE0B3', // pastel amber
  '#B3D4FF', // pastel sky
  '#E8BAFF', // pastel orchid
  '#B3FFD9', // pastel mint
  '#FFB3C9', // pastel rose
];

const confettiKeyframes = `
@keyframes slidePuzzleConfettiBurst {
  0% { transform: translateY(0) scale(1) rotate(0deg); opacity: 1; }
  50% { opacity: 1; }
  100% { transform: translateY(-120px) scale(0.3) rotate(360deg); opacity: 0; }
}
@keyframes slidePuzzleCelebrate {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.08); }
}
@keyframes slidePuzzleBounceIn {
  0% { transform: scale(0.3); opacity: 0; }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
}
`;

const CONFETTI_EMOJIS = ['🎉', '⭐', '🌟', '🎊', '✨', '🥳', '💫', '🎈'];

export default function SlidingPuzzle({ question, onComplete }: SlidingPuzzleProps) {
  const size = question.puzzleSize || 3;
  const cellSize = size === 3 ? 70 : 55;
  const gap = 6;

  const [tiles, setTiles] = React.useState<(string | null)[]>(
    () => question.puzzleTiles ? [...question.puzzleTiles] : []
  );
  const [moves, setMoves] = React.useState(0);
  const [solved, setSolved] = React.useState(false);
  const [lastMoved, setLastMoved] = React.useState<number | null>(null);

  const isSolved = React.useCallback((arr: (string | null)[]) => {
    const total = size * size;
    for (let i = 0; i < total - 1; i++) {
      if (arr[i] !== String(i + 1)) return false;
    }
    return arr[total - 1] === null;
  }, [size]);

  const getAdjacentIndices = React.useCallback((index: number) => {
    const row = Math.floor(index / size);
    const col = index % size;
    const adj: number[] = [];
    if (row > 0) adj.push((row - 1) * size + col);
    if (row < size - 1) adj.push((row + 1) * size + col);
    if (col > 0) adj.push(row * size + (col - 1));
    if (col < size - 1) adj.push(row * size + (col + 1));
    return adj;
  }, [size]);

  const handleTileClick = React.useCallback((clickedIndex: number) => {
    if (solved) return;
    if (tiles[clickedIndex] === null) return;

    const emptyIndex = tiles.indexOf(null);
    const adjacent = getAdjacentIndices(clickedIndex);

    if (!adjacent.includes(emptyIndex)) return;

    const newTiles = [...tiles];
    newTiles[emptyIndex] = newTiles[clickedIndex];
    newTiles[clickedIndex] = null;

    setTiles(newTiles);
    setMoves((m) => m + 1);
    setLastMoved(emptyIndex);

    if (isSolved(newTiles)) {
      setSolved(true);
      onComplete(question.id, true);
    }
  }, [tiles, solved, getAdjacentIndices, isSolved, onComplete, question.id]);

  const gridWidth = size * cellSize + (size - 1) * gap;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '16px',
      fontFamily: "'Nunito', 'Segoe UI', sans-serif",
    }}>
      <style>{confettiKeyframes}</style>

      {/* Move Counter */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '16px',
        background: '#fff8f5',
        padding: '8px 20px',
        borderRadius: '24px',
        boxShadow: '0 2px 8px rgba(255,107,74,0.12)',
        border: '2px solid #ffe0d6',
      }}>
        <span style={{ fontSize: '20px' }}>🧩</span>
        <span style={{
          fontSize: '16px',
          fontWeight: 700,
          color: '#2d3748',
        }}>
          Moves: {moves}
        </span>
      </div>

      {/* Puzzle Grid */}
      <div style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: `repeat(${size}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${size}, ${cellSize}px)`,
        gap: `${gap}px`,
        padding: '12px',
        background: 'linear-gradient(135deg, #fff8f5 0%, #ffe8e0 100%)',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(255,107,74,0.15)',
        border: '3px solid #ffcbb8',
      }}>
        {tiles.map((tile, index) => {
          const isEmpty = tile === null;
          const colorIndex = tile ? (parseInt(tile, 10) - 1) % TILE_COLORS.length : 0;
          const isLastMoved = lastMoved === index && tile !== null;

          return (
            <button
              key={index}
              onClick={() => handleTileClick(index)}
              disabled={isEmpty || solved}
              aria-label={isEmpty ? 'Empty slot' : `Tile ${tile}`}
              style={{
                width: `${cellSize}px`,
                height: `${cellSize}px`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: isEmpty
                  ? '2px dashed #ddd'
                  : '2px solid rgba(0,0,0,0.08)',
                borderRadius: '12px',
                background: isEmpty
                  ? 'transparent'
                  : `linear-gradient(145deg, ${TILE_COLORS[colorIndex]}, ${TILE_COLORS[(colorIndex + 3) % TILE_COLORS.length]}dd)`,
                cursor: isEmpty || solved ? 'default' : 'pointer',
                fontSize: size === 3 ? '24px' : '18px',
                fontWeight: 800,
                color: '#2d3748',
                boxShadow: isEmpty
                  ? 'none'
                  : '0 3px 8px rgba(0,0,0,0.12), inset 0 1px 2px rgba(255,255,255,0.6)',
                transition: 'transform 200ms ease, box-shadow 200ms ease',
                transform: isLastMoved ? 'scale(1.05)' : 'scale(1)',
                padding: 0,
                outline: 'none',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                if (!isEmpty && !solved) {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.06)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 5px 14px rgba(0,0,0,0.18), inset 0 1px 2px rgba(255,255,255,0.6)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isEmpty && !solved) {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 3px 8px rgba(0,0,0,0.12), inset 0 1px 2px rgba(255,255,255,0.6)';
                }
              }}
            >
              {!isEmpty && tile}
            </button>
          );
        })}
      </div>

      {/* Solved Celebration */}
      {solved && (
        <div style={{
          marginTop: '20px',
          textAlign: 'center',
          position: 'relative',
        }}>
          {/* Confetti Burst */}
          <div style={{
            position: 'absolute',
            top: '-30px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '200px',
            height: '120px',
            pointerEvents: 'none',
          }}>
            {CONFETTI_EMOJIS.map((emoji, i) => (
              <span
                key={i}
                style={{
                  position: 'absolute',
                  fontSize: '22px',
                  left: `${10 + (i * 25) % 180}px`,
                  top: '80px',
                  animation: `slidePuzzleConfettiBurst ${0.8 + i * 0.15}s ease-out ${i * 0.08}s forwards`,
                  opacity: 0,
                }}
              >
                {emoji}
              </span>
            ))}
          </div>

          <div style={{
            animation: 'slidePuzzleBounceIn 0.5s ease-out forwards',
            background: 'linear-gradient(135deg, #ff6b4a, #ff7e5f)',
            color: 'white',
            padding: '14px 32px',
            borderRadius: '20px',
            fontSize: '18px',
            fontWeight: 800,
            boxShadow: '0 4px 16px rgba(255,107,74,0.35)',
          }}>
            🎉 Awesome! Solved in {moves} moves! 🎉
          </div>
        </div>
      )}

      {/* Helper Text */}
      {!solved && (
        <p style={{
          marginTop: '14px',
          fontSize: '13px',
          color: '#888',
          textAlign: 'center',
        }}>
          Tap a tile next to the empty space to slide it! 🧩
        </p>
      )}
    </div>
  );
}
