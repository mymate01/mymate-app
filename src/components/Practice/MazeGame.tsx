'use client';
import React, { useState, useEffect, useRef } from 'react';
import { PracticeQuestion } from '../../types/practice';

interface MazeGameProps {
  question: PracticeQuestion;
  onComplete: (questionId: string, solved: boolean) => void;
}

export default function MazeGame({ question, onComplete }: MazeGameProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const grid = question.mazeGrid;
  if (!grid) return <div>Invalid maze data</div>;

  const rows = grid.length;
  const cols = grid[0].length;
  const cellSize = 40; // pixel size per grid cell
  const charRadius = 12; // hit box

  const [charPos, setCharPos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ beta: 0, gamma: 0 });

  const posRef = useRef({ x: 0, y: 0 });
  const velRef = useRef({ vx: 0, vy: 0 });
  const animRef = useRef<number | null>(null);

  // Find start and end
  useEffect(() => {
    let startX = 0, startY = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (grid[r][c] === 2) {
          startX = c * cellSize + cellSize / 2;
          startY = r * cellSize + cellSize / 2;
        }
      }
    }
    setCharPos({ x: startX, y: startY });
    posRef.current = { x: startX, y: startY };
  }, [grid, cols, rows]);

  const requestPermission = async () => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const permissionState = await (DeviceOrientationEvent as any).requestPermission();
        if (permissionState === 'granted') {
          setHasPermission(true);
          startGame();
        } else {
          alert('Tilt permission denied! You can still play by dragging the character.');
          setHasPermission(true); // Fallback to drag
          startGame();
        }
      } catch (e) {
        console.error(e);
        setHasPermission(true);
        startGame();
      }
    } else {
      // Non-iOS 13+ devices
      setHasPermission(true);
      startGame();
    }
  };

  const startGame = () => {
    setIsPlaying(true);
    setGameWon(false);
  };

  // Device orientation listener
  useEffect(() => {
    if (!isPlaying) return;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      // beta: front-to-back tilt (-180 to 180), gamma: left-to-right tilt (-90 to 90)
      const maxTilt = 30; // limit tilt influence
      let b = e.beta || 0;
      let g = e.gamma || 0;

      // Handle weird flips
      if (b > 90) b = 90;
      if (b < -90) b = -90;

      setTilt({ beta: b, gamma: g });
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [isPlaying]);

  // Physics loop
  useEffect(() => {
    if (!isPlaying || gameWon) return;

    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      // Apply acceleration from tilt
      const accelFactor = 50; // pixels per sec per degree
      velRef.current.vx += tilt.gamma * accelFactor * dt;
      velRef.current.vy += tilt.beta * accelFactor * dt;

      // Friction
      velRef.current.vx *= 0.85;
      velRef.current.vy *= 0.85;

      let nextX = posRef.current.x + velRef.current.vx * dt;
      let nextY = posRef.current.y + velRef.current.vy * dt;

      // Collision detection against walls and boundaries
      const clampX = Math.max(charRadius, Math.min(nextX, cols * cellSize - charRadius));
      const clampY = Math.max(charRadius, Math.min(nextY, rows * cellSize - charRadius));

      // Grid collision
      const checkCollision = (cx: number, cy: number) => {
        const topRow = Math.floor((cy - charRadius) / cellSize);
        const bottomRow = Math.floor((cy + charRadius) / cellSize);
        const leftCol = Math.floor((cx - charRadius) / cellSize);
        const rightCol = Math.floor((cx + charRadius) / cellSize);

        for (let r = topRow; r <= bottomRow; r++) {
          for (let c = leftCol; c <= rightCol; c++) {
            if (r >= 0 && r < rows && c >= 0 && c < cols) {
              if (grid[r][c] === 1) { // Wall
                return true;
              }
              if (grid[r][c] === 3) { // Goal
                setGameWon(true);
                return false; // don't block
              }
            }
          }
        }
        return false;
      };

      // Check X movement
      if (checkCollision(clampX, posRef.current.y)) {
        velRef.current.vx = -velRef.current.vx * 0.3; // bounce
      } else {
        posRef.current.x = clampX;
      }

      // Check Y movement
      if (checkCollision(posRef.current.x, clampY)) {
        velRef.current.vy = -velRef.current.vy * 0.3; // bounce
      } else {
        posRef.current.y = clampY;
      }

      setCharPos({ x: posRef.current.x, y: posRef.current.y });

      if (!gameWon) {
        animRef.current = requestAnimationFrame(loop);
      }
    };

    animRef.current = requestAnimationFrame(loop);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying, tilt, gameWon, cols, rows, grid]);

  // Handle Win
  useEffect(() => {
    if (gameWon) {
      setTimeout(() => {
        onComplete(question.id, true);
      }, 2000);
    }
  }, [gameWon, onComplete, question.id]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
      padding: '20px',
      fontFamily: "'Nunito', sans-serif"
    }}>
      
      {!isPlaying ? (
        <div style={{
          textAlign: 'center',
          background: '#e6fffa',
          padding: '30px',
          borderRadius: '24px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          maxWidth: '400px'
        }}>
          <h2 style={{ color: '#2d3748', margin: '0 0 16px 0', fontSize: '1.5rem' }}>Landscape Maze 🌳</h2>
          <p style={{ color: '#4a5568', marginBottom: '24px', fontSize: '1.1rem' }}>
            Tilt your phone to guide the scout to the campsite! Avoid the trees!
          </p>
          <button
            onClick={requestPermission}
            style={{
              padding: '14px 32px',
              fontSize: '1.2rem',
              borderRadius: '16px',
              border: 'none',
              background: 'linear-gradient(135deg, #38b2ac 0%, #319795 100%)',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 800,
              boxShadow: '0 4px 12px rgba(49,151,149,0.3)',
              transition: 'transform 0.2s ease'
            }}
          >
            Start Expedition 🏕️
          </button>
        </div>
      ) : (
        <>
          <div style={{
            position: 'relative',
            width: `${cols * cellSize}px`,
            height: `${rows * cellSize}px`,
            background: '#a8e6cf', // Grass background
            borderRadius: '16px',
            boxShadow: '-15px 25px 25px rgba(0,0,0,0.25), inset 0 0 20px rgba(0,0,0,0.1)',
            border: '6px solid #82c8a0',
            transform: 'rotateX(55deg) rotateZ(45deg)',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.5s ease',
            margin: '40px auto'
          }}>
            {/* Draw Maze */}
            {grid.map((row, r) => (
              row.map((cell, c) => {
                const x = c * cellSize;
                const y = r * cellSize;
                
                if (cell === 1 || cell === 4 || cell === 6) {
                  const icon = cell === 1 ? '🌲' : cell === 4 ? '⛰️' : '🛖';
                  const size = cell === 4 ? '42px' : '32px'; // mountains are bigger
                  
                  return (
                    <div key={`${r}-${c}`} style={{
                      position: 'absolute',
                      left: x,
                      top: y,
                      width: cellSize,
                      height: cellSize,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: size,
                      transform: 'translateZ(10px) rotateZ(-45deg) rotateX(-55deg)',
                      transformOrigin: 'bottom center',
                      textShadow: '0 10px 10px rgba(0,0,0,0.4)',
                      zIndex: 10
                    }}>
                      {icon}
                    </div>
                  );
                } else if (cell === 5) {
                   // River
                   return (
                     <div key={`${r}-${c}`} style={{
                       position: 'absolute',
                       left: x,
                       top: y,
                       width: cellSize,
                       height: cellSize,
                       background: '#4299e1',
                       borderRadius: '8px',
                       boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)'
                     }}>
                       <div style={{ width: '100%', height: '100%', opacity: 0.3, backgroundImage: 'radial-gradient(#fff 2px, transparent 2px)', backgroundSize: '10px 10px', animation: 'riverFlow 3s linear infinite' }} />
                     </div>
                   );
                } else if (cell === 0 || cell === 2) {
                  // Dirt Path
                  return (
                    <div key={`${r}-${c}`} style={{
                      position: 'absolute',
                      left: x,
                      top: y,
                      width: cellSize,
                      height: cellSize,
                      background: '#f4d160',
                      borderRadius: '50%', // very curvy
                      boxShadow: 'inset 0 0 5px rgba(0,0,0,0.05)'
                    }} />
                  );
                } else if (cell === 3) {
                  // Tent Goal
                  return (
                    <div key={`${r}-${c}`} style={{
                      position: 'absolute',
                      left: x,
                      top: y,
                      width: cellSize,
                      height: cellSize,
                      background: '#f4d160',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '32px',
                      transform: 'translateZ(10px) rotateZ(-45deg) rotateX(-55deg)',
                      transformOrigin: 'bottom center',
                      textShadow: '0 10px 10px rgba(0,0,0,0.4)',
                      zIndex: 10
                    }}>
                      ⛺
                    </div>
                  );
                }
                return null;
              })
            ))}

            {/* Player Character */}
            <div style={{
              position: 'absolute',
              left: charPos.x - charRadius * 1.5,
              top: charPos.y - charRadius * 1.5,
              width: charRadius * 3,
              height: charRadius * 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end',
              zIndex: 20,
              transform: `translateZ(10px) rotateZ(-45deg) rotateX(-55deg) scaleX(${velRef.current.vx < -0.5 ? -1 : 1}) rotateZ(${(Math.abs(velRef.current.vx) > 0.5 || Math.abs(velRef.current.vy) > 0.5) ? 15 : 0}deg)`,
              transformOrigin: 'bottom center',
              transition: 'transform 0.1s linear',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', animation: (Math.abs(velRef.current.vx) > 0.5 || Math.abs(velRef.current.vy) > 0.5) ? 'walkWobble 0.3s alternate infinite' : 'none' }}>
                {/* Head */}
                <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#ffb38a', marginBottom: '2px', boxShadow: 'inset -2px -2px rgba(0,0,0,0.1)' }} />
                {/* Torso & Arms */}
                <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', zIndex: 2 }}>
                  <div style={{ position: 'absolute', left: '-5px', top: '2px', width: '5px', height: '13px', background: '#ffb38a', borderRadius: '3px', transformOrigin: 'top center', animation: (Math.abs(velRef.current.vx) > 0.5 || Math.abs(velRef.current.vy) > 0.5) ? 'swingArm 0.3s alternate-reverse infinite' : 'none' }} />
                  <div style={{ width: '16px', height: '18px', background: '#4299e1', borderRadius: '6px', boxShadow: 'inset -2px -2px rgba(0,0,0,0.1)' }} />
                  <div style={{ position: 'absolute', right: '-5px', top: '2px', width: '5px', height: '13px', background: '#ffb38a', borderRadius: '3px', transformOrigin: 'top center', animation: (Math.abs(velRef.current.vx) > 0.5 || Math.abs(velRef.current.vy) > 0.5) ? 'swingArm 0.3s alternate infinite' : 'none' }} />
                </div>
                {/* Legs */}
                <div style={{ display: 'flex', gap: '4px', marginTop: '-4px', zIndex: 1 }}>
                   <div style={{ width: '6px', height: '12px', background: '#2b6cb0', borderRadius: '3px', animation: (Math.abs(velRef.current.vx) > 0.5 || Math.abs(velRef.current.vy) > 0.5) ? 'swingLeg 0.3s alternate infinite' : 'none' }} />
                   <div style={{ width: '6px', height: '12px', background: '#2b6cb0', borderRadius: '3px', animation: (Math.abs(velRef.current.vx) > 0.5 || Math.abs(velRef.current.vy) > 0.5) ? 'swingLeg 0.3s alternate-reverse infinite' : 'none' }} />
                </div>
              </div>
            </div>
          </div>
          
          <div style={{ fontSize: '0.9rem', color: '#718096', display: 'flex', gap: '20px' }}>
            <span>Tilt phone to move</span>
            <span>Beta: {Math.round(tilt.beta)}°</span>
            <span>Gamma: {Math.round(tilt.gamma)}°</span>
          </div>
        </>
      )}

      {gameWon && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(255,255,255,0.9)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          animation: 'bounceIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}>
          <span style={{ fontSize: '6rem' }}>🎉⛺🎉</span>
          <h2 style={{ fontSize: '2.5rem', color: '#ff6b4a', margin: '20px 0' }}>Camp Reached!</h2>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); }
        }
        @keyframes walkWobble {
          0% { margin-bottom: 0px; margin-left: -2px; }
          100% { margin-bottom: 6px; margin-left: 2px; }
        }
        @keyframes swingLeg {
          0% { transform: rotate(35deg); transform-origin: top center; }
          100% { transform: rotate(-35deg); transform-origin: top center; }
        }
        @keyframes swingArm {
          0% { transform: rotate(40deg); transform-origin: top center; }
          100% { transform: rotate(-40deg); transform-origin: top center; }
        }
        @keyframes riverFlow {
          0% { background-position: 0 0; }
          100% { background-position: 20px 20px; }
        }
      `}} />
    </div>
  );
}
