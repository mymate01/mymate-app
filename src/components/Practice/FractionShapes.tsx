'use client';

import React, { useState, useEffect } from 'react';
import styles from './FractionShapes.module.css';

interface FractionShapesProps {
  value?: number;                   // Controlled shaded count
  onChange?: (count: number) => void; // Shaded count change callback
  shape?: 'circle' | 'square' | 'rectangle'; // Shape type
  totalSegments?: number;           // Total segments (default: 4)
  title?: string;                   // Custom instruction text
  readOnly?: boolean;               // Optional read-only view
}

export default function FractionShapes({
  value,
  onChange,
  shape = 'circle',
  totalSegments = 4,
  title = 'Click the segments to shade them!',
  readOnly = false
}: FractionShapesProps) {
  // We keep a set of shaded indices.
  const [localShaded, setLocalShaded] = useState<Set<number>>(new Set());

  // Simple sync if controlled
  // If controlled, we construct a Set with the first `value` elements to keep it consistent
  useEffect(() => {
    if (value !== undefined) {
      const newSet = new Set<number>();
      for (let i = 0; i < value; i++) {
        newSet.add(i);
      }
      setLocalShaded(newSet);
    }
  }, [value]);

  const activeShaded = value !== undefined 
    ? new Set(Array.from({ length: value }).map((_, i) => i))
    : localShaded;

  const toggleSegment = (index: number) => {
    if (readOnly) return;

    const newShaded = new Set(activeShaded);
    if (newShaded.has(index)) {
      newShaded.delete(index);
    } else {
      newShaded.add(index);
    }

    if (value === undefined) {
      setLocalShaded(newShaded);
    }

    if (onChange) {
      onChange(newShaded.size);
    }

    // Play a friendly soft high-pitched bubble pop sound!
    try {
      if (typeof window !== 'undefined' && (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        // Pop sound
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.04);
        
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.04);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      }
    } catch (e) {
      // AudioContext blocked
    }
  };

  const handleReset = () => {
    if (readOnly) return;
    
    if (value === undefined) {
      setLocalShaded(new Set());
    }
    
    if (onChange) {
      onChange(0);
    }
  };

  const shadedCount = activeShaded.size;

  // Render SVG based on selected shape
  const renderShapeSVG = () => {
    // Circle Pizza (4 equal slices)
    if (shape === 'circle') {
      const circleSlices = [
        // M Center L Start-Pos A Rad Rad 0 0 1 End-Pos Z
        'M 50 50 L 50 5 A 45 45 0 0 1 95 50 Z', // Slice 0: Top-Right
        'M 50 50 L 95 50 A 45 45 0 0 1 50 95 Z', // Slice 1: Bottom-Right
        'M 50 50 L 50 95 A 45 45 0 0 1 5 50 Z',  // Slice 2: Bottom-Left
        'M 50 50 L 5 50 A 45 45 0 0 1 50 5 Z'   // Slice 3: Top-Left
      ];

      return (
        <svg viewBox="0 0 100 100" className={styles.svgWrapper} aria-hidden="true">
          <defs>
            {/* Sunrise Peach/Coral Gradient */}
            <linearGradient id="sunriseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff7e5f" />
              <stop offset="100%" stopColor="#feb47b" />
            </linearGradient>
          </defs>
          <g>
            {circleSlices.map((pathStr, index) => {
              const isShaded = activeShaded.has(index);
              return (
                <path
                  key={index}
                  d={pathStr}
                  className={`${styles.interactivePath} ${
                    isShaded ? styles.shadedSegment : styles.unshadedSegment
                  } ${isShaded ? styles.shadedSegmentPattern : ''}`}
                  onClick={() => toggleSegment(index)}
                  tabIndex={readOnly ? -1 : 0}
                  role="button"
                  aria-label={`Circle segment ${index + 1} of 4. ${
                    isShaded ? 'Shaded' : 'Unshaded'
                  }`}
                />
              );
            })}
          </g>
        </svg>
      );
    }

    // Square Grid (4 quadrants)
    if (shape === 'square') {
      const squareQuadrants = [
        { x: 2, y: 2, w: 41, h: 41 }, // Quadrant 0: Top-Left
        { x: 47, y: 2, w: 41, h: 41 }, // Quadrant 1: Top-Right
        { x: 2, y: 47, w: 41, h: 41 }, // Quadrant 2: Bottom-Left
        { x: 47, y: 47, w: 41, h: 41 } // Quadrant 3: Bottom-Right
      ];

      return (
        <svg viewBox="0 0 90 90" className={styles.svgWrapper} aria-hidden="true">
          <defs>
            <linearGradient id="sunriseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff7e5f" />
              <stop offset="100%" stopColor="#feb47b" />
            </linearGradient>
          </defs>
          <g>
            {squareQuadrants.map((rect, index) => {
              const isShaded = activeShaded.has(index);
              return (
                <rect
                  key={index}
                  x={rect.x}
                  y={rect.y}
                  width={rect.w}
                  height={rect.h}
                  rx="6"
                  className={`${styles.interactivePath} ${styles.squarePath} ${
                    isShaded ? styles.shadedSegment : styles.unshadedSegment
                  } ${isShaded ? styles.shadedSegmentPattern : ''}`}
                  onClick={() => toggleSegment(index)}
                  tabIndex={readOnly ? -1 : 0}
                  role="button"
                  aria-label={`Square segment ${index + 1} of 4. ${
                    isShaded ? 'Shaded' : 'Unshaded'
                  }`}
                />
              );
            })}
          </g>
        </svg>
      );
    }

    // Rectangle columns (4 vertical bars)
    if (shape === 'rectangle') {
      const rectBars = [
        { x: 2, y: 2, w: 26, h: 56 },
        { x: 31, y: 2, w: 26, h: 56 },
        { x: 60, y: 2, w: 26, h: 56 },
        { x: 89, y: 2, w: 26, h: 56 }
      ];

      return (
        <svg viewBox="0 0 117 60" className={styles.svgWrapper} aria-hidden="true">
          <defs>
            <linearGradient id="sunriseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff7e5f" />
              <stop offset="100%" stopColor="#feb47b" />
            </linearGradient>
          </defs>
          <g>
            {rectBars.map((rect, index) => {
              const isShaded = activeShaded.has(index);
              return (
                <rect
                  key={index}
                  x={rect.x}
                  y={rect.y}
                  width={rect.w}
                  height={rect.h}
                  rx="6"
                  className={`${styles.interactivePath} ${styles.rectPath} ${
                    isShaded ? styles.shadedSegment : styles.unshadedSegment
                  } ${isShaded ? styles.shadedSegmentPattern : ''}`}
                  onClick={() => toggleSegment(index)}
                  tabIndex={readOnly ? -1 : 0}
                  role="button"
                  aria-label={`Rectangle segment ${index + 1} of 4. ${
                    isShaded ? 'Shaded' : 'Unshaded'
                  }`}
                />
              );
            })}
          </g>
        </svg>
      );
    }

    return null;
  };

  // Simplifies mathematical display
  const getSimplifiedText = () => {
    if (shadedCount === 0) return '0 / 4';
    if (shadedCount === 1) return '1 / 4';
    if (shadedCount === 2) return '2 / 4 = 1 / 2';
    if (shadedCount === 3) return '3 / 4';
    if (shadedCount === 4) return '4 / 4 = 1 Whole';
    return '';
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>

      <div className={styles.mathInfo}>
        <span>Fraction:</span>
        <div className={styles.mathFraction}>
          <span className={styles.fractionTop}>{shadedCount}</span>
          <span className={styles.fractionBottom}>{totalSegments}</span>
        </div>
        {shadedCount > 0 && (
          <span style={{ fontSize: '0.95rem', opacity: 0.85, fontWeight: 500 }}>
            ({getSimplifiedText()})
          </span>
        )}
      </div>

      {renderShapeSVG()}

      {!readOnly && shadedCount > 0 && (
        <button
          type="button"
          className={styles.resetButton}
          onClick={handleReset}
        >
          Clear shading 🧹
        </button>
      )}
    </div>
  );
}
