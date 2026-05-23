"use client";

import React, { useState, useEffect } from 'react';
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
        
        <div className={styles.horizontalPathContainer}>
          {/* Render all history nodes in a horizontal line */}
          {path.slice(0, -1).map((node, index) => (
            <React.Fragment key={node.id}>
              <div className={styles.historyNodeWrapper}>
                <div 
                  className={`${styles.node} ${styles.historyNode}`}
                  onClick={() => handleCrumbClick(index)}
                  title="Click to go back"
                >
                  <div className={styles.nodeContent}>
                    <h3 className={styles.nodeTitle}>{node.label}</h3>
                  </div>
                </div>
              </div>
              <div className={styles.horizontalStem}></div>
            </React.Fragment>
          ))}

          {/* Render Active Node and its children */}
          <div className={styles.activeBranchWrapper} key={activeNode.id}>
            <div className={`${styles.node} ${styles.activeNode}`}>
              <div className={styles.nodeContent}>
                <h3 className={styles.nodeTitle}>{activeNode.label}</h3>
                {activeNode.description && <p className={styles.nodeDescription}>{activeNode.description}</p>}
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
        </div>

        {/* Detailed tiles render below the tree */}
        <CourseInfoPanel key={activeNode.id} details={activeNode.details} />
      </div>
    </div>
  );
}
