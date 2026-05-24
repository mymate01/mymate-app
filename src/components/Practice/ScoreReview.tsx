'use client';

import React from 'react';
import styles from '../../app/practice/practice.module.css';
import { PracticeModule } from '../../types/practice';
import Abacus from './Abacus';
import FractionShapes from './FractionShapes';

interface ScoreReviewProps {
  selectedModule: PracticeModule;
  finalScores: boolean[];
  quizAnswers: Record<string, string | number>;
  timeTakenSeconds: number;
  onDone: () => void;
}

export default function ScoreReview({
  selectedModule,
  finalScores,
  quizAnswers,
  timeTakenSeconds,
  onDone
}: ScoreReviewProps) {
  const correctCount = finalScores.filter(Boolean).length;
  const totalQuestions = selectedModule.questions.length;
  const accuracy = Math.round((correctCount / totalQuestions) * 100);

  let ratingTitle = '';
  let ratingIcon = '🎉';
  let ratingMsg = '';

  if (accuracy === 100) {
    ratingTitle = 'Perfect Wizard! 🧙‍♂️';
    ratingIcon = '👑';
    ratingMsg = 'You answered every single reasoning puzzle correctly. Outstanding logic skills!';
  } else if (accuracy >= 75) {
    ratingTitle = 'Awesome Job! 🌟';
    ratingIcon = '🏆';
    ratingMsg = 'Incredible math reasoning and verbal skills! You are extremely close to a perfect score.';
  } else {
    ratingTitle = 'Super Try! 👍';
    ratingIcon = '🎈';
    ratingMsg = 'Great effort! Practice makes perfect. Try solving it again to get more stars!';
  }

  return (
    <div className={styles.scoreWrapper} style={{ maxWidth: '850px' }}>
      <div className={`${styles.bgOrb} ${styles.orb1}`} />
      <div className={`${styles.bgOrb} ${styles.orb2}`} />

      {/* Score Summary Card */}
      <div className={styles.scoreCard} style={{ padding: '36px', marginBottom: '40px' }}>
        <span className={styles.trophy}>{ratingIcon}</span>
        <h2 className={styles.reviewTitle}>{ratingTitle}</h2>
        <p className={styles.reviewMsg}>{ratingMsg}</p>

        <div className={styles.scoreDashboard}>
          <div className={styles.scoreStatItem}>
            <p className={styles.scoreStatTitle}>Score</p>
            <p className={styles.scoreStatValue}>
              {correctCount} / {totalQuestions}
            </p>
          </div>
          <div className={styles.scoreStatItem}>
            <p className={styles.scoreStatTitle}>Accuracy</p>
            <p className={styles.scoreStatValue}>{accuracy}%</p>
          </div>
          <div className={styles.scoreStatItem}>
            <p className={styles.scoreStatTitle}>Time</p>
            <p className={styles.scoreStatValue}>{timeTakenSeconds}s</p>
          </div>
        </div>

        <button
          type="button"
          className={styles.doneBtn}
          onClick={onDone}
          style={{ maxWidth: '300px' }}
        >
          Back to Dashboard 🏠
        </button>
      </div>

      {/* SCROLLABLE REVIEW LIST */}
      <h2 className={styles.gridTitle}>Review your Answers 📝</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {selectedModule.questions.map((q, index) => {
          const isCorrect = finalScores[index];
          const userAnswer = quizAnswers[q.id];
          
          // Resolve readable displays for answers
          let userDisplay = 'No answer';
          let correctDisplay = '';

          if (q.subject === 'maths_additions' || q.subject === 'maths_subtractions') {
            userDisplay = userAnswer !== undefined ? userAnswer.toString() : 'No answer';
            correctDisplay = q.correctAnswer !== undefined ? q.correctAnswer.toString() : '';
          } else if (q.type === 'mcq' && q.options) {
            userDisplay = (userAnswer !== undefined && q.options[Number(userAnswer)] !== undefined)
              ? q.options[Number(userAnswer)]
              : (userAnswer !== undefined ? userAnswer.toString() : 'No answer');
            correctDisplay = q.options[Number(q.correctAnswer)] || (q.correctAnswer !== undefined ? q.correctAnswer.toString() : '');
          } else {
            userDisplay = userAnswer !== undefined ? `${userAnswer}` : 'No answer';
            correctDisplay = q.correctAnswer !== undefined ? `${q.correctAnswer}` : '';
          }

          return (
            <div
              key={q.id}
              style={{
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(8px)',
                border: isCorrect ? '2px solid #bbf7d0' : '2px solid #fecaca',
                borderRadius: '24px',
                padding: '28px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '24px'
              }}
            >
              {/* Header indicators */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 800, color: '#ff6b4a', fontSize: '0.9rem', textTransform: 'uppercase' }}>
                  Question {index + 1}
                </span>
                <span
                  style={{
                    background: isCorrect ? '#dcfce7' : '#fee2e2',
                    color: isCorrect ? '#166534' : '#991b1b',
                    padding: '4px 12px',
                    borderRadius: '8px',
                    fontWeight: 800,
                    fontSize: '0.85rem'
                  }}
                >
                  {isCorrect ? '✔️ Correct' : '❌ Incorrect'}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                
                {/* Left Column of item review */}
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#2d3748', margin: '0 0 16px 0', lineHeight: 1.4 }}>
                    {q.questionText}
                  </h3>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '16px' }}>
                    <div style={{ background: '#f7fafc', border: '1px solid #edf2f7', padding: '10px 16px', borderRadius: '12px' }}>
                      <span style={{ fontSize: '0.8rem', color: '#718096', fontWeight: 600 }}>Your Answer:</span>
                      <p style={{ margin: '4px 0 0 0', fontWeight: 800, color: isCorrect ? '#2f855a' : '#c53030' }}>
                        {userDisplay}
                      </p>
                    </div>
                    <div style={{ background: '#f7fafc', border: '1px solid #edf2f7', padding: '10px 16px', borderRadius: '12px' }}>
                      <span style={{ fontSize: '0.8rem', color: '#718096', fontWeight: 600 }}>Correct Answer:</span>
                      <p style={{ margin: '4px 0 0 0', fontWeight: 800, color: '#2f855a' }}>
                        {correctDisplay}
                      </p>
                    </div>
                  </div>

                  <div className={styles.explanationBox} style={{ margin: 0, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <div className={styles.expHeader} style={{ color: '#475569' }}>
                      <span>💡</span> Explanation
                    </div>
                    <p className={styles.expContent} style={{ color: '#334155' }}>{q.explanation}</p>
                  </div>
                </div>

                {/* Right Column: Visual verification widget in readOnly mode with correct values so they learn! */}
                {(q.type === 'abacus_count' || q.type === 'mcq' && q.subject === 'abacus') && (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f8fafc', padding: '16px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                    <Abacus
                      value={Number(q.correctAnswer)}
                      readOnly={true}
                      showNumbers={true} // Display numbers in review so they see place value math!
                      title="Correct Bead Representation:"
                    />
                  </div>
                )}

                {q.type === 'fraction_shading' && (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f8fafc', padding: '16px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                    <FractionShapes
                      value={Number(q.correctAnswer)}
                      shape={q.shapeType || 'circle'}
                      totalSegments={q.fractionTotalSegments || 4}
                      readOnly={true}
                      title="Correct Shading Representation:"
                    />
                  </div>
                )}

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
