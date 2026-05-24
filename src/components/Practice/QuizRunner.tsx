'use client';

import React from 'react';
import styles from '../../app/practice/practice.module.css';
import { PracticeModule, PracticeQuestion } from '../../types/practice';
import Abacus from './Abacus';
import FractionShapes from './FractionShapes';
import VisualAids from './VisualAids';
import MazeGame from './MazeGame';
import SlidingPuzzle from './SlidingPuzzle';
import PatternMatch from './PatternMatch';
import DetectiveGame from './DetectiveGame';

interface QuizRunnerProps {
  selectedModule: PracticeModule;
  currentQuestionIndex: number;
  quizAnswers: Record<string, string | number>;
  hintLevels: Record<string, number>;
  activeFractionShaded: number;
  activeAbacusValue: number;
  activeAbacusA: number;
  activeAbacusB: number;
  
  onAbacusAChange: (val: number, id: string) => void;
  onAbacusBChange: (val: number, id: string) => void;
  onFractionChange: (val: number, id: string) => void;
  onMCQSelect: (qId: string, optIndex: string) => void;
  onToggleHint: (qId: string, level: number) => void;
  onExit: () => void;
  onNextPage: () => void;
  onPrevPage?: () => void;
  onTextAnswerChange?: (qId: string, val: string) => void;
}

