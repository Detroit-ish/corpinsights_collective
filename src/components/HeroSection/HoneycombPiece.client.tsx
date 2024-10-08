// components/HeroSection/HoneycombPiece.client.tsx

'use client';

import React, { useRef, useState } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { GTMStage } from './types';

// Extend R3F to include ExtrudeGeometry
extend({ ExtrudeGeometry: THREE.ExtrudeGeometry });

interface HoneycombPieceProps {
  stage: GTMStage;
  position: [number, number, number];
  baseColor: string;
  borderColor: string;
  isActive: boolean;
  onClick: () => void;
  size: number;
}

const HoneycombPiece: React.FC<HoneycombPieceProps> = ({
  stage,
  position,
  baseColor,
  borderColor,
  isActive,
  onClick,
  size,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Idle animation variables
  const [idleOffset] = useState(() => Math.random() * 100);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Rotate on click
      const targetRotationY = isActive ? Math.PI : 0;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotationY,
        delta * 5
      );

      // Hover scale effect
      const scale = hovered ? 1.05 : 1;
      groupRef.current.scale.lerp(
        new THREE.Vector3(scale, scale, scale),
        delta * 5
      );

      // Idle floating animation
      groupRef.current.position.y +=
        Math.sin(state.clock.getElapsedTime() * 2 + idleOffset) * 0.001;
    }
  });

  // Outer hexagon shape (border)
  const hexShape = new THREE.Shape();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i;
    const x = Math.cos(angle) * size;
    const y = Math.sin(angle) * size;
    if (i === 0) hexShape.moveTo(x, y);
    else hexShape.lineTo(x, y);
  }
  hexShape.closePath();

  // Inner hexagon shape (base)
  const innerSize = size * 0.75;

  const innerHexShape = new THREE.Shape();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i;
    const x = Math.cos(angle) * innerSize;
    const y = Math.sin(angle) * innerSize;
    if (i === 0) innerHexShape.moveTo(x, y);
    else innerHexShape.lineTo(x, y);
  }
  innerHexShape.closePath();

  const handlePointerOver = () => setHovered(true);
  const handlePointerOut = () => setHovered(false);

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={onClick}
    >
      {/* Border Layer */}
      <mesh>
        <extrudeGeometry
          args={[
            hexShape,
            {
              depth: 0.3 * size,
              bevelEnabled: true,
              bevelThickness: 0.05 * size,
              bevelSize: 0.02 * size,
            },
          ]}
        />
        <meshStandardMaterial color={borderColor} />
      </mesh>

      {/* Inner Base Layer */}
      <mesh position={[0, 0, 0.02 * size]}>
        <extrudeGeometry
          args={[
            innerHexShape,
            {
              depth: 0.28 * size,
              bevelEnabled: true,
              bevelThickness: 0.04 * size,
              bevelSize: 0.015 * size,
            },
          ]}
        />
        <meshStandardMaterial color={baseColor} />
      </mesh>

      {/* Front Text (Icon) */}
      {!isActive && (
        <Text
          position={[0, 0, 0.4 * size]} // Moved text further out
          fontSize={0.7 * size}
          color="#FFFFFF" // Ensure high contrast
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02 * size}
          outlineColor="#000000"
        >
          {stage.icon || '🔍'} {/* Use a default icon if undefined */}
        </Text>
      )}

      {/* Back Text (Description) */}
      {isActive && (
        <Text
          position={[0, 0, -0.2 * size]}
          rotation={[0, Math.PI, 0]}
          fontSize={0.25 * size}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.6 * size}
          outlineWidth={0.01 * size}
          outlineColor="#000000"
        >
          {stage.description}
        </Text>
      )}

      {/* Title on Hover */}
      {hovered && !isActive && (
        <Text
          position={[0, -1.8 * size, 0]} // Adjusted Y position
          fontSize={0.3 * size}
          color="#FFFFFF"
          anchorX="center"
          anchorY="top"
          maxWidth={2 * size}
          outlineWidth={0.01 * size}
          outlineColor="#000000"
        >
          {stage.title}
        </Text>
      )}
    </group>
  );
};

export default HoneycombPiece;
