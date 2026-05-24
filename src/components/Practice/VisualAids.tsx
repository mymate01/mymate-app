'use client';

import React from 'react';
import { PracticeQuestion } from '../../types/practice';

interface VisualAidsProps {
  question: PracticeQuestion;
}

export default function VisualAids({ question }: VisualAidsProps) {
  const q = question;

  const itemEmojiMap: Record<string, string> = {
    chocolates: '🍫',
    balloons: '🎈',
    candies: '🍬',
    toys: '🧸',
    pencils: '✏️',
    books: '📚',
    stars: '⭐',
    stickers: '✨',
    apples: '🍎',
    oranges: '🍊'
  };

  if (q.subject === 'maths_wordproblems' && q.operandA !== undefined && q.operandB !== undefined) {
    const item = q.wordProblemItem || 'apples';
    const emoji = itemEmojiMap[item] || '🍎';
    const isAddition = q.operator === '+';
    const a = q.operandA;
    const b = q.operandB;
    const total = isAddition ? (a + b) : a;

    if (total <= 24) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', background: 'rgba(255, 255, 255, 0.6)', padding: '20px', borderRadius: '24px', border: '1px solid rgba(255, 126, 95, 0.2)', width: '100%', maxWidth: '300px' }}>
          <h4 style={{ color: '#2d3748', margin: 0, fontWeight: 800, fontSize: '1rem', textTransform: 'capitalize' }}>
            Visual Helper: {item} 📊
          </h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', width: '100%' }}>
            {/* Group A */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center', background: '#fff', padding: '10px', borderRadius: '12px', width: '100%', border: '1px solid rgba(0,0,0,0.05)' }}>
              {Array.from({ length: a }).map((_, i) => (
                <span key={`a-${i}`} style={{ fontSize: '1.8rem', animation: 'bounce 2s infinite', display: 'inline-block' }}>
                  {emoji}
                </span>
              ))}
              <div style={{ width: '100%', textAlign: 'center', fontSize: '0.8rem', fontWeight: 'bold', color: '#718096', marginTop: '4px' }}>
                Start: {a} {item}
              </div>
            </div>

            {/* Operator */}
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ff6b4a' }}>
              {isAddition ? '➕ (Add More)' : '➖ (Take Away)'}
            </div>

            {/* Group B */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center', background: isAddition ? '#fff' : 'rgba(239, 68, 68, 0.05)', padding: '10px', borderRadius: '12px', width: '100%', border: isAddition ? '1px solid rgba(0,0,0,0.05)' : '1px dashed #ef4444' }}>
              {Array.from({ length: b }).map((_, i) => (
                <span 
                  key={`b-${i}`} 
                  style={{ 
                    fontSize: '1.8rem', 
                    animation: 'bounce 2s infinite', 
                    display: 'inline-block',
                    opacity: isAddition ? 1 : 0.4,
                    textDecoration: isAddition ? 'none' : 'line-through'
                  }}
                >
                  {emoji}{!isAddition && '❌'}
                </span>
              ))}
              <div style={{ width: '100%', textAlign: 'center', fontSize: '0.8rem', fontWeight: 'bold', color: isAddition ? '#718096' : '#ef4444', marginTop: '4px' }}>
                {isAddition ? `Add: ${b} ${item}` : `Remove: ${b} ${item}`}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', background: 'rgba(255, 255, 255, 0.6)', padding: '20px', borderRadius: '24px', border: '1px solid rgba(255, 126, 95, 0.2)', width: '100%', maxWidth: '300px' }}>
          <h4 style={{ color: '#2d3748', margin: 0, fontWeight: 800, fontSize: '1rem', textTransform: 'capitalize' }}>
            Visual Helper: {item} 📊
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', width: '100%' }}>
            {/* Package A */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#fff', padding: '12px 16px', borderRadius: '16px', width: '100%', border: '1px solid rgba(0,0,0,0.05)' }}>
              <span style={{ fontSize: '2.5rem' }}>📦</span>
              <div style={{ textAlign: 'left' }}>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#718096', fontWeight: 'bold' }}>Group 1</p>
                <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#2d3748' }}>{a} {item}</p>
              </div>
            </div>

            {/* Operator */}
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ff6b4a' }}>
              {isAddition ? '➕' : '➖'}
            </div>

            {/* Package B */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#fff', padding: '12px 16px', borderRadius: '16px', width: '100%', border: '1px solid rgba(0,0,0,0.05)' }}>
               <span style={{ fontSize: '2.5rem' }}>{isAddition ? '📦' : '🗑️'}</span>
               <div style={{ textAlign: 'left' }}>
                 <p style={{ margin: 0, fontSize: '0.8rem', color: '#718096', fontWeight: 'bold' }}>
                   {isAddition ? 'Group 2' : 'To Remove'}
                 </p>
                 <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#2d3748' }}>{b} {item}</p>
               </div>
            </div>
          </div>
        </div>
      );
    }
  }

  // mr-1: Aarav has 3 red balloons and 4 blue balloons
  if (q.id === 'mr-1') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <h4 style={{ color: '#2d3748', margin: 0, fontWeight: 800, fontSize: '1rem' }}>Aarav's Balloons 🎈</h4>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {/* Red balloons */}
          {[1, 2, 3].map((n) => (
            <div 
              key={`red-${n}`} 
              style={{ 
                animation: `floatUp ${1.5 + n * 0.2}s ease-in-out infinite alternate`, 
                fontSize: '2.5rem',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2) rotate(10deg)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
            >
              🎈
            </div>
          ))}
          {/* Blue balloons */}
          {[1, 2, 3, 4].map((n) => (
            <div 
              key={`blue-${n}`} 
              style={{ 
                animation: `floatUp ${2.0 - n * 0.2}s ease-in-out infinite alternate`, 
                fontSize: '2.5rem',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                filter: 'hue-rotate(120deg)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2) rotate(-10deg)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
            >
              🎈
            </div>
          ))}
        </div>
        <p style={{ fontSize: '0.8rem', color: '#718096', margin: 0, fontStyle: 'italic' }}>
          Hint: Aarav gives 2 balloons to his sister!
        </p>
      </div>
    );
  }

  // mr-2: Complete the Pattern
  if (q.id === 'mr-2') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <h4 style={{ color: '#2d3748', margin: 0, fontWeight: 800, fontSize: '1rem' }}>Complete the Pattern 🍌</h4>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', background: 'white', padding: '12px 18px', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)' }}>
          <span style={{ fontSize: '2rem', animation: 'bounce 2s infinite 0.1s' }}>🍎</span>
          <span style={{ fontSize: '1rem', color: '#a0aec0' }}>→</span>
          <span style={{ fontSize: '2rem', animation: 'bounce 2s infinite 0.3s' }}>🍌</span>
          <span style={{ fontSize: '1rem', color: '#a0aec0' }}>→</span>
          <span style={{ fontSize: '2rem', animation: 'bounce 2s infinite 0.5s' }}>🍎</span>
          <span style={{ fontSize: '1rem', color: '#a0aec0' }}>→</span>
          <span style={{ fontSize: '2rem', animation: 'bounce 2s infinite 0.7s' }}>🍌</span>
          <span style={{ fontSize: '1rem', color: '#a0aec0' }}>→</span>
          <span style={{ fontSize: '2rem', animation: 'bounce 2s infinite 0.9s' }}>🍎</span>
          <span style={{ fontSize: '1rem', color: '#a0aec0' }}>→</span>
          <div style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed var(--color-coral)', borderRadius: '8px', fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--color-coral)' }}>?</div>
        </div>
      </div>
    );
  }

  // mr-3: Sita is taller than Amit
  if (q.id === 'mr-3') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', width: '100%' }}>
        <h4 style={{ color: '#2d3748', margin: 0, fontWeight: 800, fontSize: '1rem' }}>Who is the tallest? 📐</h4>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end', justifyContent: 'center', height: '110px', padding: '5px', width: '100%' }}>
          {/* Rohan */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
            <div style={{ height: '50px', width: '22px', background: 'var(--gradient-primary)', borderRadius: '6px 6px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '0.75rem', animation: 'floatUp 0.5s ease forwards' }}>60</div>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#718096' }}>Rohan</span>
          </div>
          {/* Amit */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
            <div style={{ height: '75px', width: '22px', background: 'var(--gradient-primary)', borderRadius: '6px 6px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '0.75rem', animation: 'floatUp 0.8s ease forwards' }}>90</div>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#718096' }}>Amit</span>
          </div>
          {/* Sita */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
            <div style={{ height: '100px', width: '22px', background: 'var(--gradient-primary)', borderRadius: '6px 6px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '0.75rem', animation: 'floatUp 1.1s ease forwards' }}>120</div>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2d3748' }}>Sita 👑</span>
          </div>
        </div>
      </div>
    );
  }

  // mr-4: Birds on a branch
  if (q.id === 'mr-4') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <h4 style={{ color: '#2d3748', margin: 0, fontWeight: 800, fontSize: '1rem' }}>Birds on a Branch 🌿</h4>
        <div style={{ position: 'relative', width: '180px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', bottom: '24px', width: '100%', height: '6px', background: '#8d6e63', borderRadius: '4px' }} />
          <div style={{ position: 'absolute', bottom: '30px', display: 'flex', gap: '6px', justifyContent: 'center', width: '100%' }}>
            <span style={{ fontSize: '1.5rem', animation: 'bounce 2s infinite' }}>🐦</span>
            <span style={{ fontSize: '1.5rem', animation: 'bounce 2s infinite 0.2s' }}>🐦</span>
            <span style={{ fontSize: '1.5rem', animation: 'bounce 2s infinite 0.4s' }}>🐦</span>
            <span style={{ fontSize: '1.5rem', animation: 'bounce 2s infinite 0.6s' }}>🐦</span>
            <span style={{ fontSize: '1.5rem', animation: 'floatUp 3s infinite', filter: 'opacity(0.6)' }}>🐦💨</span>
          </div>
        </div>
      </div>
    );
  }

  // mr-5: Number Range (5 < ? < 8)
  if (q.id === 'mr-5') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <h4 style={{ color: '#2d3748', margin: 0, fontWeight: 800, fontSize: '1rem' }}>Number Range 🔢</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '1rem', fontWeight: 800, background: 'white', padding: '12px 16px', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.05)' }}>
          <span style={{ color: '#a0aec0' }}>5</span>
          <span style={{ color: '#ff6b4a' }}>&lt;</span>
          <span style={{ background: 'var(--gradient-primary)', color: 'white', padding: '3px 10px', borderRadius: '6px', fontSize: '1.1rem', animation: 'pulse 1.5s infinite' }}>?</span>
          <span style={{ color: '#ff6b4a' }}>&lt;</span>
          <span style={{ color: '#a0aec0' }}>8</span>
        </div>
        <p style={{ fontSize: '0.8rem', color: '#718096', margin: 0 }}>Find the number between 5 and 8!</p>
      </div>
    );
  }

  // mr-6: Toy Box
  if (q.id === 'mr-6') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <h4 style={{ color: '#2d3748', margin: 0, fontWeight: 800, fontSize: '1rem' }}>The Toy Box 🧸</h4>
        <div style={{ width: '150px', height: '80px', background: '#ffe0b2', border: '2px solid #ffb74d', borderRadius: '12px', display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '8px', boxSizing: 'border-box', justifyContent: 'center', position: 'relative' }}>
          <span style={{ fontSize: '1.4rem', animation: 'bounce 2s infinite' }}>🧸</span>
          <span style={{ fontSize: '1.4rem', animation: 'bounce 2s infinite 0.3s' }}>🚗</span>
          <span style={{ fontSize: '1.4rem', animation: 'bounce 2s infinite 0.6s' }}>🎨</span>
          <div style={{ border: '2px dashed #ffb74d', borderRadius: '6px', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffb74d', fontSize: '1rem', fontWeight: 'bold' }}>?</div>
          <div style={{ border: '2px dashed #ffb74d', borderRadius: '6px', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffb74d', fontSize: '1rem', fontWeight: 'bold' }}>?</div>
        </div>
      </div>
    );
  }

  // mr-7: Yesterday is Sunday
  if (q.id === 'mr-7') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <h4 style={{ color: '#2d3748', margin: 0, fontWeight: 800, fontSize: '1rem' }}>Days of the Week 🗓️</h4>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{ background: '#fff5f5', border: '1.5px dashed #e53e3e', color: '#e53e3e', padding: '8px 12px', borderRadius: '10px', fontWeight: 800, fontSize: '0.85rem', animation: 'pulse 1.5s infinite' }}>
            Yesterday (?)
          </div>
          <span style={{ fontSize: '1.2rem', color: '#ff7e5f' }}>⬅️</span>
          <div style={{ background: 'var(--gradient-primary)', color: 'white', padding: '8px 12px', borderRadius: '10px', fontWeight: 800, fontSize: '0.85rem' }}>
            Sunday (Today)
          </div>
        </div>
      </div>
    );
  }

  // el-1: English logic Cat/Hat
  if (q.id === 'el-1') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <h4 style={{ color: '#2d3748', margin: 0, fontWeight: 800, fontSize: '1rem' }}>Find the Rhyme 🎩</h4>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <span style={{ fontSize: '3rem', animation: 'bounce 2s infinite' }}>🐱</span>
          <span style={{ fontSize: '1.5rem', color: '#ff7e5f' }}>➔</span>
          <span style={{ fontSize: '3rem', animation: 'bounce 2s infinite 0.5s' }}>🎩</span>
        </div>
        <p style={{ fontSize: '0.8rem', color: '#718096', margin: 0, fontStyle: 'italic' }}>
          C - AT  ➔  H - AT
        </p>
      </div>
    );
  }

  // el-2: Odd one out
  if (q.id === 'el-2') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <h4 style={{ color: '#2d3748', margin: 0, fontWeight: 800, fontSize: '1rem' }}>Odd One Out! 🍎</h4>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div style={{ background: 'white', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '10px', padding: '8px', fontSize: '1.8rem', animation: 'bounce 2s infinite 0.1s' }}>🐶</div>
          <div style={{ background: 'white', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '10px', padding: '8px', fontSize: '1.8rem', animation: 'bounce 2s infinite 0.3s' }}>🐱</div>
          <div style={{ background: 'white', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '10px', padding: '8px', fontSize: '1.8rem', animation: 'bounce 2s infinite 0.5s' }}>🦁</div>
          <div style={{ background: '#fff5f5', border: '1.5px dashed #ff6b6b', borderRadius: '10px', padding: '8px', fontSize: '1.8rem', animation: 'pulse 1.5s infinite' }}>🍎</div>
        </div>
      </div>
    );
  }

  // el-3: Sun Day
  if (q.id === 'el-3') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <h4 style={{ color: '#2d3748', margin: 0, fontWeight: 800, fontSize: '1rem' }}>Sun in the Sky ☀️</h4>
        <div style={{ fontSize: '3.5rem', animation: 'spin 20s linear infinite' }}>☀️</div>
      </div>
    );
  }

  // Default fallback placeholder card
  return (
    <div
      style={{
        background: 'rgba(255, 255, 255, 0.45)',
        backdropFilter: 'blur(8px)',
        padding: '20px',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.6)',
        textAlign: 'center',
        color: '#718096',
        maxWidth: '280px'
      }}
    >
      <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🌟</div>
      <h3 style={{ color: '#2d3748', fontWeight: 800, marginBottom: '6px', fontSize: '1rem' }}>Mental Reasoning</h3>
      <p style={{ fontSize: '0.8rem', lineHeight: 1.4, margin: 0 }}>
        Read the challenge on the left. Use your thinking brain to select the correct card!
      </p>
    </div>
  );
}