export default function QuizRunner({
  selectedModule,
  currentQuestionIndex,
  quizAnswers,
  hintLevels,
  activeFractionShaded,
  activeAbacusValue,
  activeAbacusA,
  activeAbacusB,
  onAbacusAChange,
  onAbacusBChange,
  onFractionChange,
  onMCQSelect,
  onToggleHint,
  onExit,
  onNextPage,
  onPrevPage,
  onTextAnswerChange
}: QuizRunnerProps) {
  const [carryValues, setCarryValues] = React.useState<Record<string, string>>({});
  const [isHelperOpen, setIsHelperOpen] = React.useState(false);
  const [helperLineCounts, setHelperLineCounts] = React.useState<number[]>([0, 0]);
  const [helperObject, setHelperObject] = React.useState('🏀');
  const [activeQId, setActiveQId] = React.useState<string | null>(null);

  const resetHelperBox = React.useCallback(() => {
    setHelperLineCounts([0, 0]);
    const symbols = ['🏀', '🍎', '☝️', '📚', '🧸', '🍇', '🎈', '🚗', '⭐', '🦖'];
    setHelperObject(symbols[Math.floor(Math.random() * symbols.length)]);
  }, []);

  const totalQuestions = selectedModule.questions.length;
  const isAbacus = selectedModule.subject === 'abacus';

  // ─── CASE A: Abacus Worksheet Layout ─────────────────────────────
  if (isAbacus) {
    const qA = selectedModule.questions[currentQuestionIndex];
    const qB = selectedModule.questions[currentQuestionIndex + 1];
    
    const pageIndex = Math.floor(currentQuestionIndex / 2) + 1;
    const totalPages = Math.ceil(totalQuestions / 2);
    const progressPercent = Math.round((pageIndex / totalPages) * 100);

    const renderAbacusSheetCard = (
      q: PracticeQuestion | undefined,
      num: number,
      activeVal: number,
      onValChange: (val: number, id: string) => void
    ) => {
      if (!q) return null;
      const savedAnswer = quizAnswers[q.id];
      const hLevel = hintLevels[q.id] || 0;

      return (
        <div className={styles.questionCard} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: '4px', height: '100%', minHeight: 0 }}>
          <p className={styles.qMeta}>
            Question {num} of {totalQuestions}
          </p>
          
          <h2 className={styles.qText} style={{ marginBottom: '2px' }}>{q.questionText}</h2>

          <div style={{ margin: '0 auto', display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Abacus
              value={q.type === 'mcq' ? q.abacusTargetCount : activeVal}
              onChange={(val) => onValChange(val, q.id)}
              readOnly={q.type === 'mcq'}
              title=""
            />
          </div>

          {q.type === 'mcq' && q.options && (
            <div className={styles.optionsList} style={{ marginTop: '4px', gap: '4px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', width: '100%' }}>
                {q.options.map((opt, i) => {
                  const optIndex = i.toString();
                  const isSelected = savedAnswer?.toString() === optIndex;
                  return (
                    <button
                      key={i}
                      type="button"
                      className={styles.optionItem}
                      style={{ border: isSelected ? '2px solid #ff7e5f' : '', padding: '6px 8px', fontSize: '0.85rem', textAlign: 'center', justifyContent: 'center' }}
                      onClick={() => onMCQSelect(q.id, optIndex)}
                    >
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Status count indicator removed to avoid revealing answer */}

          {/* Render hint box only if Hint is active */}
          {hLevel > 0 && (
            <div style={{ marginTop: '8px', background: '#fff8f5', border: '1px solid #ffdcd0', borderRadius: '12px', padding: '10px' }}>
              <p style={{ color: '#e65100', fontSize: '0.8rem', fontWeight: 800, margin: '0 0 4px 0' }}>💡 Concept Clue:</p>
              <p style={{ fontSize: '0.8rem', color: '#5c3a21', margin: 0 }}>{q.hint.conceptClue}</p>
            </div>
          )}
        </div>
      );
    };

    const isLastPage = pageIndex >= totalPages;

    return (
      <div className={styles.quizWrapper}>
        <div className={`${styles.bgOrb} ${styles.orb1}`} />
        <div className={`${styles.bgOrb} ${styles.orb2}`} />

        <div className={styles.quizHeader}>
          <span style={{ fontWeight: 800, color: '#ff6b4a', fontSize: '1.2rem' }}>
            {selectedModule.title}
          </span>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {((qA && hintLevels[qA.id] === 0) || (qB && hintLevels[qB.id] === 0)) ? (
              <button
                type="button"
                className={styles.hintToggleBtn}
                style={{ padding: '6px 14px', fontSize: '0.85rem', margin: 0, borderStyle: 'solid' }}
                onClick={() => {
                  if (qA && hintLevels[qA.id] === 0) onToggleHint(qA.id, 0);
                  if (qB && hintLevels[qB.id] === 0) onToggleHint(qB.id, 0);
                }}
              >
                🧠 Ask MyMate AI a Hint
              </button>
            ) : (
              <button
                type="button"
                className={styles.hintToggleBtn}
                style={{ padding: '6px 14px', fontSize: '0.85rem', margin: 0, background: '#fff0ed', color: '#ff6b4a', borderColor: '#ff6b4a' }}
                onClick={() => {
                  if (qA) onToggleHint(qA.id, 0);
                  if (qB) onToggleHint(qB.id, 0);
                }}
              >
                💡 Hints Active
              </button>
            )}
            <button type="button" className={styles.exitBtn} onClick={onExit} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
              Exit Test 🚪
            </button>
          </div>
        </div>

        <div className={styles.progressContainer}>
          <div className={styles.progressBar} style={{ width: `${progressPercent}%` }} />
        </div>

        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: qB ? 'repeat(2, 1fr)' : '1fr', 
            gap: '16px', 
            flexGrow: 1, 
            height: 0, 
            minHeight: 0, 
            overflow: 'hidden' 
          }}
        >
          {qA && renderAbacusSheetCard(qA, currentQuestionIndex + 1, activeAbacusA, onAbacusAChange)}
          {qB && renderAbacusSheetCard(qB, currentQuestionIndex + 2, activeAbacusB, onAbacusBChange)}
        </div>

        <div className={styles.nextBtnRow} style={{ marginTop: '8px', display: 'flex', gap: '12px', justifyContent: 'flex-end', width: '100%' }}>
          {currentQuestionIndex > 0 && onPrevPage && (
            <button
              type="button"
              className={styles.exitBtn}
              onClick={onPrevPage}
              style={{ padding: '8px 24px', fontSize: '1rem', background: '#fff', border: '1px solid rgba(0,0,0,0.15)', color: '#4a5568', margin: 0 }}
            >
              ⬅️ Previous Page
            </button>
          )}
          <button
            type="button"
            className={styles.nextBtn}
            onClick={onNextPage}
            style={{ padding: '8px 24px', fontSize: '1rem' }}
          >
            {isLastPage ? 'Submit Quiz 🏁' : 'Next Page ➡️'}
          </button>
        </div>
      </div>
    );
  }

  // ─── CASE C: Math Worksheet Layout (4 sums per page) ──────────────
  const isMathSheet = selectedModule.subject === 'maths_additions' || selectedModule.subject === 'maths_subtractions';



  if (isMathSheet) {
    const qA = selectedModule.questions[currentQuestionIndex];
    const qB = selectedModule.questions[currentQuestionIndex + 1];
    const qC = selectedModule.questions[currentQuestionIndex + 2];
    const qD = selectedModule.questions[currentQuestionIndex + 3];
    const qE = selectedModule.questions[currentQuestionIndex + 4];

    const pageIndex = Math.floor(currentQuestionIndex / 5) + 1;
    const totalPages = Math.ceil(totalQuestions / 5);
    const progressPercent = Math.round((pageIndex / totalPages) * 100);

    const renderMathSheetCard = (q: PracticeQuestion | undefined, num: number) => {
      if (!q) return null;
      const savedAnswer = quizAnswers[q.id];
      const hLevel = hintLevels[q.id] || 0;

      const strA = q.operandA !== undefined ? q.operandA.toString() : '';
      const strB = q.operandB !== undefined ? q.operandB.toString() : '';
      const maxLength = Math.max(strA.length, strB.length);
      const paddedA = strA.padStart(maxLength, ' ');
      const paddedB = strB.padStart(maxLength, ' ');

      const cellsA = paddedA.split('');
      const cellsB = paddedB.split('');

      // Helper to check if a carry box should be rendered above a specific column index
      const shouldShowCarryAt = (colIdx: number) => {
        if (q.operator !== '+') return false;
        if (q.operandA === undefined || q.operandB === undefined) return false;
        if (colIdx === maxLength - 1) return false; // Rightmost column doesn't carry

        if (maxLength === 2) {
          if (colIdx === 0) {
            const onesA = q.operandA % 10;
            const onesB = q.operandB % 10;
            return (onesA + onesB) >= 10;
          }
        }

        if (maxLength === 3) {
          const onesA = q.operandA % 10;
          const onesB = q.operandB % 10;
          const onesCarry = (onesA + onesB) >= 10 ? 1 : 0;

          if (colIdx === 1) {
            return onesCarry > 0;
          }
          if (colIdx === 0) {
            const tensA = Math.floor((q.operandA % 100) / 10);
            const tensB = Math.floor((q.operandB % 100) / 10);
            return (tensA + tensB + onesCarry) >= 10;
          }
        }

        return false;
      };



      return (
        <div 
          className={styles.questionCard} 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'flex-start', 
            gap: '6px', 
            height: 'auto', 
            padding: '10px 12px'
          }}
        >
          <p className={styles.qMeta} style={{ margin: 0 }}>
            Question {num} of {totalQuestions}
          </p>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            fontFamily: '"Courier New", Courier, monospace',
            fontSize: '1.8rem',
            fontWeight: 800,
            color: '#2d3748',
            width: 'auto',
            margin: '0 auto',
            position: 'relative',
            userSelect: 'none',
            background: 'rgba(255, 255, 255, 0.75)',
            padding: '10px 18px 6px 18px',
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
            border: '1px solid rgba(255, 126, 95, 0.2)'
          }}>
            {/* 1. Carry Row (Always rendered to lock alignment) */}
            <div style={{ 
              display: 'flex', 
              gap: '6px', 
              marginBottom: '4px', 
              paddingRight: '4px',
              height: '24px',
              alignItems: 'center'
            }}>
              {cellsA.map((_, colIdx) => {
                const isRightmost = colIdx === maxLength - 1;
                // Render text inputs above all non-ones columns in additions, borderless & backgroundless
                const isAddition = q.operator === '+';
                const showInput = isAddition && !isRightmost;
                
                return (
                  <div key={`carry-${colIdx}`} style={{ width: '28px', height: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {showInput ? (
                      <input
                        type="text"
                        maxLength={1}
                        value={carryValues[`${q.id}-${colIdx}`] || ''}
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9]/g, '');
                          setCarryValues(prev => ({ ...prev, [`${q.id}-${colIdx}`]: val }));
                        }}
                        placeholder=""
                        style={{
                          width: '22px',
                          height: '22px',
                          border: 'none',
                          borderRadius: '4px',
                          fontSize: '1rem',
                          fontWeight: 800,
                          textAlign: 'center',
                          color: '#ff6b4a',
                          outline: 'none',
                          background: 'transparent',
                          boxShadow: 'none',
                          padding: 0
                        }}
                      />
                    ) : (
                      <div style={{ width: '22px', height: '22px' }} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* 2. Operand A Row */}
            <div style={{ display: 'flex', gap: '6px', paddingRight: '4px' }}>
              {cellsA.map((char, colIdx) => (
                <div key={`a-${colIdx}`} style={{ width: '28px', textAlign: 'center' }}>
                  {char}
                </div>
              ))}
            </div>

            {/* 3. Operand B Row */}
            <div style={{ 
              display: 'flex', 
              gap: '6px', 
              borderBottom: '3px solid #4a5568', 
              width: '100%', 
              justifyContent: 'flex-end', 
              paddingBottom: '6px',
              marginTop: '2px',
              position: 'relative',
              paddingRight: '4px'
            }}>
              <span style={{ position: 'absolute', left: '0px', bottom: '8px', color: '#ff6b4a', fontWeight: 'bold' }}>
                {q.operator}
              </span>
              {cellsB.map((char, colIdx) => (
                <div key={`b-${colIdx}`} style={{ width: '28px', textAlign: 'center' }}>
                  {char}
                </div>
              ))}
            </div>

            {/* 4. Answer Input Box */}
            <div style={{ width: '100%', marginTop: '4px' }}>
              <input
                type="text"
                pattern="[0-9]*"
                inputMode="numeric"
                placeholder="?"
                value={savedAnswer !== undefined ? savedAnswer.toString() : ''}
                onChange={(e) => onTextAnswerChange && onTextAnswerChange(q.id, e.target.value)}
                onFocus={() => {
                  if (activeQId !== q.id) {
                    setActiveQId(q.id);
                    resetHelperBox();
                  }
                }}
                onBlur={(e) => {
                  if (e.target.value.trim() !== '') {
                    resetHelperBox();
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    resetHelperBox();
                  }
                }}
                style={{
                  width: '100%',
                  border: 'none',
                  background: 'rgba(255, 126, 95, 0.05)',
                  outline: 'none',
                  fontFamily: '"Courier New", Courier, monospace',
                  fontSize: '1.8rem',
                  fontWeight: 800,
                  color: '#ff6b4a',
                  textAlign: 'right',
                  padding: '4px 6px',
                  borderRadius: '8px',
                  borderBottom: '2px dashed #ff7e5f'
                }}
              />
            </div>
          </div>



          {hLevel > 0 && (
            <div style={{ marginTop: 'auto', background: '#fff8f5', border: '1px solid #ffdcd0', borderRadius: '12px', padding: '10px' }}>
              <p style={{ color: '#e65100', fontSize: '0.8rem', fontWeight: 800, margin: '0 0 4px 0' }}>💡 Concept Clue:</p>
              <p style={{ fontSize: '0.75rem', color: '#5c3a21', margin: 0 }}>{q.hint.conceptClue}</p>
            </div>
          )}
        </div>
      );
    };

    const isLastPage = pageIndex >= totalPages;

    return (
      <div className={styles.quizWrapper}>
        <div className={`${styles.bgOrb} ${styles.orb1}`} />
        <div className={`${styles.bgOrb} ${styles.orb2}`} />

        <div className={styles.quizHeader}>
          <span style={{ fontWeight: 800, color: '#ff6b4a', fontSize: '1.2rem' }}>
            {selectedModule.title}
          </span>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {((qA && hintLevels[qA.id] === 0) || 
              (qB && hintLevels[qB.id] === 0) || 
              (qC && hintLevels[qC.id] === 0) || 
              (qD && hintLevels[qD.id] === 0) ||
              (qE && hintLevels[qE.id] === 0)) ? (
              <button
                type="button"
                className={styles.hintToggleBtn}
                style={{ padding: '6px 14px', fontSize: '0.85rem', margin: 0, borderStyle: 'solid' }}
                onClick={() => {
                  if (qA && hintLevels[qA.id] === 0) onToggleHint(qA.id, 0);
                  if (qB && hintLevels[qB.id] === 0) onToggleHint(qB.id, 0);
                  if (qC && hintLevels[qC.id] === 0) onToggleHint(qC.id, 0);
                  if (qD && hintLevels[qD.id] === 0) onToggleHint(qD.id, 0);
                  if (qE && hintLevels[qE.id] === 0) onToggleHint(qE.id, 0);
                }}
              >
                🧠 Ask MyMate AI a Hint
              </button>
            ) : (
              <button
                type="button"
                className={styles.hintToggleBtn}
                style={{ padding: '6px 14px', fontSize: '0.85rem', margin: 0, background: '#fff0ed', color: '#ff6b4a', borderColor: '#ff6b4a' }}
                onClick={() => {
                  if (qA) onToggleHint(qA.id, 0);
                  if (qB) onToggleHint(qB.id, 0);
                  if (qC) onToggleHint(qC.id, 0);
                  if (qD) onToggleHint(qD.id, 0);
                  if (qE) onToggleHint(qE.id, 0);
                }}
              >
                💡 Hints Active
              </button>
            )}
            <button
              type="button"
              className={styles.hintToggleBtn}
              style={{
                padding: '6px 14px',
                fontSize: '0.85rem',
                margin: 0,
                background: isHelperOpen ? '#fff0ed' : '#ffffff',
                color: isHelperOpen ? '#ff6b4a' : '#4a5568',
                borderColor: isHelperOpen ? '#ff6b4a' : 'rgba(0,0,0,0.15)',
                borderStyle: 'solid'
              }}
              onClick={() => setIsHelperOpen(prev => !prev)}
            >
              🧮 Counting Helper
            </button>
            <button type="button" className={styles.exitBtn} onClick={onExit} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
              Exit Test 🚪
            </button>
          </div>
        </div>

        <div className={styles.progressContainer}>
          <div className={styles.progressBar} style={{ width: `${progressPercent}%` }} />
        </div>

        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: `repeat(${[qA, qB, qC, qD, qE].filter(Boolean).length}, 1fr)`, 
            gap: '12px', 
            alignItems: 'start'
          }}
        >
          {qA && renderMathSheetCard(qA, currentQuestionIndex + 1)}
          {qB && renderMathSheetCard(qB, currentQuestionIndex + 2)}
          {qC && renderMathSheetCard(qC, currentQuestionIndex + 3)}
          {qD && renderMathSheetCard(qD, currentQuestionIndex + 4)}
          {qE && renderMathSheetCard(qE, currentQuestionIndex + 5)}
        </div>

        {/* Single Shared Counting Helper Drawer */}
        {isHelperOpen && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 126, 95, 0.2)',
            borderRadius: '20px',
            padding: '12px 18px',
            marginTop: '12px',
            boxShadow: '0 8px 30px rgba(255, 126, 95, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            width: '100%',
            userSelect: 'none'
          }}>
            {/* Helper Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px dashed rgba(255, 126, 95, 0.15)',
              paddingBottom: '4px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.2rem' }}>🧮</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#2d3748' }}>
                  Counting Helper (using {helperObject})
                </span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={resetHelperBox}
                  style={{
                    padding: '2px 8px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    background: '#fff0ed',
                    color: '#ff6b4a',
                    border: '1px solid rgba(255, 107, 74, 0.3)',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  🔄 Reset
                </button>
                <button
                  type="button"
                  onClick={() => setIsHelperOpen(false)}
                  style={{
                    padding: '2px 8px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    background: '#f7fafc',
                    color: '#718096',
                    border: '1px solid rgba(0,0,0,0.1)',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  ❌ Close
                </button>
              </div>
            </div>

            {/* Lines Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {helperLineCounts.map((count, lineIdx) => (
                <div
                  key={lineIdx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'rgba(255, 126, 95, 0.02)',
                    border: '1px dashed rgba(255, 126, 95, 0.15)',
                    borderRadius: '10px',
                    padding: '4px 10px',
                    height: '36px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#718096', width: '50px' }}>
                      Line {lineIdx + 1}:
                    </span>
                    <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', maxWidth: '280px' }}>
                      {Array.from({ length: count }).map((_, idx) => (
                        <span key={idx} style={{ fontSize: '1.2rem' }}>
                          {helperObject}
                        </span>
                      ))}
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#ff6b4a', marginLeft: '4px' }}>
                      ({count})
                    </span>
                  </div>

                  {/* Adjust line buttons */}
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button
                      type="button"
                      onClick={() => {
                        setHelperLineCounts(prev => {
                          const next = [...prev];
                          if (next[lineIdx] > 0) next[lineIdx]--;
                          return next;
                        });
                      }}
                      style={{
                        width: '24px',
                        height: '24px',
                        fontSize: '0.85rem',
                        fontWeight: 800,
                        color: '#ff6b4a',
                        background: '#fff0ed',
                        border: '1px solid rgba(255, 107, 74, 0.2)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        outline: 'none'
                      }}
                    >
                      -
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setHelperLineCounts(prev => {
                          const next = [...prev];
                          if (next[lineIdx] < 20) next[lineIdx]++;
                          return next;
                        });
                      }}
                      style={{
                        width: '24px',
                        height: '24px',
                        fontSize: '0.85rem',
                        fontWeight: 800,
                        color: '#ffffff',
                        background: 'linear-gradient(135deg, #ff7e5f, #ff6b4a)',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 4px rgba(255, 107, 74, 0.15)',
                        outline: 'none'
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add/Remove Line buttons & formula */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '2px',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              {/* Toggle Line 3 Button */}
              {helperLineCounts.length === 2 ? (
                <button
                  type="button"
                  onClick={() => setHelperLineCounts(prev => [...prev, 0])}
                  style={{
                    padding: '4px 10px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    background: '#ffffff',
                    color: '#4a5568',
                    border: '1px solid rgba(0,0,0,0.15)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    outline: 'none'
                  }}
                >
                  ➕ Add 3rd Line
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setHelperLineCounts(prev => prev.slice(0, 2))}
                  style={{
                    padding: '4px 10px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    background: '#ffffff',
                    color: '#e53e3e',
                    border: '1px solid rgba(229, 62, 62, 0.2)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    outline: 'none'
                  }}
                >
                  ➖ Remove 3rd Line
                </button>
              )}


            </div>
          </div>
        )}

        <div className={styles.nextBtnRow} style={{ marginTop: '8px', display: 'flex', gap: '12px', justifyContent: 'flex-end', width: '100%' }}>
          {currentQuestionIndex > 0 && onPrevPage && (
            <button
              type="button"
              className={styles.exitBtn}
              onClick={onPrevPage}
              style={{ padding: '8px 24px', fontSize: '1rem', background: '#fff', border: '1px solid rgba(0,0,0,0.15)', color: '#4a5568', margin: 0 }}
            >
              ⬅️ Previous Page
            </button>
          )}
          <button
            type="button"
            className={styles.nextBtn}
            onClick={onNextPage}
            style={{ padding: '8px 24px', fontSize: '1rem' }}
          >
            {isLastPage ? 'Submit Quiz 🏁' : 'Next Page ➡️'}
          </button>
        </div>
      </div>
    );
  }

  // ─── CASE D: Game Layouts ──────────────────────────────────────────
  const isGame = selectedModule.subject.startsWith('games_');
  if (isGame) {
    const question = selectedModule.questions[currentQuestionIndex];
    const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);
    const isLastPage = currentQuestionIndex + 1 >= totalQuestions;
    const hLevel = hintLevels[question.id] || 0;

    return (
      <div className={styles.quizWrapper} style={{ padding: '16px', height: '100%' }}>
        <div className={`${styles.bgOrb} ${styles.orb1}`} />
        <div className={`${styles.bgOrb} ${styles.orb2}`} />

        <div className={styles.quizHeader}>
          <span style={{ fontWeight: 800, color: '#ff6b4a', fontSize: '1.2rem' }}>
            {selectedModule.title}
          </span>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {hLevel === 0 ? (
              <button
                type="button"
                className={styles.hintToggleBtn}
                style={{ padding: '6px 14px', fontSize: '0.85rem', margin: 0, borderStyle: 'solid' }}
                onClick={() => onToggleHint(question.id, 0)}
              >
                🧠 Ask MyMate AI a Hint
              </button>
            ) : (
              <button
                type="button"
                className={styles.hintToggleBtn}
                style={{ padding: '6px 14px', fontSize: '0.85rem', margin: 0, background: '#fff0ed', color: '#ff6b4a', borderColor: '#ff6b4a' }}
                onClick={() => onToggleHint(question.id, 0)}
              >
                💡 Hint Active
              </button>
            )}
            <button type="button" className={styles.exitBtn} onClick={onExit} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
              Exit Test 🚪
            </button>
          </div>
        </div>

        <div className={styles.progressContainer}>
          <div className={styles.progressBar} style={{ width: `${progressPercent}%` }} />
        </div>

        <div className={styles.questionCard} style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
          <p className={styles.qMeta}>
            Level {currentQuestionIndex + 1} of {totalQuestions}
          </p>

          {hLevel > 0 && (
            <div style={{ marginTop: '8px', background: '#fff8f5', border: '1px solid #ffdcd0', borderRadius: '12px', padding: '10px' }}>
              <p style={{ color: '#e65100', fontSize: '0.8rem', fontWeight: 800, margin: '0 0 4px 0' }}>💡 Concept Clue:</p>
              <p style={{ fontSize: '0.8rem', color: '#5c3a21', margin: 0 }}>{question.hint.conceptClue}</p>
              {hLevel > 1 && (
                <>
                  <p style={{ color: '#e65100', fontSize: '0.8rem', fontWeight: 800, margin: '8px 0 4px 0' }}>🔍 Next Step:</p>
                  <p style={{ fontSize: '0.8rem', color: '#5c3a21', margin: 0 }}>{question.hint.stepByStepClue}</p>
                </>
              )}
            </div>
          )}

          <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {selectedModule.subject === 'games_maze' && (
              <MazeGame question={question} onComplete={(qId) => onMCQSelect(qId, '1')} />
            )}
            {selectedModule.subject === 'games_puzzle' && (
              <SlidingPuzzle question={question} onComplete={(qId) => onMCQSelect(qId, '1')} />
            )}
            {selectedModule.subject === 'games_pattern' && (
              <PatternMatch 
                question={question} 
                onSelect={onMCQSelect} 
                selectedAnswer={quizAnswers[question.id]?.toString()} 
              />
            )}
            {selectedModule.subject === 'games_detective' && (
              <DetectiveGame 
                question={question} 
                onSelect={onMCQSelect} 
                selectedAnswer={quizAnswers[question.id]?.toString()} 
              />
            )}
          </div>
        </div>

        <div className={styles.nextBtnRow} style={{ marginTop: '12px', display: 'flex', gap: '12px', justifyContent: 'flex-end', width: '100%' }}>
          {currentQuestionIndex > 0 && onPrevPage && (
            <button
              type="button"
              className={styles.exitBtn}
              onClick={onPrevPage}
              style={{ padding: '10px 24px', fontSize: '1rem', background: '#fff', border: '1px solid rgba(0,0,0,0.15)', color: '#4a5568', margin: 0 }}
            >
              ⬅️ Previous Level
            </button>
          )}
          <button
            type="button"
            className={styles.nextBtn}
            onClick={onNextPage}
            disabled={!quizAnswers[question.id]}
            style={{ 
              padding: '10px 32px', 
              fontSize: '1rem',
              opacity: quizAnswers[question.id] ? 1 : 0.5,
              cursor: quizAnswers[question.id] ? 'pointer' : 'not-allowed'
            }}
          >
            {isLastPage ? 'Finish Games 🏁' : 'Next Level ➡️'}
          </button>
        </div>
      </div>
    );
  }

  // ─── CASE B: Standard Question Layout ────────────────────────────
  const question = selectedModule.questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);
  const savedAnswer = quizAnswers[question.id];
  const hLevel = hintLevels[question.id] || 0;
  const isLastQuestion = currentQuestionIndex + 1 >= totalQuestions;

  return (
    <div className={styles.quizWrapper}>
      <div className={`${styles.bgOrb} ${styles.orb1}`} />
      <div className={`${styles.bgOrb} ${styles.orb2}`} />

      <div className={styles.quizHeader}>
        <span style={{ fontWeight: 800, color: '#ff6b4a', fontSize: '1.2rem' }}>
          {selectedModule.title}
        </span>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {hLevel === 0 ? (
            <button
              type="button"
              className={styles.hintToggleBtn}
              style={{ padding: '6px 14px', fontSize: '0.85rem', margin: 0, borderStyle: 'solid' }}
              onClick={() => onToggleHint(question.id, 0)}
            >
              🧠 Ask MyMate AI a Hint
            </button>
          ) : (
            <button
              type="button"
              className={styles.hintToggleBtn}
              style={{ padding: '6px 14px', fontSize: '0.85rem', margin: 0, background: '#fff0ed', color: '#ff6b4a', borderColor: '#ff6b4a' }}
              onClick={() => onToggleHint(question.id, 0)}
            >
              💡 Hint Active
            </button>
          )}
          <button type="button" className={styles.exitBtn} onClick={onExit} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
            Exit Test 🚪
          </button>
        </div>
      </div>

      <div className={styles.progressContainer} style={{ marginBottom: '16px' }}>
        <div className={styles.progressBar} style={{ width: `${progressPercent}%` }} />
      </div>

      <div className={styles.quizGrid}>
        
        {/* Left Column: Question Card */}
        <div className={styles.questionCard} style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', padding: '14px 20px' }}>
          <div>
            <p className={styles.qMeta} style={{ marginBottom: '4px' }}>
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </p>
            
            <h2 className={styles.qText} style={{ fontSize: '1.1rem', marginBottom: '12px', lineHeight: '1.4' }}>{question.questionText}</h2>

            {/* Answer Selector: MCQs */}
            {question.type === 'mcq' && question.options && (
              <div className={styles.optionsList}>
                {question.options.map((opt, i) => {
                  const optIndex = i.toString();
                  const isSelected = savedAnswer?.toString() === optIndex;
                  return (
                    <button
                      key={i}
                      type="button"
                      className={styles.optionItem}
                      style={{ border: isSelected ? '2px solid #ff7e5f' : '' }}
                      onClick={() => onMCQSelect(question.id, optIndex)}
                    >
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Answer Selector: Fractions Interactive indicator */}
            {question.type !== 'mcq' && (
              <div className={styles.optionsList}>
                <p style={{ color: '#718096', fontSize: '0.9rem', fontStyle: 'italic', margin: 0 }}>
                  💡 Color the segments on the right to match the answer, then click Next!
                </p>
                <div style={{ marginTop: '8px' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      background: savedAnswer !== undefined ? 'rgba(255, 126, 95, 0.1)' : 'rgba(0,0,0,0.03)',
                      color: savedAnswer !== undefined ? '#ff6b4a' : '#718096',
                      padding: '5px 12px',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      fontWeight: 700
                    }}
                  >
                    {savedAnswer !== undefined ? `Parts shaded: ${savedAnswer} 🍕` : 'Status: Waiting for shading'}
                  </span>
                </div>
              </div>
            )}

            {/* Scaffolding AI Hints - Only render when active */}
            {hLevel > 0 && (
              <div className={styles.hintSection} style={{ marginTop: '12px', paddingTop: '8px' }}>
                <div className={styles.hintBox} style={{ margin: 0, padding: '12px 16px' }}>
                  <div className={styles.hintHeader} style={{ fontSize: '0.85rem', marginBottom: '4px' }}>
                    <span>💡</span> AI Conceptual Hint
                  </div>
                  <p className={styles.hintContent} style={{ fontSize: '0.85rem', margin: 0 }}>{question.hint.conceptClue}</p>
                  
                  {hLevel === 1 && (
                    <button
                      type="button"
                      className={styles.secondHintAlert}
                      onClick={() => onToggleHint(question.id, 1)}
                      style={{ marginTop: '6px', fontSize: '0.75rem' }}
                    >
                      Still stuck? Reveal detailed step helper.
                    </button>
                  )}
                  
                  {hLevel === 2 && (
                    <div style={{ marginTop: '8px', borderTop: '1px dashed #ffdcd0', paddingTop: '8px' }}>
                      <div className={styles.hintHeader} style={{ fontSize: '0.85rem', marginBottom: '4px' }}>
                        <span>🪜</span> Detailed Clue Step
                      </div>
                      <p className={styles.hintContent} style={{ fontSize: '0.85rem', margin: 0 }}>{question.hint.stepByStepClue}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Action Bar (Next Page/Submit) */}
          <div className={styles.nextBtnRow} style={{ marginTop: '8px', display: 'flex', gap: '12px' }}>
            {currentQuestionIndex > 0 && onPrevPage && (
              <button
                type="button"
                className={styles.exitBtn}
                onClick={onPrevPage}
                style={{ padding: '8px 24px', fontSize: '0.95rem', background: '#fff', border: '1px solid rgba(0,0,0,0.15)', color: '#4a5568', margin: 0 }}
              >
                ⬅️ Previous
              </button>
            )}
            <button
              type="button"
              className={styles.nextBtn}
              onClick={onNextPage}
              style={{ padding: '8px 24px', fontSize: '0.95rem' }}
            >
              {isLastQuestion ? 'Submit Quiz 🏁' : 'Next Question ➡️'}
            </button>
          </div>

        </div>

        {/* Right Column: Visual aids or shading tools */}
        <div className={styles.interactivesPane} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          {question.type === 'fraction_shading' ? (
            <FractionShapes
              value={activeFractionShaded}
              onChange={(val) => onFractionChange(val, question.id)}
              shape={question.shapeType || 'circle'}
              totalSegments={question.fractionTotalSegments || 4}
              readOnly={false}
              title="Shade segments to match the fraction!"
            />
          ) : question.operandA !== undefined && question.operandB !== undefined && question.operator !== undefined ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ff6b4a', marginBottom: '8px' }}>
                {question.subject === 'maths_additions' ? 'Addition Column Sum ➕' : 'Subtraction Column Sum ➖'}
              </h3>
              <p style={{ color: '#718096', fontSize: '0.85rem', marginBottom: '16px', textAlign: 'center' }}>
                Solve the vertical arithmetic worksheet sum below:
              </p>
              {(() => {
                const strA = question.operandA.toString();
                const strB = question.operandB.toString();
                const maxLength = Math.max(strA.length, strB.length);
                const paddedA = strA.padStart(maxLength, ' ');
                const paddedB = strB.padStart(maxLength, ' ');
                return (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    fontFamily: '"Courier New", Courier, monospace',
                    fontSize: '3.5rem',
                    fontWeight: 800,
                    color: '#2d3748',
                    width: '200px',
                    margin: '20px auto',
                    borderBottom: '8px double #4a5568',
                    paddingBottom: '8px',
                    position: 'relative',
                    userSelect: 'none',
                    background: 'rgba(255, 255, 255, 0.75)',
                    padding: '24px 32px 12px 32px',
                    borderRadius: '20px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
                    border: '1px solid rgba(255, 126, 95, 0.2)'
                  }}>
                    <div style={{ letterSpacing: '14px', whiteSpace: 'pre', paddingRight: '8px' }}>
                      {paddedA}
                    </div>
                    <div style={{ 
                      letterSpacing: '14px', 
                      whiteSpace: 'pre',
                      paddingRight: '8px',
                      borderBottom: '4px solid #4a5568', 
                      width: '100%', 
                      textAlign: 'right', 
                      paddingBottom: '16px',
                      marginTop: '8px'
                    }}>
                      <span style={{ position: 'absolute', left: '20px', bottom: '20px', color: '#ff6b4a', fontWeight: 'bold' }}>
                        {question.operator}
                      </span>
                      {paddedB}
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : (
            <VisualAids question={question} />
          )}
        </div>

      </div>
    </div>
  );
}
