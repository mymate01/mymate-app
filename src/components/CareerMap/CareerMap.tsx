"use client";

import React, { useState } from 'react';
import { CareerNode } from '../../data/careerMapData';
import styles from './CareerMap.module.css';

interface CareerMapProps {
  data: CareerNode;
  isRoot?: boolean;
}

export default function CareerMap({ data, isRoot = true }: CareerMapProps) {
  // Root node is expanded by default, others start collapsed
  const [isExpanded, setIsExpanded] = useState(isRoot);

  const hasChildren = data.children && data.children.length > 0;

  const toggleExpand = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className={`${styles.nodeContainer} ${isRoot ? styles.rootContainer : ''}`}>
      <div 
        className={`${styles.node} ${isRoot ? styles.rootNode : ''} ${hasChildren ? styles.clickable : ''} ${isExpanded ? styles.expanded : ''}`}
        onClick={toggleExpand}
      >
        <div className={styles.nodeContent}>
          <h3 className={styles.nodeTitle}>{data.label}</h3>
          {data.description && <p className={styles.nodeDescription}>{data.description}</p>}
        </div>
        {hasChildren && (
          <div className={styles.iconIndicator}>
            {isExpanded ? '−' : '+'}
          </div>
        )}
      </div>

      {hasChildren && (
        <div className={`${styles.childrenContainer} ${isExpanded ? styles.showChildren : ''}`}>
          {data.children!.map((child) => (
            <div key={child.id} className={styles.childWrapper}>
              {/* Connector line */}
              <div className={styles.connector}></div>
              <CareerMap data={child} isRoot={false} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
