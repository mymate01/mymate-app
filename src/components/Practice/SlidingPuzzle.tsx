'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { PracticeQuestion } from '../../types/practice';

interface SlidingPuzzleProps {
  question: PracticeQuestion;
  onComplete: (questionId: string, solved: boolean) => void;
}

const TILE_COLORS = [
  '#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF',
  '#D4BAFF', '#FFB3E6', '#B3FFF0', '#FFDAB3', '#C9BAFF',
  '#FFE0B3', '#B3D4FF', '#E8BAFF', '#B3FFD9', '#FFB3C9',
];

const CONFETTI_EMOJIS = ['🎉', '⭐', '🌟', '🎊', '✨', '🥳', '💫', '🎈'];

export default function SlidingPuzzle({ question, onComplete }: SlidingPuzzleProps) {
  const size = question.puzzleSize || 3;
  const cellSize = size === 3 ? 75 : 60;
  const gap = 8;

  const [tiles, setTiles] = useState<(string | null)[]>(
    () => question.puzzleTiles ? [...question.puzzleTiles] : []
  );
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [moves, setMoves] = useState(0);
  const [solved, setSolved] = useState(false);
  const [tilt, setTilt] = useState({ beta: 0, gamma: 0 });

  // Cooldown flags to prevent infinite sliding
  const tiltLock = useRef({ h: false, v: false });

  const isSolved = useCallback((arr: (string | null)[]) => {
    const total = size * size;
    for (let i = 0; i < total - 1; i++) {
      if (arr[i] !== String(i + 1)) return false;
    }
    return arr[total - 1] === null;
  }, [size]);

  const requestPermission = async () => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const permissionState = await (DeviceOrientationEvent as any).requestPermission();
        if (permissionState === 'granted') {
          setIsPlaying(true);
        } else {
          alert('Tilt permission denied! You can still tap to slide.');
          setIsPlaying(true);
        }
      } catch (e) {
        setIsPlaying(true);
      }
    } else {
      setIsPlaying(true);
    }
  };

  // The core slide logic (can be triggered by tap OR tilt)
  const slideTileToEmpty = useCallback((fromIndex: number) => {
    setTiles(prev => {
      const emptyIndex = prev.indexOf(null);
      const newTiles = [...prev];
      newTiles[emptyIndex] = newTiles[fromIndex];
      newTiles[fromIndex] = null;
      
      setMoves(m => m + 1);

      if (isSolved(newTiles)) {
        setSolved(true);
        setTimeout(() => onComplete(question.id, true), 2000);
      }
      return newTiles;
    });
  }, [isSolved, onComplete, question.id]);

  // Tilt handling logic
  useEffect(() => {
    if (!isPlaying || solved) return;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      let b = e.beta || 0; // -180 to 180 (front/back)
      let g = e.gamma || 0; // -90 to 90 (left/right)

      setTilt({ beta: b, gamma: g });

      setTiles(currentTiles => {
        const emptyIndex = currentTiles.indexOf(null);
        if (emptyIndex === -1) return currentTiles;

        const emptyRow = Math.floor(emptyIndex / size);
        const emptyCol = emptyIndex % size;

        let moved = false;
        let newFromIndex = -1;

        const tiltThreshold = 25;
        const resetThreshold = 10;

        // HORIZONTAL TILT LOGIC
        if (g < -tiltThreshold && !tiltLock.current.h) {
          // Tilted Left -> Tile on the RIGHT slides LEFT into empty
          if (emptyCol < size - 1) {
            newFromIndex = emptyIndex + 1;
            moved = true;
          }
          tiltLock.current.h = true;
        } else if (g > tiltThreshold && !tiltLock.current.h) {
          // Tilted Right -> Tile on the LEFT slides RIGHT into empty
          if (emptyCol > 0) {
            newFromIndex = emptyIndex - 1;
            moved = true;
          }
          tiltLock.current.h = true;
        } else if (Math.abs(g) < resetThreshold) {
          tiltLock.current.h = false;
        }

        // VERTICAL TILT LOGIC
        if (b < -tiltThreshold && !tiltLock.current.v) {
          // Tilted UP (forward) -> Tile BELOW slides UP into empty
          if (emptyRow < size - 1) {
            newFromIndex = emptyIndex + size;
            moved = true;
          }
          tiltLock.current.v = true;
        } else if (b > tiltThreshold && !tiltLock.current.v) {
          // Tilted DOWN (backward) -> Tile ABOVE slides DOWN into empty
          if (emptyRow > 0) {
            newFromIndex = emptyIndex - size;
            moved = true;
          }
          tiltLock.current.v = true;
        } else if (Math.abs(b) < resetThreshold) {
          tiltLock.current.v = false;
        }

        if (moved && newFromIndex !== -1) {
          const newTiles = [...currentTiles];
          newTiles[emptyIndex] = newTiles[newFromIndex];
          newTiles[newFromIndex] = null;
          
          setMoves(m => m + 1);
          if (isSolved(newTiles)) {
            setSolved(true);
            setTimeout(() => onComplete(question.id, true), 2000);
          }
          return newTiles;
        }

        return currentTiles;
      });
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [isPlaying, solved, size, isSolved, onComplete, question.id]);

  const handleTileClick = (clickedIndex: number) => {
    if (solved || !isPlaying) return;
    if (tiles[clickedIndex] === null) return;

    const emptyIndex = tiles.indexOf(null);
    const row = Math.floor(clickedIndex / size);
    const col = clickedIndex % size;
    const eRow = Math.floor(emptyIndex / size);
    const eCol = emptyIndex % size;

    // Check adjacency
    const isAdjacent = (Math.abs(row - eRow) === 1 && col === eCol) || 
                       (Math.abs(col - eCol) === 1 && row === eRow);
    
    if (isAdjacent) {
      slideTileToEmpty(clickedIndex);
    }
  };

  const gridWidth = size * cellSize + (size - 1) * gap;

  // Calculate dynamic shadows based on tilt
  const shadowX = Math.max(-10, Math.min(10, tilt.gamma / 3));
  const shadowY = Math.max(-10, Math.min(10, tilt.beta / 3));

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      fontFamily: "'Nunito', sans-serif",
    }}>
      {!isPlaying ? (
        <div style={{
          textAlign: 'center',
          background: 'linear-gradient(135deg, #fff8f5 0%, #ffe8e0 100%)',
          padding: '30px',
          borderRadius: '24px',
          boxShadow: '0 10px 25px rgba(255,107,74,0.15)',
          maxWidth: '400px'
        }}>
          <h2 style={{ color: '#2d3748', margin: '0 0 16px 0', fontSize: '1.5rem' }}>Motion Puzzle 🧩</h2>
          <p style={{ color: '#4a5568', marginBottom: '24px', fontSize: '1.1rem' }}>
            Tilt your phone to slide the blocks! Get them in numerical order from 1 to {size*size-1}!
          </p>
          <button
            onClick={requestPermission}
            style={{
              padding: '14px 32px',
              fontSize: '1.2rem',
              borderRadius: '16px',
              border: 'none',
              background: 'linear-gradient(135deg, #ff6b4a 0%, #ff7e5f 100%)',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 800,
              boxShadow: '0 4px 12px rgba(255,107,74,0.3)',
              transition: 'transform 0.2s ease'
            }}
          >
            Enable Motion Controls 📱
          </button>
        </div>
      ) : (
        <>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '24px',
            background: 'white',
            padding: '8px 24px',
            borderRadius: '30px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            border: '2px solid #edf2f7',
          }}>
            <span style={{ fontSize: '18px', fontWeight: 800, color: '#4a5568' }}>Moves:</span>
            <span style={{ fontSize: '22px', fontWeight: 900, color: '#ff6b4a' }}>{moves}</span>
          </div>

          <div style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: `repeat(${size}, ${cellSize}px)`,
            gridTemplateRows: `repeat(${size}, ${cellSize}px)`,
            gap: `${gap}px`,
            padding: '16px',
            background: '#e2e8f0', // Backboard color
            borderRadius: '20px',
            boxShadow: `inset ${shadowX}px ${shadowY}px 20px rgba(0,0,0,0.1), 0 20px 40px rgba(0,0,0,0.15)`,
            border: '4px solid #cbd5e0',
            perspective: '1000px', // For 3D effect
            transformStyle: 'preserve-3d',
            transform: `rotateX(${-tilt.beta/4}deg) rotateY(${tilt.gamma/4}deg)`,
            transition: 'transform 0.1s ease-out'
          }}>
            {tiles.map((tile, index) => {
              const isEmpty = tile === null;
              const colorIndex = tile ? (parseInt(tile, 10) - 1) % TILE_COLORS.length : 0;
              const baseColor = TILE_COLORS[colorIndex];

              return (
                <button
                  key={index}
                  onClick={() => handleTileClick(index)}
                  disabled={isEmpty || solved}
                  style={{
                    width: `${cellSize}px`,
                    height: `${cellSize}px`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    borderRadius: '16px',
                    background: isEmpty ? 'transparent' : `linear-gradient(135deg, ${baseColor}, ${baseColor}dd)`,
                    cursor: isEmpty || solved ? 'default' : 'pointer',
                    fontSize: size === 3 ? '32px' : '24px',
                    fontWeight: 900,
                    color: 'rgba(0,0,0,0.6)',
                    // dynamic shadow reacting to phone tilt!
                    boxShadow: isEmpty ? 'none' : `
                      inset 2px 2px 4px rgba(255,255,255,0.7), 
                      inset -2px -2px 4px rgba(0,0,0,0.1),
                      ${shadowX}px ${shadowY}px 8px rgba(0,0,0,0.2)
                    `,
                    padding: 0,
                    outline: 'none',
                    transform: isEmpty ? 'none' : `translateZ(${solved ? 0 : 15}px)`,
                    transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                  }}
                >
                  {!isEmpty && tile}
                </button>
              );
            })}
          </div>

          <div style={{ marginTop: '24px', color: '#a0aec0', fontSize: '0.9rem', fontWeight: 600 }}>
            Tilt phone to slide blocks!
          </div>

          {solved && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'rgba(255,255,255,0.95)',
              padding: '30px 40px',
              borderRadius: '24px',
              textAlign: 'center',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              animation: 'slidePuzzleBounceIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '10px' }}>🏆</div>
              <h2 style={{ color: '#ff6b4a', margin: 0, fontSize: '2rem' }}>Solved!</h2>
              <p style={{ color: '#4a5568', fontWeight: 700, margin: '10px 0 0 0' }}>{moves} moves</p>
            </div>
          )}
        </>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slidePuzzleBounceIn {
          0% { transform: translate(-50%, -50%) scale(0.3); opacity: 0; }
          50% { transform: translate(-50%, -50%) scale(1.1); }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
      `}} />
    </div>
  );
}
