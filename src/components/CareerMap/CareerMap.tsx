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
    setPath([...path, child]);
  };

  const handleCrumbClick = (index: number) => {
    setPath(path.slice(0, index + 1));
  };

  const containerRef = React.useRef<HTMLDivElement>(null);
  const activeNodeRef = React.useRef<HTMLDivElement>(null);
  const bodyRef = React.useRef<HTMLDivElement>(null);
  const [lineCoords, setLineCoords] = useState<{ x1: number, y1: number, x2: number, y2: number } | null>(null);

  const updateLine = () => {
    if (containerRef.current && activeNodeRef.current && bodyRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const nodeRect = activeNodeRef.current.getBoundingClientRect();
      const bodyRect = bodyRef.current.getBoundingClientRect();

      setLineCoords({
        x1: nodeRect.left + nodeRect.width / 2 - containerRect.left,
        y1: nodeRect.bottom - containerRect.top,
        x2: bodyRect.left + bodyRect.width / 2 - containerRect.left,
        y2: bodyRect.top - containerRect.top
      });
    }
  };

  React.useEffect(() => {
    updateLine();
    window.addEventListener('resize', updateLine);
    // Slight delay to allow DOM/fonts to settle
    const timeout = setTimeout(updateLine, 50);
    return () => {
      window.removeEventListener('resize', updateLine);
      clearTimeout(timeout);
    };
  }, [path]);

  return (
    <div className={styles.mapWrapper}>
      
      {/* Main Content Area */}
      <div className={styles.mainContent} ref={containerRef}>
        
        {/* SVG Overlay for curved line */}
        {lineCoords && hasChildren && (
          <svg className={styles.svgOverlay}>
            <path 
              d={`M ${lineCoords.x1} ${lineCoords.y1} C ${lineCoords.x1} ${(lineCoords.y1 + lineCoords.y2) / 2}, ${lineCoords.x2} ${(lineCoords.y1 + lineCoords.y2) / 2}, ${lineCoords.x2} ${lineCoords.y2}`} 
              stroke="rgba(255, 107, 107, 0.4)" 
              strokeWidth="2" 
              fill="none" 
            />
          </svg>
        )}

        {/* Top Level: All nodes in the path */}
        <div className={styles.topRow}>
          {path.map((node, index) => {
            const isActive = index === path.length - 1;
            return (
              <React.Fragment key={node.id}>
                <div 
                  className={isActive ? styles.activeNodePill : styles.historyPill}
                  onClick={() => !isActive && handleCrumbClick(index)}
                  ref={isActive ? activeNodeRef : null}
                >
                  {node.label}
                </div>
                {!isActive && <div className={styles.horizontalStem}></div>}
              </React.Fragment>
            );
          })}
        </div>

        {/* Main Body Flow (Children Tree) */}
        <div className={styles.mainBodyFlow}>
          {hasChildren && (
            <div className={styles.childrenArea}>
              <div className={styles.childrenGrid} ref={bodyRef}>
                  {activeNode.children!.map((child) => (
                    <div key={child.id} className={styles.childNodeWrapper}>
                      <div 
                        className={`${styles.node} ${styles.childNode} ${styles.clickable}`}
                        onClick={() => handleNodeClick(child)}
                      >
                        <div className={styles.nodeContent}>
                          <h3 className={styles.nodeTitle}>{child.label}</h3>
                          {child.description && <p className={styles.nodeDescription}>{child.description}</p>}
                        </div>
                        {child.children && child.children.length > 0 && (
                          <div className={styles.forwardIcon}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M6 9l6 6 6-6"/>
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Detailed tiles render strictly below the entire tree */}
        <CourseInfoPanel key={`panel-${activeNode.id}`} details={activeNode.details} />
      </div>
    </div>
  );
}
