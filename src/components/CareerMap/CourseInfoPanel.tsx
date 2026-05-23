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
    <div className={styles.tilesContainer}>
      <h2 className={styles.panelTitle}>About {title}</h2>

      <div className={styles.grid}>
        {details.about && (
          <div className={`${styles.tile} ${styles.fullWidth}`}>
            <h4>Description</h4>
            <p className={styles.aboutText}>{details.about}</p>
          </div>
        )}

        {details.duration && (
          <div className={styles.tile}>
            <h4>Duration</h4>
            <div className={styles.valueLarge}>{details.duration}</div>
          </div>
        )}

        {details.fees && (
          <div className={styles.tile}>
            <h4>Approx. Fees</h4>
            <div className={styles.valueLarge}>{details.fees}</div>
          </div>
        )}

        {details.subjects && details.subjects.length > 0 && (
          <div className={styles.tile}>
            <h4>Key Subjects</h4>
            <div className={styles.tags}>
              {details.subjects.map(s => <span key={s} className={styles.tagSecondary}>{s}</span>)}
            </div>
          </div>
        )}

        {details.exams && details.exams.length > 0 && (
          <div className={styles.tile}>
            <h4>Entrance Exams</h4>
            <div className={styles.tags}>
              {details.exams.map(e => <span key={e} className={styles.tagPrimary}>{e}</span>)}
            </div>
          </div>
        )}

        {details.colleges && details.colleges.length > 0 && (
          <div className={styles.tile}>
            <h4>Top Institutions</h4>
            <div className={styles.tags}>
              {details.colleges.map(c => <span key={c} className={styles.tagOutline}>{c}</span>)}
            </div>
          </div>
        )}

        {details.jobs && details.jobs.length > 0 && (
          <div className={styles.tile}>
            <h4>Eligible Roles & Jobs</h4>
            <div className={styles.tags}>
              {details.jobs.map(j => <span key={j} className={styles.tagAccent}>{j}</span>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
