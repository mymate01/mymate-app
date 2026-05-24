'use client';

import React, { useState, useEffect } from 'react';
import styles from './Abacus.module.css';

interface AbacusProps {
  value?: number;              // Controlled active abacus value (0 - 999)
  onChange?: (val: number) => void; // Value change callback
  totalBeads?: number;         // Kept for backward compatibility interface
  title?: string;              // Optional title
  readOnly?: boolean;          // Display-only flag
  showNumbers?: boolean;       // If false, hides all value number badges
}

export default function Abacus({
  value,
  onChange,
  title = 'Slide the beads to represent the number!',
  readOnly = false,
  showNumbers = false
}: AbacusProps) {
  const [localVal, setLocalVal] = useState(0);

  // Sync state if controlled
  const activeValue = value !== undefined ? value : localVal;

  // Resolve individual place values
  const ones = activeValue % 10;
  const tens = Math.floor((activeValue % 100) / 10);
  const hundreds = Math.floor((activeValue % 1000) / 100);

  const updateVal = (newVal: number) => {
    if (readOnly) return;
    
    // Boundary check
    const clampedVal = Math.max(0, Math.min(999, newVal));
    
    if (onChange) {
      onChange(clampedVal);
    } else {
      setLocalVal(clampedVal);
    }

    // Play synthesized mechanical bead click sound!
    try {
      if (typeof window !== 'undefined' && (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        // Crisp wooden tap sound
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(750, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.04);
        
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.04);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      }
    } catch (e) {
      // AudioContext blocked
    }
  };

  const handleUpperClick = (rodIndex: number, currentRodVal: number) => {
    if (readOnly) return;

    const hasUpperActive = currentRodVal >= 5;
    let newRodVal = currentRodVal;

    if (hasUpperActive) {
      newRodVal = currentRodVal - 5;
    } else {
      newRodVal = currentRodVal + 5;
    }

    applyRodChange(rodIndex, newRodVal);
  };

  const handleLowerClick = (rodIndex: number, currentRodVal: number, clickedBeadIndex: number) => {
    if (readOnly) return;

    const hasUpperActive = currentRodVal >= 5;
    const currentLowerCount = currentRodVal % 5;
    let newLowerCount = currentLowerCount;

    // clickedBeadIndex is 0-indexed from top of lower deck (0, 1, 2, 3)
    if (clickedBeadIndex < currentLowerCount) {
      // Clicked an active bead -> slide it and all below it back down
      newLowerCount = clickedBeadIndex;
    } else {
      // Clicked an inactive bead -> slide it and all above it up to the beam
      newLowerCount = clickedBeadIndex + 1;
    }

    const newRodVal = (hasUpperActive ? 5 : 0) + newLowerCount;
    applyRodChange(rodIndex, newRodVal);
  };

  const applyRodChange = (rodIndex: number, newRodVal: number) => {
    let finalVal = 0;
    if (rodIndex === 0) {
      // Hundreds rod
      finalVal = newRodVal * 100 + tens * 10 + ones;
    } else if (rodIndex === 1) {
      // Tens rod
      finalVal = hundreds * 100 + newRodVal * 10 + ones;
    } else {
      // Ones rod
      finalVal = hundreds * 100 + tens * 10 + newRodVal;
    }
    updateVal(finalVal);
  };

  const handleReset = () => {
    updateVal(0);
  };

  // Render a single place-value rod
  const renderRod = (rodIndex: number, rodValue: number) => {
    const isUpperActive = rodValue >= 5;
    const lowerActiveCount = rodValue % 5;

    // Coordinate positions for SVG/CSS rendering
    // Upper bead position
    const upperY = isUpperActive ? '32px' : '4px';

    // Lower beads positions
    const getLowerStyle = (beadIndex: number) => {
      const isActive = beadIndex < lowerActiveCount;
      if (isActive) {
        // Slide up towards the beam divider
        const pos = 58 + beadIndex * 17;
        return { transform: `translateY(${pos}px)` };
      } else {
        // Rest at the bottom edge
        const pos = 156 - (3 - beadIndex) * 17;
        return { transform: `translateY(${pos}px)` };
      }
    };

    return (
      <div className={styles.rodColumn} key={rodIndex}>
        {/* Brass Rod in background */}
        <div className={styles.verticalRod} />

        {/* Upper Deck Bead (representing value 5) */}
        <button
          type="button"
          className={`${styles.bead} ${
            isUpperActive ? styles.activeBead : styles.inactiveBead
          }`}
          style={{ transform: `translateY(${upperY})` }}
          onClick={() => handleUpperClick(rodIndex, rodValue)}
          disabled={readOnly}
          aria-label={`Rod ${rodIndex} upper bead. ${
            isUpperActive ? 'Active (5)' : 'Inactive'
          }`}
        />

        {/* Lower Deck 4 Beads (representing value 1 each) */}
        {Array.from({ length: 4 }).map((_, i) => {
          const isActive = i < lowerActiveCount;
          return (
            <button
              key={i}
              type="button"
              className={`${styles.bead} ${
                isActive ? styles.activeBead : styles.inactiveBead
              }`}
              style={getLowerStyle(i)}
              onClick={() => handleLowerClick(rodIndex, rodValue, i)}
              disabled={readOnly}
              aria-label={`Rod ${rodIndex} lower bead ${i + 1} of 4. ${
                isActive ? 'Active (1)' : 'Inactive'
              }`}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className={styles.abacusContainer}>
      {title && <h3 className={styles.abacusTitle}>{title}</h3>}
      
      {showNumbers && (
        <div className={styles.counterBadge}>
          {activeValue}
        </div>
      )}

      <div className={styles.abacusFrame}>
        <div className={styles.innerTrack}>
          {/* Horizontal Beam Divider */}
          <div className={styles.beamDivider}>
            <div className={styles.alignmentDot} />
            <div className={styles.alignmentDot} />
            <div className={styles.alignmentDot} />
          </div>

          {/* Render 3 Place-Value Rods (Hundreds, Tens, Ones) */}
          {[hundreds, tens, ones].map((val, idx) => renderRod(idx, val))}
        </div>
      </div>

      {/* Place Value Labels Row */}
      <div className={styles.placeValuesRow}>
        <div className={styles.placeValueLabel}>
          <span className={styles.labelLetter}>Hundreds</span>
          {showNumbers && <span className={styles.labelValue}>{hundreds}</span>}
        </div>
        <div className={styles.placeValueLabel}>
          <span className={styles.labelLetter}>Tens</span>
          {showNumbers && <span className={styles.labelValue}>{tens}</span>}
        </div>
        <div className={styles.placeValueLabel}>
          <span className={styles.labelLetter}>Ones</span>
          {showNumbers && <span className={styles.labelValue}>{ones}</span>}
        </div>
      </div>

      {!readOnly && activeValue > 0 && (
        <button
          type="button"
          className={styles.resetButton}
          onClick={handleReset}
        >
          Reset Abacus 🧹
        </button>
      )}
    </div>
  );
}
