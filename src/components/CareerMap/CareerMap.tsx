"use client";

import React, { useState, useEffect } from 'react';
import { CareerNode } from '../../data/careerMapData';
import CourseInfoPanel from './CourseInfoPanel';
import styles from './CareerMap.module.css';

export default function CareerMap({ data }: { data: CareerNode }) {
  const [path, setPath] = useState<CareerNode[]>([data]);
  
  // Drag state for sidebar
  const [sidebarPos, setSidebarPos] = useState({ x: 20, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Only run on client to avoid hydration mismatch with window
  useEffect(() => {
    // Initial position could be adjusted here if needed
  }, []);

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

  // Drag handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - sidebarPos.x, y: e.clientY - sidebarPos.y });
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      setSidebarPos({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div className={styles.mapWrapper}>
      
      {/* Draggable Sidebar: Vertical Path Map */}
      {path.length > 1 && (
        <div 
          className={styles.draggableSidebar}
          style={{ left: `${sidebarPos.x}px`, top: `${sidebarPos.y}px`, cursor: isDragging ? 'grabbing' : 'grab' }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div className={styles.dragHandle}>
            <span className={styles.dragIcon}>⋮⋮</span>
            Drag to move
          </div>
          <button className={styles.backButton} onClick={handleBack}>
            ← Go Back
          </button>
          
          <div className={styles.verticalMap}>
            {path.map((node, idx) => {
              const isActive = idx === path.length - 1;
              return (
                <div key={node.id} className={styles.pathStep}>
                  <div className={styles.stepMarker}>
                    <div className={`${styles.dot} ${isActive ? styles.dotActive : ''}`}></div>
                    {idx < path.length - 1 && <div className={styles.verticalLine}></div>}
                  </div>
                  <div 
                    className={`${styles.stepContent} ${isActive ? styles.stepActive : ''}`}
                    onClick={() => handleCrumbClick(idx)}
                  >
                    <span className={styles.stepTitle}>{node.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className={styles.mainContent}>
        <div className={styles.drillDownContainer} key={activeNode.id}>
          <div className={styles.activeNodeWrapper}>
            <div className={`${styles.node} ${styles.activeNode}`}>
              <div className={styles.nodeContent}>
                <h3 className={styles.nodeTitle}>{activeNode.label}</h3>
                {activeNode.description && <p className={styles.nodeDescription}>{activeNode.description}</p>}
              </div>
            </div>
            {hasChildren && <div className={styles.activeNodeStem}></div>}
          </div>

          {hasChildren && (
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
          )}
        </div>

        {/* Detailed tiles render below the tree */}
        <CourseInfoPanel details={activeNode.details} title={activeNode.label} />
      </div>
    </div>
  );
}
