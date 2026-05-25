'use client';

import React from 'react';
import styles from '../../app/practice/practice.module.css';
import { PracticeModule } from '../../types/practice';
import { AbacusDifficulty } from '../../utils/grade1Data';

interface SetupDashboardProps {
  selectedModule: PracticeModule;
  setupDifficulty: AbacusDifficulty;
  onSetSetupDifficulty: (diff: AbacusDifficulty) => void;
  setupQuestionCount: number;
  onSetSetupQuestionCount: (count: number) => void;
  isLoggedIn: boolean;
  onTriggerAuthWall: (reason: string) => void;
  onExit: () => void;
  onStart: () => void;
}

export default function SetupDashboard({
  selectedModule,
  setupDifficulty,
  onSetSetupDifficulty,
  setupQuestionCount,
  onSetSetupQuestionCount,
  isLoggedIn,
  onTriggerAuthWall,
  onExit,
  onStart
}: SetupDashboardProps) {
  
  const handleDifficultySelect = (difficulty: AbacusDifficulty) => {
    onSetSetupDifficulty(difficulty);
  };

  const handleCountSelect = (count: number) => {
    if (count > 10 && !isLoggedIn) {
      onTriggerAuthWall(`Select more than 10 questions (${count} Questions Quiz)`);
      return;
    }
    onSetSetupQuestionCount(count);
  };

  return (
    <div className={styles.setupDashboard}>
      <div className={`${styles.bgOrb} ${styles.orb1}`} />
      <div className={`${styles.bgOrb} ${styles.orb2}`} />

      <h2 className={styles.setupTitle}>Quiz Configuration ⚙️</h2>
      <p className={styles.setupSubtitle}>
        {selectedModule.subject === 'abacus'
          ? 'Configure your dynamic abacus workout. Procedural generator will compile a fresh set of equations!'
          : 'Configure your math workout level. Procedural generator will compile a fresh set of equations!'
        }
      </p>

      {/* Difficulty Selection */}
      <div className={styles.setupSection}>
        <h3 className={styles.setupSectionTitle}>Select Difficulty Level</h3>
        <div className={styles.pillsRow}>
          {(['beginner', 'medium', 'expert'] as AbacusDifficulty[]).map((d) => {
            const isActive = setupDifficulty === d;
            
            let label = '';
            const sub = selectedModule.subject;
            if (sub === 'abacus') {
              const displayLabels: Record<AbacusDifficulty, string> = {
                beginner: '🌱 Beginner (Direct)',
                medium: '⚡ Medium (Small Friends)',
                expert: '🏆 Expert (Big Friends)'
              };
              label = displayLabels[d];
            } else if (sub === 'maths_additions' || sub === 'maths_subtractions') {
              const displayLabels: Record<AbacusDifficulty, string> = {
                beginner: '🌱 Simple (1 Digit)',
                medium: '⚡ Two Digit',
                expert: '🏆 Three Digit'
              };
              label = displayLabels[d];
            } else if (sub === 'maths_wordproblems') {
              const displayLabels: Record<AbacusDifficulty, string> = {
                beginner: '🌱 Simple (1-Digit)',
                medium: '⚡ Two Digit',
                expert: '🏆 Three Digit'
              };
              label = displayLabels[d];
            } else {
              const displayLabels: Record<AbacusDifficulty, string> = {
                beginner: '🌱 Beginner',
                medium: '⚡ Intermediate',
                expert: '🏆 Advanced'
              };
              label = displayLabels[d];
            }

            return (
              <button
                key={d}
                type="button"
                className={`${styles.pillButton} ${isActive ? styles.pillButtonActive : ''}`}
                onClick={() => handleDifficultySelect(d)}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Question Count Selection */}
      <div className={styles.setupSection}>
        <h3 className={styles.setupSectionTitle}>Number of Questions</h3>
        <div className={styles.pillsRow}>
          {[10, 20, 30, 50, 100].map((count) => {
            const isActive = setupQuestionCount === count;
            const isLocked = count > 10 && !isLoggedIn;

            return (
              <button
                key={count}
                type="button"
                className={`${styles.pillButton} ${isActive ? styles.pillButtonActive : ''} ${
                  isLocked ? styles.pillLocked : ''
                }`}
                onClick={() => handleCountSelect(count)}
              >
                <span>{count} Questions</span>
                {count === 10 && <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: '6px', marginLeft: '6px' }}>Free Sample</span>}
                {isLocked && <span className={styles.lockIcon}>🔒</span>}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', marginTop: '40px' }}>
        <button
          type="button"
          className={styles.exitBtn}
          onClick={onExit}
          style={{ width: '40%', padding: '14px' }}
        >
          Cancel 🚪
        </button>
        <button
          type="button"
          className={styles.setupStartBtn}
          onClick={onStart}
          style={{ width: '60%', margin: 0 }}
        >
          Start Challenge 🚀
        </button>
      </div>
    </div>
  );
}
