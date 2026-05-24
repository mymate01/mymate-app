'use client';

import React from 'react';
import { PracticeQuestion } from '../../types/practice';

interface DetectiveGameProps {
  question: PracticeQuestion;
  onSelect: (questionId: string, optionIndex: string) => void;
  selectedAnswer?: string;
}

const DetectiveGame: React.FC<DetectiveGameProps> = ({ question, onSelect, selectedAnswer }) => {
  const [revealedClues, setRevealedClues] = React.useState<number>(0);
  const [mounted, setMounted] = React.useState(false);

  const emojis = question.sceneEmojis ?? [];
  const story = question.sceneStory ?? '';
  const clues = question.sceneClues ?? [];
  const options = question.options ?? [];

  // Staggered clue reveal
  React.useEffect(() => {
    setMounted(true);
    if (clues.length === 0) return;

    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setRevealedClues(current);
      if (current >= clues.length) clearInterval(interval);
    }, 200);

    return () => clearInterval(interval);
  }, [clues.length]);

  // Generate character labels like "Person A", "Person B" etc.
  const characterLabels = React.useMemo(() => {
    return emojis.map((_, i) => {
      if (options[i]) return options[i];
      return `Person ${String.fromCharCode(65 + i)}`;
    });
  }, [emojis, options]);

  const handleSelect = React.useCallback(
    (index: number) => {
      onSelect(question.id, index.toString());
    },
    [onSelect, question.id]
  );

  /* ─── styles ─── */

  const containerStyle: React.CSSProperties = {
    maxWidth: 560,
    margin: '0 auto',
    padding: '20px 16px 32px',
    fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
    color: '#2d3748',
    position: 'relative',
    overflow: 'hidden',
  };

  const decorativeMagnifier: React.CSSProperties = {
    position: 'absolute',
    top: 8,
    right: 8,
    fontSize: '2.4rem',
    opacity: 0.15,
    pointerEvents: 'none',
    transform: 'rotate(-18deg)',
    userSelect: 'none',
  };

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: 18,
    fontSize: '1.35rem',
    fontWeight: 700,
    letterSpacing: '-0.01em',
    color: '#2d3748',
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(-10px)',
    transition: 'opacity 0.4s ease, transform 0.4s ease',
  };

  /* ── Scene card ── */

  const sceneCardStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 18,
    background: 'linear-gradient(135deg, #fff8f5 0%, #fff1eb 100%)',
    borderRadius: 18,
    padding: '24px 16px 18px',
    marginBottom: 16,
    boxShadow: '0 2px 12px rgba(255,107,74,0.10)',
    flexWrap: 'wrap',
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(12px)',
    transition: 'opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s',
  };

  const avatarWrapStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
  };

  const avatarCircleStyle: React.CSSProperties = {
    width: 80,
    height: 80,
    borderRadius: '50%',
    background: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '3rem',
    boxShadow: '0 2px 8px rgba(255,107,74,0.13)',
    border: '2.5px solid #ffe0d6',
    transition: 'transform 0.25s ease',
    cursor: 'default',
  };

  const avatarLabelStyle: React.CSSProperties = {
    fontSize: '0.72rem',
    fontWeight: 600,
    color: '#ff6b4a',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    maxWidth: 80,
    textAlign: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };

  /* ── Case File card ── */

  const caseFileStyle: React.CSSProperties = {
    background: '#fff8f0',
    borderRadius: 14,
    borderLeft: '4.5px solid #ff6b4a',
    padding: '16px 18px',
    marginBottom: 16,
    boxShadow: '0 1px 6px rgba(45,55,72,0.06)',
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(12px)',
    transition: 'opacity 0.5s ease 0.25s, transform 0.5s ease 0.25s',
  };

  const caseFileHeaderStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: '1rem',
    fontWeight: 700,
    marginBottom: 10,
    color: '#2d3748',
    letterSpacing: '-0.01em',
  };

  const caseFileBodyStyle: React.CSSProperties = {
    fontSize: '0.95rem',
    lineHeight: 1.65,
    color: '#4a5568',
    fontStyle: 'italic',
  };

  /* ── Clue badges ── */

  const cluesContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    marginBottom: 20,
  };

  const clueBadgeStyle = (visible: boolean): React.CSSProperties => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    background: 'linear-gradient(90deg, #fff1eb, #ffe8de)',
    borderRadius: 50,
    padding: '8px 16px',
    fontSize: '0.88rem',
    fontWeight: 500,
    color: '#2d3748',
    boxShadow: '0 1px 4px rgba(255,107,74,0.08)',
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateX(0)' : 'translateX(-16px)',
    transition: 'opacity 0.35s ease, transform 0.35s ease',
  });

  const clueIconStyle: React.CSSProperties = {
    fontSize: '1.05rem',
    flexShrink: 0,
  };

  /* ── Question & options ── */

  const questionPromptStyle: React.CSSProperties = {
    fontSize: '1.1rem',
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: 14,
    color: '#2d3748',
    lineHeight: 1.45,
    opacity: mounted ? 1 : 0,
    transition: 'opacity 0.5s ease 0.5s',
  };

  const optionsGridStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  };

  const optionButtonStyle = (index: number): React.CSSProperties => {
    const isSelected = selectedAnswer === index.toString();
    return {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      width: '100%',
      minHeight: 52,
      padding: '12px 16px',
      border: isSelected ? '2.5px solid #ff6b4a' : '2px solid #ffe0d6',
      borderRadius: 14,
      background: isSelected ? '#fff1eb' : '#fff',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: 600,
      color: '#2d3748',
      textAlign: 'left' as const,
      boxShadow: isSelected
        ? '0 2px 10px rgba(255,107,74,0.18)'
        : '0 1px 4px rgba(45,55,72,0.06)',
      transition: 'all 0.2s ease',
      outline: 'none',
      transform: isSelected ? 'scale(1.015)' : 'scale(1)',
      opacity: mounted ? 1 : 0,
    };
  };

  const optionEmojiStyle: React.CSSProperties = {
    fontSize: '1.6rem',
    lineHeight: 1,
    flexShrink: 0,
  };

  const optionLabelBadge: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 26,
    height: 26,
    borderRadius: '50%',
    background: '#ff6b4a',
    color: '#fff',
    fontSize: '0.72rem',
    fontWeight: 700,
    flexShrink: 0,
  };

  /* ─── render ─── */

  return (
    <div style={containerStyle}>
      {/* Decorative magnifying glass */}
      <span style={decorativeMagnifier} aria-hidden="true">🔍</span>

      {/* Title */}
      <div style={headerStyle}>🕵️ Mystery Time!</div>

      {/* Scene Area */}
      {emojis.length > 0 && (
        <div style={sceneCardStyle}>
          {emojis.map((emoji, i) => (
            <div key={i} style={avatarWrapStyle}>
              <div
                style={avatarCircleStyle}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.08)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
                }}
              >
                {emoji}
              </div>
              <span style={avatarLabelStyle}>{characterLabels[i]}</span>
            </div>
          ))}
        </div>
      )}

      {/* Case File / Story */}
      {story && (
        <div style={caseFileStyle}>
          <div style={caseFileHeaderStyle}>
            <span>📋</span>
            <span>Case File</span>
          </div>
          <div style={caseFileBodyStyle}>{story}</div>
        </div>
      )}

      {/* Clues */}
      {clues.length > 0 && (
        <div style={cluesContainerStyle}>
          {clues.map((clue, i) => (
            <div key={i} style={clueBadgeStyle(i < revealedClues)}>
              <span style={clueIconStyle}>🔎</span>
              <span>{clue}</span>
            </div>
          ))}
        </div>
      )}

      {/* Question prompt */}
      <div style={questionPromptStyle}>{question.questionText}</div>

      {/* Options */}
      <div style={optionsGridStyle}>
        {options.map((option, i) => (
          <button
            key={i}
            type="button"
            style={optionButtonStyle(i)}
            onClick={() => handleSelect(i)}
            onMouseEnter={(e) => {
              if (selectedAnswer !== i.toString()) {
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#ff7e5f';
                (e.currentTarget as HTMLButtonElement).style.background = '#fff8f5';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedAnswer !== i.toString()) {
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#ffe0d6';
                (e.currentTarget as HTMLButtonElement).style.background = '#fff';
              }
            }}
          >
            <span style={optionLabelBadge}>{String.fromCharCode(65 + i)}</span>
            {emojis[i] && <span style={optionEmojiStyle}>{emojis[i]}</span>}
            <span>{option}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DetectiveGame;
