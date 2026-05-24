'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { PracticeQuestion } from '../../types/practice';

interface MazeGameProps {
  question: PracticeQuestion;
  onComplete: (questionId: string, solved: boolean) => void;
}

export default function MazeGame({ question, onComplete }: MazeGameProps) {
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
  const [showError, setShowError] = useState(false);
  const [moves, setMoves] = useState(0);

  const grid = question.mazeGrid;
  if (!grid) return <div>Invalid maze data</div>;

  const rows = grid.length;
  const cols = grid[0].length;

  // Initialize start and end cells in the set
  useEffect(() => {
    const initialSet = new Set<string>();
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (grid[r][c] === 2 || grid[r][c] === 3) {
          initialSet.add(`${r},${c}`);
        }
      }
    }
    setSelectedCells(initialSet);
    setMoves(0);
    setShowError(false);
  }, [question.id, grid, rows, cols]);

  const toggleCell = (r: number, c: number) => {
    // Only paths can be toggled
    if (grid[r][c] === 1 || grid[r][c] === 2 || grid[r][c] === 3) return;

    setShowError(false);
    setSelectedCells(prev => {
      const next = new Set(prev);
      const key = `${r},${c}`;
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
    setMoves(m => m + 1);
  };

  const checkRoute = useCallback(() => {
    // Find start cell
    let startCell = '';
    let endCell = '';
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (grid[r][c] === 2) startCell = `${r},${c}`;
        if (grid[r][c] === 3) endCell = `${r},${c}`;
      }
    }

    if (!startCell || !endCell) return;

    // Check if there is a connected path from start to end using ONLY selectedCells
    const visited = new Set<string>();
    const queue = [startCell];
    visited.add(startCell);

    let foundEnd = false;

    while (queue.length > 0) {
      const curr = queue.shift()!;
      if (curr === endCell) {
        foundEnd = true;
        break;
      }

      const [r, c] = curr.split(',').map(Number);
      const neighbors = [
        [r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]
      ];

      for (const [nr, nc] of neighbors) {
        const key = `${nr},${nc}`;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
          if (selectedCells.has(key) && !visited.has(key)) {
            visited.add(key);
            queue.push(key);
          }
        }
      }
    }

    if (foundEnd) {
      onComplete(question.id, true);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    }
  }, [rows, cols, grid, selectedCells, question.id, onComplete]);

  const resetPath = () => {
    const initialSet = new Set<string>();
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (grid[r][c] === 2 || grid[r][c] === 3) {
          initialSet.add(`${r},${c}`);
        }
      }
    }
    setSelectedCells(initialSet);
    setShowError(false);
    setMoves(0);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1.5rem',
      padding: '1rem',
      fontFamily: 'sans-serif'
    }}>
      <div style={{
        background: '#fff8f5',
        padding: '1rem 2rem',
        borderRadius: '16px',
        color: '#2d3748',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        border: '2px solid #ffeedd'
      }}>
        Moves: {moves}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: '4px',
        background: '#e2e8f0',
        padding: '8px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
        animation: showError ? 'shake 0.5s ease' : 'none'
      }}>
        {grid.map((row, r) => (
          row.map((cell, c) => {
            const isSelected = selectedCells.has(`${r},${c}`);
            let bgColor = cell === 1 ? '#2d3748' : '#f7fafc'; // wall vs path
            if (isSelected && cell === 0) bgColor = '#ffbb99'; // selected path
            if (cell === 2 || cell === 3) bgColor = '#ffeedd'; // start/end

            let content = '';
            if (cell === 2) content = '🐱';
            if (cell === 3) content = '🏠';
            if (isSelected && cell === 0) content = '👣';

            return (
              <div
                key={`${r},${c}`}
                onClick={() => toggleCell(r, c)}
                style={{
                  width: 'clamp(30px, 8vw, 44px)',
                  height: 'clamp(30px, 8vw, 44px)',
                  background: bgColor,
                  borderRadius: cell === 1 ? '6px' : '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'clamp(14px, 4vw, 24px)',
                  cursor: cell === 1 ? 'default' : 'pointer',
                  transition: 'background-color 0.2s ease, transform 0.1s ease',
                  transform: isSelected && cell === 0 ? 'scale(0.95)' : 'scale(1)',
                  boxShadow: cell === 1 ? 'none' : 'inset 0 0 0 1px rgba(0,0,0,0.05)'
                }}
              >
                {content}
              </div>
            );
          })
        ))}
      </div>

      {showError && (
        <div style={{
          color: '#e53e3e',
          fontWeight: 'bold',
          fontSize: '1.2rem',
          animation: 'fadeIn 0.3s ease'
        }}>
          Not quite connected yet. Keep trying!
        </div>
      )}

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button
          onClick={resetPath}
          style={{
            padding: '12px 24px',
            fontSize: '1.2rem',
            borderRadius: '12px',
            border: '2px solid #e2e8f0',
            background: 'white',
            color: '#4a5568',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'all 0.2s ease'
          }}
        >
          🔄 Clear Path
        </button>
        <button
          onClick={checkRoute}
          style={{
            padding: '12px 32px',
            fontSize: '1.2rem',
            borderRadius: '12px',
            border: 'none',
            background: 'linear-gradient(135deg, #ff6b4a 0%, #ff7e5f 100%)',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 4px 6px -1px rgba(255, 107, 74, 0.4)',
            transition: 'all 0.2s ease'
          }}
        >
          Check Route ✅
        </button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}
