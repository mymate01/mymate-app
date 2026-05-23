"use client";

import React, { useState } from 'react';
import { CourseDetails } from '../../data/careerMapData';
import styles from './CourseInfoPanel.module.css';

interface CourseInfoPanelProps {
  details?: CourseDetails;
}

type TabType = 'about' | 'duration_fees' | 'subjects' | 'exams' | 'colleges' | 'jobs';

export default function CourseInfoPanel({ details }: CourseInfoPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType | null>(() => {
    if (!details) return null;
    if (details.about) return 'about';
    if (details.duration || details.fees) return 'duration_fees';
    if (details.subjects && details.subjects.length > 0) return 'subjects';
    if (details.exams && details.exams.length > 0) return 'exams';
    if (details.colleges && details.colleges.length > 0) return 'colleges';
    if (details.jobs && details.jobs.length > 0) return 'jobs';
    return null;
  });

  if (!details) return null;

  return (
    <div className={styles.container}>
      {/* Horizontal Nodes Line */}
      <div className={styles.nodeList}>
        {details.about && (
          <button 
            className={`${styles.navNode} ${activeTab === 'about' ? styles.activeNavNode : ''}`}
            onClick={() => setActiveTab('about')}
          >
            Description
          </button>
        )}
        {(details.duration || details.fees) && (
          <button 
            className={`${styles.navNode} ${activeTab === 'duration_fees' ? styles.activeNavNode : ''}`}
            onClick={() => setActiveTab('duration_fees')}
          >
            Duration & Fees
          </button>
        )}
        {details.subjects && details.subjects.length > 0 && (
          <button 
            className={`${styles.navNode} ${activeTab === 'subjects' ? styles.activeNavNode : ''}`}
            onClick={() => setActiveTab('subjects')}
          >
            Key Subjects
          </button>
        )}
        {details.exams && details.exams.length > 0 && (
          <button 
            className={`${styles.navNode} ${activeTab === 'exams' ? styles.activeNavNode : ''}`}
            onClick={() => setActiveTab('exams')}
          >
            Entrance Exams
          </button>
        )}
        {details.colleges && details.colleges.length > 0 && (
          <button 
            className={`${styles.navNode} ${activeTab === 'colleges' ? styles.activeNavNode : ''}`}
            onClick={() => setActiveTab('colleges')}
          >
            Top Institutions
          </button>
        )}
        {details.jobs && details.jobs.length > 0 && (
          <button 
            className={`${styles.navNode} ${activeTab === 'jobs' ? styles.activeNavNode : ''}`}
            onClick={() => setActiveTab('jobs')}
          >
            Eligible Roles
          </button>
        )}
      </div>

      {/* Animated Content Display */}
      <div className={styles.contentArea}>
        {activeTab === 'about' && (
          <div className={styles.animatedContent} key="about">
            <p className={styles.aboutText}>{details.about}</p>
          </div>
        )}

        {activeTab === 'duration_fees' && (
          <div className={`${styles.animatedContent} ${styles.splitContent}`} key="duration_fees">
             {details.duration && (
               <div className={styles.contentBlock}>
                 <h4>Duration</h4>
                 <div className={styles.valueLarge}>{details.duration}</div>
               </div>
             )}
             {details.duration && details.fees && <div className={styles.divider} />}
             {details.fees && (
               <div className={styles.contentBlock}>
                 <h4>Approx. Fees</h4>
                 <div className={styles.valueLarge}>{details.fees}</div>
               </div>
             )}
          </div>
        )}

        {activeTab === 'subjects' && details.subjects && (
          <div className={styles.animatedContent} key="subjects">
            <div className={styles.tags}>
              {details.subjects.map(s => <span key={s} className={styles.tagSecondary}>{s}</span>)}
            </div>
          </div>
        )}

        {activeTab === 'exams' && details.exams && (
          <div className={styles.animatedContent} key="exams">
            <div className={styles.tags}>
              {details.exams.map(e => <span key={e} className={styles.tagPrimary}>{e}</span>)}
            </div>
          </div>
        )}

        {activeTab === 'colleges' && details.colleges && (
          <div className={styles.animatedContent} key="colleges">
             <div className={styles.tags}>
              {details.colleges.map(c => <span key={c} className={styles.tagOutline}>{c}</span>)}
            </div>
          </div>
        )}

        {activeTab === 'jobs' && details.jobs && (
          <div className={styles.animatedContent} key="jobs">
             <div className={styles.tags}>
              {details.jobs.map(j => <span key={j} className={styles.tagAccent}>{j}</span>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
