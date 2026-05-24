'use client';
import React, { useState } from 'react';

interface GameCategoryPickerProps {
  onSelectGame: (gameSubject: string) => void;
  onBack: () => void;
}

export default function GameCategoryPicker({ onSelectGame, onBack }: GameCategoryPickerProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const games = [
    {
      id: 'games_maze',
      title: 'Maze Runner',
      description: 'Find the path through the maze!',
      icon: '🛤️',
      color: '#ff6b4a'
    },
    {
      id: 'games_puzzle',
      title: 'Sliding Puzzle',
      description: 'Slide tiles to solve the picture!',
      icon: '🧩',
      color: '#4299e1'
    },
    {
      id: 'games_pattern',
      title: 'Pattern Match',
      description: 'Complete the missing pattern!',
      icon: '🔷',
      color: '#ed8936'
    },
    {
      id: 'games_detective',
      title: 'Detective Club',
      description: 'Solve mysteries with clues!',
      icon: '🔍',
      color: '#805ad5'
    }
  ];

  return (
    <div style={{ padding: '1rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <button 
        onClick={onBack}
        style={{
          background: 'none',
          border: 'none',
          color: '#2d3748',
          fontSize: '1.2rem',
          cursor: 'pointer',
          padding: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1rem',
          fontWeight: 'bold'
        }}
      >
        ⬅️ Back
      </button>

      <h2 style={{ textAlign: 'center', color: '#2d3748', fontSize: '2rem', marginBottom: '2rem' }}>
        🎮 Choose Your Game!
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        padding: '1rem'
      }}>
        {games.map(game => (
          <div 
            key={game.id}
            onClick={() => onSelectGame(game.id)}
            onMouseEnter={() => setHoveredCard(game.id)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              background: `linear-gradient(135deg, #fff8f5 0%, #ffffff 100%)`,
              border: `2px solid ${hoveredCard === game.id ? game.color : '#fbd38d'}`,
              borderRadius: '24px',
              padding: '2rem 1.5rem',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              boxShadow: hoveredCard === game.id 
                ? `0 10px 25px -5px ${game.color}40` 
                : '0 4px 6px -1px rgba(0,0,0,0.05)',
              transform: hoveredCard === game.id ? 'translateY(-4px)' : 'translateY(0)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <div style={{
              fontSize: '4rem',
              marginBottom: '1rem',
              transform: hoveredCard === game.id ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.3s ease'
            }}>
              {game.icon}
            </div>
            <h3 style={{
              fontSize: '1.5rem',
              color: '#2d3748',
              margin: '0 0 0.5rem 0'
            }}>
              {game.title}
            </h3>
            <p style={{
              color: '#4a5568',
              fontSize: '1rem',
              margin: 0,
              lineHeight: '1.5'
            }}>
              {game.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
