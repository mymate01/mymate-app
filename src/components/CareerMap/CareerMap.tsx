"use client";

import React, { useState } from 'react';
import { CareerNode } from '../../data/careerMapData';
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

  const handleBack = () => {
    if (path.length > 1) {
      setPath(path.slice(0, -1));
    }
  };

  const handleCrumbClick = (index: number) => {
    setPath(path.slice(0, index + 1));
  };

  return (
    <div className={styles.mapWrapper}>
      {path.length > 1 && (
        <div className={styles.header}>
          <button className={styles.backButton} onClick={handleBack}>
            ← Back
          </button>
          <div className={styles.breadcrumbs}>
            {path.map((node, idx) => (
              <React.Fragment key={node.id}>
                <span 
                  className={`${styles.crumb} ${idx === path.length - 1 ? styles.crumbActive : ''}`} 
                  onClick={() => handleCrumbClick(idx)}
                >
                  {node.label}
                </span>
                {idx < path.length - 1 && <span className={styles.crumbSeparator}>/</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      <div className={styles.drillDownContainer} key={activeNode.id}>
        <div className={`${styles.node} ${styles.activeNode}`}>
          <div className={styles.nodeContent}>
            <h3 className={styles.nodeTitle}>{activeNode.label}</h3>
            {activeNode.description && <p className={styles.nodeDescription}>{activeNode.description}</p>}
          </div>
        </div>

        {hasChildren && (
          <div className={styles.childrenGrid}>
            {activeNode.children!.map((child) => (
              <div 
                key={child.id} 
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
