"use client";

import React, { useState } from 'react';
import { CareerNode } from '../../data/careerMapData';
import CourseInfoPanel from './CourseInfoPanel';
import styles from './CareerMap.module.css';

export default function CareerMap({ data }: { data: CareerNode }) {
  const [path, setPath] = useState<CareerNode[]>([data]);
  
  const activeNode = path[path.length - 1];
  const hasChildren = activeNode.children && activeNode.children.length > 0;

  const handleNodeClick = (child: CareerNode) => {
    if (child.children && child.children.length > 0) {
      setPath([...path, child]);
    }
  };

  const handleCrumbClick = (index: number) => {
    setPath(path.slice(0, index + 1));
  };

  return (
    <div className={styles.mapWrapper}>
      
      {/* Main Content Area */}
      <div className={styles.mainContent}>
        
        {/* Render Active Node and its history path */}
        <div className={styles.activeBranchWrapper} key={activeNode.id}>
          
            {/* Back Button for History */}
            {path.length > 1 && (
              <button 
                className={styles.backButton}
                onClick={() => handleCrumbClick(path.length - 2)}
              >
                ← Back to {path[path.length - 2].label}
              </button>
            )}

            {/* The Active Node */}
            <div className={styles.activeNodePill}>
              {activeNode.label}
            </div>

          {hasChildren && (
            <>
              <div className={styles.activeNodeStem}></div>
              <div className={styles.childrenGrid}>
                  {activeNode.children!.map((child) => (
                    <div key={child.id} className={styles.childNodeWrapper}>
                      <div 
                        className={`${styles.node} ${styles.childNode} ${child.children && child.children.length > 0 ? styles.clickable : ''}`}
                        onClick={() => handleNodeClick(child)}
                      >
                        <div className={styles.nodeContent}>
                          <h3 className={styles.nodeTitle}>{child.label}</h3>
                          {child.description && <p className={styles.nodeDescription}>{child.description}</p>}
                        </div>
                        {child.children && child.children.length > 0 && (
                          <div className={styles.forwardIcon}>→</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

        {/* Detailed tiles render below the tree */}
        <CourseInfoPanel key={activeNode.id} details={activeNode.details} />
      </div>
    </div>
  );
}
