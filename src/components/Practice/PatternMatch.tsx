'use client';

import React from 'react';
import { PracticeQuestion } from '../../types/practice';

interface PatternMatchProps {
  question: PracticeQuestion;
  onSelect: (questionId: string, optionIndex: string) => void;
  selectedAnswer?: string;
}

const pulseKeyframes = `
@keyframes patternPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
@keyframes patternFadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

export default function PatternMatch({ question, onSelect, selectedAnswer }: PatternMatchProps) {
  const sequence = question.patternSequence || [];
  const options = question.patternOptions || question.options || [];

  const getSelectedEmoji = React.useCallback(() => {
    if (selectedAnswer === undefined || selectedAnswer === null) return null;
    const idx = parseInt(selectedAnswer, 10);
    if (isNaN(idx) || idx < 0 || idx >= options.length) return null;
    return options[idx];
  }, [selectedAnswer, options]);

  const selectedEmoji = getSelectedEmoji();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '16px',
      fontFamily: "'Nunito', 'Segoe UI', sans-serif",
    }}>
      <style>{pulseKeyframes}</style>

      {/* Question Text */}
      <div style={{
        marginBottom: '20px',
        textAlign: 'center',
        padding: '10px 24px',
        background: 'linear-gradient(135deg, #fff8f5, #fff0eb)',
        borderRadius: '16px',
        border: '2px solid #ffe0d6',
        boxShadow: '0 2px 10px rgba(255,107,74,0.1)',
      }}>
        <span style={{ fontSize: '20px', marginRight: '8px' }}>🔍</span>
        <span style={{
          fontSize: '16px',
          fontWeight: 700,
          color: '#2d3748',
          lineHeight: 1.4,
        }}>
          {question.questionText || 'What comes next in the pattern?'}
        </span>
      </div>

      {/* Pattern Sequence Row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '28px',
        padding: '16px 20px',
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 3px 16px rgba(0,0,0,0.08)',
        border: '2px solid #f0e6e2',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
        {sequence.map((item, index) => {
          const isMissing = item === '?';

          return (
            <div
              key={index}
              style={{
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '16px',
                fontSize: isMissing ? '28px' : '30px',
                fontWeight: 700,
                background: isMissing
                  ? 'linear-gradient(135deg, #fff8f5, #fff0eb)'
                  : 'white',
                border: isMissing
                  ? '2.5px dashed #ff6b4a'
                  : '2px solid #e8e0dc',
                boxShadow: isMissing
                  ? '0 2px 12px rgba(255,107,74,0.15)'
                  : '0 2px 8px rgba(0,0,0,0.06)',
                animation: isMissing && !selectedEmoji
                  ? 'patternPulse 1.5s ease-in-out infinite'
                  : 'none',
                transition: 'all 300ms ease',
                position: 'relative' as const,
              }}
            >
              {isMissing ? (selectedEmoji || '❓') : item}
            </div>
          );
        })}
      </div>

      {/* Options Label */}
      <div style={{
        marginBottom: '12px',
        fontSize: '14px',
        fontWeight: 600,
        color: '#888',
        letterSpacing: '0.5px',
      }}>
        Pick the missing piece! 👇
      </div>

      {/* Option Cards */}
      <div style={{
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
        {options.map((option, index) => {
          const isSelected = selectedAnswer === String(index);
          const label = OPTION_LABELS[index] || String(index + 1);

          return (
            <button
              key={index}
              onClick={() => onSelect(question.id, String(index))}
              aria-label={`Option ${label}: ${option}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '78px',
                height: '90px',
                gap: '4px',
                padding: '8px',
                borderRadius: '16px',
                border: isSelected
                  ? '3px solid #ff6b4a'
                  : '2px solid #e0d8d4',
                background: isSelected
                  ? 'linear-gradient(135deg, #fff0eb, #ffe0d6)'
                  : 'white',
                cursor: 'pointer',
                boxShadow: isSelected
                  ? '0 4px 16px rgba(255,107,74,0.25)'
                  : '0 2px 8px rgba(0,0,0,0.06)',
                transition: 'all 200ms ease',
                outline: 'none',
                transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                animation: 'patternFadeIn 0.3s ease-out forwards',
                animationDelay: `${index * 0.08}s`,
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.06)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 14px rgba(0,0,0,0.12)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                }
              }}
            >
              {/* Emoji */}
              <span style={{ fontSize: '30px', lineHeight: 1 }}>
                {option}
              </span>
              {/* Label badge */}
              <span style={{
                fontSize: '12px',
                fontWeight: 800,
                color: isSelected ? '#ff6b4a' : '#aaa',
                background: isSelected ? '#fff' : '#f5f0ed',
                borderRadius: '8px',
                padding: '2px 10px',
                transition: 'all 200ms ease',
              }}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
