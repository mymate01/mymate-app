import React from 'react';
import { CourseDetails } from '../../data/careerMapData';
import styles from './CourseInfoPanel.module.css';

interface CourseInfoPanelProps {
  details?: CourseDetails;
  title: string;
}

export default function CourseInfoPanel({ details, title }: CourseInfoPanelProps) {
  if (!details) return null;

  return (
    <div className={styles.panel}>
      <h2 className={styles.title}>About {title}</h2>
      
      {details.about && (
        <p className={styles.about}>{details.about}</p>
      )}

      <div className={styles.grid}>
        {details.duration && (
          <div className={styles.card}>
            <h4>Duration</h4>
            <p>{details.duration}</p>
          </div>
        )}
        
        {details.fees && (
          <div className={styles.card}>
            <h4>Approx. Fees</h4>
            <p>{details.fees}</p>
          </div>
        )}

        {details.subjects && details.subjects.length > 0 && (
          <div className={styles.card}>
            <h4>Key Subjects</h4>
            <div className={styles.tags}>
              {details.subjects.map(s => <span key={s} className={styles.tag}>{s}</span>)}
            </div>
          </div>
        )}

        {details.exams && details.exams.length > 0 && (
          <div className={styles.card}>
            <h4>Entrance Exams</h4>
            <div className={styles.tags}>
              {details.exams.map(e => <span key={e} className={styles.tag}>{e}</span>)}
            </div>
          </div>
        )}

        {details.colleges && details.colleges.length > 0 && (
          <div className={`${styles.card} ${styles.fullWidth}`}>
            <h4>Top Institutions</h4>
            <div className={styles.tags}>
              {details.colleges.map(c => <span key={c} className={styles.tagPrimary}>{c}</span>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
