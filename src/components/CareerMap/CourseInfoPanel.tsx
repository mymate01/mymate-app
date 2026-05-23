"use client";

import React, { useState, useEffect } from 'react';
import { CourseDetails } from '../../types/career';
import { supabase } from '../../utils/supabase';
import styles from './CourseInfoPanel.module.css';

interface CourseInfoPanelProps {
  details?: CourseDetails;
}

type TabType = 'about' | 'duration_fees' | 'subjects' | 'exams' | 'colleges' | 'jobs' | 'eligibility';

export default function CourseInfoPanel({ details }: CourseInfoPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType | null>(() => {
    if (!details) return null;
    if (details.about) return 'about';
    if (details.duration || details.fees) return 'duration_fees';
    if (details.subjects && details.subjects.length > 0) return 'subjects';
    if (details.exams && details.exams.length > 0) return 'exams';
    if (details.colleges && details.colleges.length > 0) return 'colleges';
    if (details.jobs && details.jobs.length > 0) return 'jobs';
    if (details.eligibility) return 'eligibility';
    return null;
  });

  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [jobDetail, setJobDetail] = useState<any | null>(null);
  const [loadingJob, setLoadingJob] = useState(false);

  useEffect(() => {
    async function fetchJobDetail() {
      if (!selectedJob) {
        setJobDetail(null);
        return;
      }
      setLoadingJob(true);
      const { data, error } = await supabase
        .from('job_roles')
        .select('*')
        .eq('role_name', selectedJob)
        .single();
        
      if (data && !error) {
        // Map database columns back to camelCase for the component
        setJobDetail({
          description: data.description,
          avgSalary: data.avg_salary,
          skills: data.skills,
          workEnvironment: data.work_environment,
          growthOutlook: data.growth_outlook,
          icon: data.icon
        });
      } else {
        setJobDetail(null);
      }
      setLoadingJob(false);
    }
    fetchJobDetail();
  }, [selectedJob]);

  if (!details) return null;

  return (
    <div className={styles.container}>
      {/* Horizontal Nodes Line */}
      <div className={styles.nodeList}>
        {details.about && (
          <button 
            className={`${styles.navNode} ${activeTab === 'about' ? styles.activeNavNode : ''}`}
            onClick={() => { setActiveTab('about'); setSelectedJob(null); }}
          >
            Description
          </button>
        )}
        {(details.duration || details.fees) && (
          <button 
            className={`${styles.navNode} ${activeTab === 'duration_fees' ? styles.activeNavNode : ''}`}
            onClick={() => { setActiveTab('duration_fees'); setSelectedJob(null); }}
          >
            Duration & Fees
          </button>
        )}
        {details.eligibility && (
          <button 
            className={`${styles.navNode} ${activeTab === 'eligibility' ? styles.activeNavNode : ''}`}
            onClick={() => { setActiveTab('eligibility'); setSelectedJob(null); }}
          >
            Eligibility & Marks
          </button>
        )}
        {details.subjects && details.subjects.length > 0 && (
          <button 
            className={`${styles.navNode} ${activeTab === 'subjects' ? styles.activeNavNode : ''}`}
            onClick={() => { setActiveTab('subjects'); setSelectedJob(null); }}
          >
            Key Subjects
          </button>
        )}
        {details.exams && details.exams.length > 0 && (
          <button 
            className={`${styles.navNode} ${activeTab === 'exams' ? styles.activeNavNode : ''}`}
            onClick={() => { setActiveTab('exams'); setSelectedJob(null); }}
          >
            Entrance Exams
          </button>
        )}
        {details.colleges && details.colleges.length > 0 && (
          <button 
            className={`${styles.navNode} ${activeTab === 'colleges' ? styles.activeNavNode : ''}`}
            onClick={() => { setActiveTab('colleges'); setSelectedJob(null); }}
          >
            Top Institutions
          </button>
        )}
        {details.jobs && details.jobs.length > 0 && (
          <button 
            className={`${styles.navNode} ${activeTab === 'jobs' ? styles.activeNavNode : ''}`}
            onClick={() => { setActiveTab('jobs'); setSelectedJob(null); }}
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

        {activeTab === 'eligibility' && details.eligibility && (
          <div className={styles.animatedContent} key="eligibility">
            <div className={styles.eligibilityPanel}>
              {/* Top row: marks, age */}
              <div className={styles.eligibilityTopRow}>
                {details.eligibility.minMarks && (
                  <div className={styles.eligibilityCard}>
                    <div className={styles.eligibilityIcon}>📝</div>
                    <div className={styles.eligibilityLabel}>Min. Marks (General)</div>
                    <div className={styles.eligibilityValue}>{details.eligibility.minMarks}</div>
                  </div>
                )}
                {details.eligibility.minMarksReserved && (
                  <div className={styles.eligibilityCard}>
                    <div className={styles.eligibilityIcon}>📋</div>
                    <div className={styles.eligibilityLabel}>Min. Marks (Reserved)</div>
                    <div className={styles.eligibilityValue}>{details.eligibility.minMarksReserved}</div>
                  </div>
                )}
                {details.eligibility.ageLimit && (
                  <div className={styles.eligibilityCard}>
                    <div className={styles.eligibilityIcon}>🎂</div>
                    <div className={styles.eligibilityLabel}>Age Limit</div>
                    <div className={styles.eligibilityValue}>{details.eligibility.ageLimit}</div>
                  </div>
                )}
              </div>

              {/* Eligibility description */}
              {details.eligibility.eligibility && (
                <div className={styles.eligibilityDesc}>
                  <strong>Eligibility: </strong>{details.eligibility.eligibility}
                </div>
              )}

              {/* Reservation table */}
              {details.eligibility.reservation && details.eligibility.reservation.length > 0 && (
                <div className={styles.reservationSection}>
                  <h4 className={styles.reservationTitle}>Reservation & Seat Quota</h4>
                  <div className={styles.reservationTable}>
                    <div className={`${styles.reservationRow} ${styles.reservationHeader}`}>
                      <div className={styles.reservationCell}>Category</div>
                      <div className={styles.reservationCell}>Seat Quota</div>
                      <div className={styles.reservationCell}>Marks Relaxation</div>
                    </div>
                    {details.eligibility.reservation.map((r) => (
                      <div key={r.category} className={styles.reservationRow}>
                        <div className={`${styles.reservationCell} ${styles.categoryCell}`}>
                          <span className={styles.categoryBadge} data-category={r.category}>{r.category}</span>
                        </div>
                        <div className={styles.reservationCell}>{r.quota}</div>
                        <div className={styles.reservationCell}>{r.relaxation || '—'}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
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

        {activeTab === 'jobs' && details.jobs && !selectedJob && (
          <div className={styles.animatedContent} key="jobs">
             <div className={styles.tags}>
              {details.jobs.map(j => (
                <button
                  key={j}
                  className={styles.tagAccentClickable}
                  onClick={() => setSelectedJob(j)}
                  title="Click to view role details"
                >
                  {j}
                  <span className={styles.tagArrow}>›</span>
                </button>
              ))}
            </div>
            <p className={styles.clickHint}>Click a role to view details</p>
          </div>
        )}

        {/* Job Role Detail Card */}
        {activeTab === 'jobs' && selectedJob && (
          <div className={styles.animatedContent} key={`job-${selectedJob}`}>
            <div className={styles.jobDetailCard}>
              <button className={styles.jobBackBtn} onClick={() => setSelectedJob(null)}>
                ← Back to all roles
              </button>
              <div className={styles.jobDetailHeader}>
                <div className={styles.jobDetailIcon}>
                  {jobDetail?.icon || '💼'}
                </div>
                <div className={styles.jobDetailHeaderText}>
                  <h3 className={styles.jobDetailTitle}>{selectedJob}</h3>
                  {jobDetail?.avgSalary && (
                    <div className={styles.jobDetailSalary}>
                      💰 Avg. Salary: <strong>{jobDetail.avgSalary}</strong>
                    </div>
                  )}
                </div>
              </div>

              {loadingJob ? (
                <p className={styles.jobDetailDesc}>Loading details...</p>
              ) : jobDetail ? (
                <>
                  <p className={styles.jobDetailDesc}>{jobDetail.description}</p>
                  
                  <div className={styles.jobDetailGrid}>
                    <div className={styles.jobDetailSection}>
                      <h4>🛠️ Key Skills</h4>
                      <div className={styles.jobSkillTags}>
                        {jobDetail.skills.map((s: string) => (
                          <span key={s} className={styles.jobSkillTag}>{s}</span>
                        ))}
                      </div>
                    </div>
                    <div className={styles.jobDetailSection}>
                      <h4>🏢 Work Environment</h4>
                      <p>{jobDetail.workEnvironment}</p>
                    </div>
                    <div className={styles.jobDetailSection}>
                      <h4>📈 Growth Outlook</h4>
                      <p>{jobDetail.growthOutlook}</p>
                    </div>
                  </div>
                </>
              ) : (
                <p className={styles.jobDetailDesc}>
                  Detailed information for this role is being updated. Check back soon!
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
