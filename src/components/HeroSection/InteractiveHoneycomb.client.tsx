// components/HeroSection/InteractiveHoneycomb.client.tsx

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import HoneycombPiece from './HoneycombPiece.client';
import { GTMStage } from './types';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useSpring, animated, SpringValue } from '@react-spring/three';

interface InteractiveHoneycombProps {
  stages: GTMStage[];
  onAllStagesActive: () => void;
  honeycombSize?: number;
}

const InteractiveHoneycomb: React.FC<InteractiveHoneycombProps> = ({
  stages,
  onAllStagesActive,
  honeycombSize = 1.8,
}) => {
  const [activeStages, setActiveStages] = useState<Set<string>>(new Set());
  const [merged, setMerged] = useState(false);

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

  const positions = useMemo(() => {
    const hexRadius = honeycombSize * 1.5;
    const positionsArray: [number, number, number][] = [
      [0, 2.6 * hexRadius, 0], // Top
      [-2.2 * hexRadius, 1.3 * hexRadius, 0], // Top-left
      [-2.2 * hexRadius, -1.3 * hexRadius, 0], // Bottom-left
      [0, -2.6 * hexRadius, 0], // Bottom
      [2.2 * hexRadius, -1.3 * hexRadius, 0], // Bottom-right
      [2.2 * hexRadius, 1.3 * hexRadius, 0], // Top-right
      [0, 0, 0], // Center
    ];
    return positionsArray.slice(0, stages.length);
  }, [honeycombSize, stages.length]);

  // Merge animation
  const mergeProps = useSpring<{ scale: [number, number, number] }>({
    scale: merged ? [0, 0, 0] : [1, 1, 1],
    config: { tension: 200, friction: 50 },
  });

  // Burst effect
  const burstProps = useSpring<{
    scale: [number, number, number];
    opacity: number;
  }>({
    scale: merged ? [50, 50, 50] : [0, 0, 0],
    opacity: merged ? 0 : 1,
    config: { duration: 500 },
  });

  return (
    <div className="w-full h-[500px] max-w-[800px] mx-auto my-8 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-white to-gray-100">
      <Canvas camera={{ position: [0, 0, 25], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 20, 10]} intensity={1} />
        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            height={300}
          />
        </EffectComposer>

        {/* Burst Effect */}
        {merged && (
          <animated.mesh scale={burstProps.scale}>
            <animated.sphereBufferGeometry args={[1, 32, 32]} />
            <animated.meshBasicMaterial
              color="#FFFFFF"
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
              baseColor="#2b3a42"
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
