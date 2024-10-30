// components/HeroSection/InteractiveHoneycomb.client.tsx

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import HoneycombPiece from './HoneycombPiece.client';
import { GTMStage } from './types';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useSpring, animated } from '@react-spring/three';
import { Environment } from '@react-three/drei';

interface InteractiveHoneycombProps {
  stages: GTMStage[];
  onAllStagesActive: () => void;
}

const InteractiveHoneycomb: React.FC<InteractiveHoneycombProps> = ({
  stages,
  onAllStagesActive,
}) => {
  const [activeStages, setActiveStages] = useState<Set<string>>(new Set());
  const [merged, setMerged] = useState(false);
  const honeycombSize = 7; // Increased size

  useEffect(() => {
    if (activeStages.size === stages.length) {
      setMerged(true);
      onAllStagesActive();
    }
  }, [activeStages, stages.length, onAllStagesActive]);

  const handlePieceClick = (id: string) => {
    setActiveStages((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Arrange honeycombs horizontally with wrapping
  const positions = useMemo(() => {
    const perRow = 3; // Adjusted based on larger size
    const spacingX = honeycombSize * 2.2;
    const spacingY = honeycombSize * 1.9;

    return stages.map((_, index) => {
      const row = Math.floor(index / perRow);
      const col = index % perRow;
      const offsetX = (row % 2) * (spacingX / 2); // Offset every other row
      const x = (col - (perRow - 1) / 2) * spacingX + offsetX;
      const y = -(row * spacingY);
      return [x, y, 0] as [number, number, number];
    });
  }, [honeycombSize, stages.length]);

  // Merge animation
  const mergeProps = useSpring<{ scale: number }>({
    scale: merged ? 0 : 1,
    config: { tension: 200, friction: 50 },
  });

  // Burst effect
  const burstProps = useSpring<{
    scale: number;
    opacity: number;
  }>({
    scale: merged ? 20 : 0,
    opacity: merged ? 0 : 1,
    config: { duration: 800 },
  });

  const cameraZ = honeycombSize * 10;

  return (
    <div className="w-full h-[800px] mx-auto overflow-hidden">
      <Canvas camera={{ position: [0, 0, cameraZ], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />

        {/* Environment for Glassmorphism Effect */}
        <Environment preset="sunset" />

        <EffectComposer>
          <Bloom
            intensity={1.2}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            height={300}
          />
        </EffectComposer>

        {/* Burst Effect */}
        {merged && (
          <animated.mesh scale={burstProps.scale}>
            <sphereBufferGeometry args={[1, 32, 32]} />
            <animated.meshBasicMaterial
              color="#FF6F4F"
              transparent
              opacity={burstProps.opacity}
            />
          </animated.mesh>
        )}

        {/* Honeycomb Pieces */}
        <animated.group scale={mergeProps.scale}>
          {stages.map((stage, index) => (
            <HoneycombPiece
              key={stage.id}
              stage={stage}
              position={positions[index]}
              baseColor="#ffffff"
              borderColor="#FF6F4F"
              isActive={activeStages.has(stage.id)}
              onClick={() => handlePieceClick(stage.id)}
              size={honeycombSize}
            />
          ))}
        </animated.group>
      </Canvas>
    </div>
  );
};

export default InteractiveHoneycomb;
