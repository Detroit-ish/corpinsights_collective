/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
'use client';

import React, { useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import HoneycombPiece from './HoneycombPiece.client';
import { GTMStage } from './types';
import styles from './InteractiveHoneycomb.module.css';

interface InteractiveHoneycombProps {
  stages: GTMStage[];
  onAllStagesActive: () => void;
  honeycombSize?: number;
}

const InteractiveHoneycomb: React.FC<InteractiveHoneycombProps> = ({ 
  stages, 
  onAllStagesActive,
  honeycombSize = 1.8
}) => {
  const [activeStages, setActiveStages] = useState<Set<string>>(new Set());

  const handlePieceClick = useCallback((id: string) => {
    setActiveStages((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      if (newSet.size === stages.length) {
        onAllStagesActive();
      }
      return newSet;
    });
  }, [stages.length, onAllStagesActive]);

  const calculatePosition = useCallback((index: number): [number, number, number] => {
    const hexRadius = honeycombSize * 1.3; // Increased from 1.1 to 1.3
    const positions: [number, number, number][] = [
      [0, 2.2 * hexRadius, 0],  // Top
      [-1.9 * hexRadius, 1.1 * hexRadius, 0],  // Top-left
      [-1.9 * hexRadius, -1.1 * hexRadius, 0],  // Bottom-left
      [0, -2.2 * hexRadius, 0],  // Bottom
      [1.9 * hexRadius, -1.1 * hexRadius, 0],  // Bottom-right
      [1.9 * hexRadius, 1.1 * hexRadius, 0],  // Top-right
      [0, 0, 0]  // Center
    ];
    
    return positions[index % positions.length];
  }, [honeycombSize]);

  return (
    <div className={styles.canvasContainer}>
      <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        {stages.map((stage, index) => (
          <HoneycombPiece
            key={stage.id}
            stage={stage}
            position={calculatePosition(index)}
            color="#007373"
            borderColor="#FF6F4F"
            isActive={activeStages.has(stage.id)}
            onClick={() => handlePieceClick(stage.id)}
            size={honeycombSize}
          />
        ))}
      </Canvas>
    </div>
  );
};

export default InteractiveHoneycomb;