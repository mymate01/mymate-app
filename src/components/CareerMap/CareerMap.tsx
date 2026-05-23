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
          
          <div className={styles.activeNodeContainer}>
            
            {/* History path attached to the left */}
            {path.length > 1 && (
              <div className={styles.historyPathLeft}>
                {path.slice(0, -1).map((node, index) => (
                  <React.Fragment key={node.id}>
                    <div 
                      className={styles.historyPill}
                      onClick={() => handleCrumbClick(index)}
                      title="Click to go back"
                    >
                      {node.label}
                    </div>
                    <div className={styles.horizontalStem}></div>
                  </React.Fragment>
                ))}
              </div>
            )}

            {/* The Active Node */}
            <div className={styles.activeNodePill}>
              {activeNode.label}
            </div>
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
