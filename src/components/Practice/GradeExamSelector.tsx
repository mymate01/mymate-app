'use client';

import React from 'react';
import styles from '../../app/practice/practice.module.css';

interface GradeExamSelectorProps {
  onSelectGrade: (grade: number) => void;
  onShowComingSoon: (title: string) => void;
}

export default function GradeExamSelector({
  onSelectGrade,
  onShowComingSoon
}: GradeExamSelectorProps) {
  const grades = [
    { num: 1, label: '1st Grade', icon: '🎒', categories: ['Maths', 'Abacus', 'English', 'Fractions'] },
    { num: 2, label: '2nd Grade', icon: '📚', categories: ['Arithmetic', 'Science', 'Reading', 'Writing'] },
    { num: 3, label: '3rd Grade', icon: '✏️', categories: ['Multiplication', 'Science', 'Grammar', 'Logic'] },
    { num: 4, label: '4th Grade', icon: '🎨', categories: ['Fractions', 'Earth Sci', 'Vocabulary', 'GK'] },
    { num: 5, label: '5th Grade', icon: '🧪', categories: ['Decimals', 'Human Body', 'Literature', 'Tech'] },
    { num: 6, label: '6th Grade', icon: '📐', categories: ['Pre-Algebra', 'Physics', 'History', 'Coding'] },
    { num: 7, label: '7th Grade', icon: '🧬', categories: ['Algebra', 'Chemistry', 'World History', 'Coding'] },
    { num: 8, label: '8th Grade', icon: '🪐', categories: ['Geometry', 'Biology', 'Civics', 'Python'] },
    { num: 9, label: '9th Grade', icon: '💻', categories: ['Trigonometry', 'Physics', 'Literature', 'AI'] },
    { num: 10, label: '10th Grade', icon: '🎓', categories: ['Calculus', 'Chemistry', 'Civics', 'Web Dev'] },
  ];

  const exams = [
    { name: 'UPSC CSE', icon: '🏛️', categories: ['History', 'Polity', 'Geography', 'CSAT'] },
    { name: 'SSC CGL', icon: '📊', categories: ['Quants', 'Reasoning', 'English', 'GK'] },
    { name: 'IBPS PO', icon: '💰', categories: ['Quants', 'Reasoning', 'Banking', 'English'] },
    { name: 'IIT JEE', icon: '🚀', categories: ['Maths', 'Physics', 'Chemistry'] },
    { name: 'NEET UG', icon: '🩺', categories: ['Physics', 'Chemistry', 'Biology'] },
    { name: 'CAT Exam', icon: '📈', categories: ['Quants', 'DILR', 'VARC'] },
  ];

  const renderGradeCard = (grade: typeof grades[0], uniqueId: string) => (
    <div key={uniqueId} className={styles.gradeSelectCard}>
      <div className={styles.cardIcon}>{grade.icon}</div>
      <h3 className={styles.cardTitle}>{grade.label}</h3>
      <div className={styles.categoryBadgeContainer}>
        {grade.categories.map((c, i) => (
          <span key={i} className={styles.categoryBadge}>{c}</span>
        ))}
      </div>
      <button 
        type="button" 
        className={styles.testSkillBtn}
        onClick={() => {
          if (grade.num === 1) {
            onSelectGrade(1);
          } else {
            onShowComingSoon(grade.label);
          }
        }}
      >
        Test your skill
      </button>
    </div>
  );

  const renderExamCard = (exam: typeof exams[0], uniqueId: string) => (
    <div key={uniqueId} className={styles.gradeSelectCard}>
      <div className={styles.cardIcon}>{exam.icon}</div>
      <h3 className={styles.cardTitle}>{exam.name}</h3>
      <div className={styles.categoryBadgeContainer}>
        {exam.categories.map((c, i) => (
          <span key={i} className={styles.categoryBadge}>{c}</span>
        ))}
      </div>
      <button 
        type="button" 
        className={styles.testSkillBtn}
        onClick={() => onShowComingSoon(exam.name)}
      >
        Test your skill
      </button>
    </div>
  );

  return (
    <div className={styles.dashboardWrapper} style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', paddingBottom: '20px' }}>
      <div className={`${styles.bgOrb} ${styles.orb1}`} />
      <div className={`${styles.bgOrb} ${styles.orb2}`} />

      <div className={styles.selectorHeader}>
        <h1 className={styles.selectorTitle}>Choose your grade and Test your skills</h1>
        <p className={styles.selectorSubtitle}>Select your grade or competitive exam to begin customized practice sessions.</p>
      </div>

      {/* Row 1: Grades */}
      <div className={styles.rowSection}>
        <h2 className={styles.rowTitle}>
          <span>🏫</span> School Curriculum (Grades 1 - 10)
        </h2>
        <div className={styles.marqueeContainer}>
          <div className={styles.marqueeTrack}>
            {grades.map((grade) => renderGradeCard(grade, `g-first-${grade.num}`))}
            {grades.map((grade) => renderGradeCard(grade, `g-second-${grade.num}`))}
          </div>
        </div>
      </div>

      {/* Row 2: Competitive Exams */}
      <div className={styles.rowSection} style={{ marginBottom: 0 }}>
        <h2 className={styles.rowTitle}>
          <span>🏆</span> Competitive Exams
        </h2>
        <div className={styles.marqueeContainer}>
          <div className={styles.marqueeTrack}>
            {exams.map((exam) => renderExamCard(exam, `e-first-${exam.name}`))}
            {exams.map((exam) => renderExamCard(exam, `e-second-${exam.name}`))}
          </div>
        </div>
      </div>
    </div>
  );
}
